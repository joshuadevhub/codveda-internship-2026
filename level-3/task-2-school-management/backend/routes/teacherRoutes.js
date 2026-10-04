const express = require("express");
const router = express.Router();
const { pool } = require("../database/database");
const validateTeacher = require("../middleware/teacherValidation");

router.get("/", async (req, res, next) => {
  try {
    const response = await pool.query("SELECT * FROM teachers");
    res.status(200).send({
      success: true,
      message: "All teachers returned",
      results: response.rows,
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = {
      text: "SELECT * FROM teachers WHERE id = $1",
      values: [id],
    };
    const response = await pool.query(query);
    if (response.rows.length === 0) {
      res.status(404).send({ success: false, message: "Teacher not found" });
      return;
    }
    res.status(200).send({
      success: true,
      message: "Teacher found",
      results: response.rows[0],
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/", validateTeacher, async (req, res, next) => {
  try {
    const {
      teacher_id,
      first_name,
      last_name,
      email,
      phone,
      gender,
      employment_type,
      date_of_birth,
      date_registered,
    } = req.body;

    const query = {
      text: "INSERT INTO teachers (teacher_id, first_name, last_name, email, phone, gender, employment_type, date_of_birth, date_registered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      values: [
        teacher_id,
        first_name,
        last_name,
        email,
        phone,
        gender,
        employment_type,
        date_of_birth,
        date_registered,
      ],
    };

    const response = await pool.query(query);
    res.status(201).send({
      success: true,
      message: "Teacher created successfully",
      results: response.rows,
    });
    return;
  } catch (err) {
    return next(err);
  }
});

router.put("/:id", validateTeacher, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      phone,
      gender,
      employment_type,
      date_of_birth,
    } = req.body;

    const query = {
      text: "UPDATE teachers SET first_name = $1, last_name = $2, email = $3, phone = $4, gender = $5, employment_type = $6, date_of_birth = $7 WHERE id = $8 RETURNING *",
      values: [
        first_name,
        last_name,
        email,
        phone,
        gender,
        employment_type,
        date_of_birth,
        id,
      ],
    };

    const response = await pool.query(query);
    if (response.rows.length === 0) {
      res.status(404).send({ success: false, message: "Teacher not found" });
      return;
    }
    res.status(200).send({
      success: true,
      message: "Teacher updated successfully",
      results: response.rows[0],
    });
    return;
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id/status", async (req, res, next) => {
  let client;
  try {
    const { id } = req.params;

    const teacherQuery = {
      text: "SELECT * FROM teachers WHERE id = $1",
      values: [id],
    };
    const teacherResponse = await pool.query(teacherQuery);
    if (teacherResponse.rows.length === 0) {
      res.status(404).send({ success: false, message: "Teacher not found" });
      return;
    }

    if (teacherResponse.rows[0].employment_status === "Terminated") {
      res
        .status(400)
        .send({ success: false, message: "Teacher is already terminated" });
      return;
    }
    client = await pool.connect();

    await client.query("BEGIN");
    const terminatingQuery = {
      text: "UPDATE teachers SET employment_status = $1 WHERE id = $2 RETURNING *",
      values: ["Terminated", id],
    };

    const classAssignmentQuery = {
      text: "DELETE FROM teacher_class_assignments WHERE teacher_id = $1",
      values: [id],
    };

    const terminatingResponse = await client.query(terminatingQuery);

    await client.query(classAssignmentQuery);
    await client.query("COMMIT");

    res
      .status(200)
      .send({
        success: true,
        message: "Teacher record has been updated",
        results: terminatingResponse.rows[0],
      });
    return;
  } catch (err) {
    if (client) await client.query("ROLLBACK");
    return next(err);
  } finally {
    if (client) client.release();
  }
});

module.exports = router;

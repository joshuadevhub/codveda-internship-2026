const express = require("express");
const router = express.Router();
const { pool } = require("../database/database");

router.get("/", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM students");
    res
      .status(200)
      .send({
        success: true,
        message: "All students retrieved successfully",
        results: response.rows,
      });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
    return false;
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = {
      text: 'SELECT * FROM students WHERE id = $1',
      values: [id]
    }

    const response = await pool.query(query);
    if (response.rows.length === 0) {
      res.status(404).send({ success: false, message: "Student not found" });
      return false;
    }
    res.status(200).send({ success: true, message: "Student retrieved successfully", result: response.rows });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      student_id,
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      gender,
      class_id,
      date_registered,
    } = req.body;

    const query = {
      text: "INSERT INTO students (student_id, first_name, last_name, email, phone, date_of_birth, gender, class_id, date_registered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      values: [
        student_id,
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        gender,
        class_id,
        date_registered,
      ],
    };
    const response = await pool.query(query);
    res
      .status(201)
      .send({
        success: true,
        message: "Student registered successfully",
        result: response.rows,
      });
    return;
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
});

router.put("/:id", async(req, res) => {
  try {
    const { id } = req.params;

    const { student_id, first_name, last_name, email, phone, date_of_birth, gender, class_id, date_registered } = req.body;

    const query = {
      text: 'UPDATE students SET student_id = $1, first_name = $2, last_name = $3, email = $4, phone = $5, date_of_birth = $6, gender = $7, class_id = $8, date_registered = $9 WHERE id = $10 RETURNING *',
      values: [student_id, first_name, last_name, email, phone, date_of_birth, gender, class_id, date_registered, id],
    }
    const response = await pool.query(query);
    if (response.rows.length === 0) {
      res.status(404).send({ success: false, message: "Student not found" });
      return false;
    }
    res.status(200).send({ success: true, message: "Student updated successfully", results: response.rows });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
    return;
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = {
      text: "DELETE FROM students WHERE id = $1 RETURNING *",
      values: [id],
    };

    const response = await pool.query(query);
    if (response.rows.length === 0) {
      res
        .status(404)
        .send({ success: false, message: "Student does not exist" });
      return false;
    }
    res
      .status(200)
      .send({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
    return;
  }
});

module.exports = router;
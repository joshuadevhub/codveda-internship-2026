const express = require("express");
const router = express.Router();
const { pool } = require("../database/database");
const validateStudent = require("../middleware/studentValidation");

router.get("/", async (req, res, next) => {
  try {
    const { gender, search } = req.query;

    if (gender && search) {
      const genderSearchQuery = {
        text: 'SELECT * FROM students WHERE gender = $1 AND (first_name ILIKE $2 OR last_name ILIKE $2) ORDER BY id',
        values: [gender, `%${search}%`]
      }
      const genderSearchResponse = await pool.query(genderSearchQuery);
      res.status(200).send({ success: true, message: "Students fetched", results: genderSearchResponse.rows });
      return;
    }

    if (gender) {
      const genderQuery = {
        text: 'SELECT * FROM students WHERE gender = $1',
        values: [gender]
      }
      const genderResponse = await pool.query(genderQuery);
      res.status(200).send({ success: true, message: `${gender} student fetched`, results: genderResponse.rows });
      return;
    }

    if (search) {
      const searchQuery = {
        text: 'SELECT * FROM students WHERE first_name ILIKE $1 OR last_name ILIKE $1',
        values: [`%${search}%`]
      }
      const searchResponse = await pool.query(searchQuery);
      res.status(200).send({ success: true, message: `Search result for ${search}`, results: searchResponse.rows });
      return;
    }

    const response = await pool.query("SELECT * FROM students");
    res
      .status(200)
      .send({
        success: true,
        message: "All students retrieved successfully",
        results: response.rows,
      });
  } catch (err) {
    return next(err);
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
    res.status(200).send({ success: true, message: "Student retrieved successfully", results: response.rows });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
});

router.post("/", validateStudent, async (req, res, next) => {
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
    return next(err);
  }
});

router.put("/:id", validateStudent, async(req, res, next) => {
  try {
    const { id } = req.params;

    const { first_name, last_name, email, phone, date_of_birth, gender, class_id } = req.body;

    const query = {
      text: 'UPDATE students SET first_name = $1, last_name = $2, email = $3, phone = $4, date_of_birth = $5, gender = $6, class_id = $7 WHERE id = $8 RETURNING *',
      values: [first_name, last_name, email, phone, date_of_birth, gender, class_id, id],
    }
    const response = await pool.query(query);
    if (response.rows.length === 0) {
      res.status(404).send({ success: false, message: "Student not found" });
      return false;
    }
    res.status(200).send({ success: true, message: "Student updated successfully", results: response.rows });
  } catch (err) {
    return next(err);
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
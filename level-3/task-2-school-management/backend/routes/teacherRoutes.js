const express = require("express");
const router = express.Router();
const { pool } = require("../database/database");

router.get('/', async (req, res, next) => {
  try {
    const response = await pool.query("SELECT * FROM teachers");
    res.status(200).send({ success: true, message: "All teachers returned", results: response.rows});
  } catch (err) {
    return next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = {
      text: 'SELECT * FROM teachers WHERE id = $1',
      values: [id]
    }
    const response = await pool.query(query);
    if (response.rows.length === 0) {
      res.status(404).send({ success: false, message: "Teacher not found" });
      return;
    }
    res.status(200).send({ success: true, message: "Teacher found", results: response.rows[0] });
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { teacher_id, first_name, last_name, email, phone, gender, date_of_birth, date_registered,
    } = req.body;

    const query = {
      text: "INSERT INTO teachers (teacher_id, first_name, last_name, email, phone, gender, date_of_birth, date_registered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      values: [teacher_id, first_name, last_name, email, phone, gender, date_of_birth, date_registered],
    };

    const response = await pool.query(query);
    res.status(201).send({ success: true, message: "Teacher created successfully", results: response.rows });
    return;
  } catch (err) {
    return next(err)
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { teacher_id, first_name, last_name, email, phone, gender, date_of_birth, date_registered,
    } = req.body;

    const query = {
      text: "UPDATE teachers SET teacher_id = $1, first_name = $2, last_name = $3, email = $4, phone = $5, gender = $6, date_of_birth = $7, date_registered = $8 WHERE id = $9 RETURNING *",
      values: [teacher_id, first_name, last_name, email, phone, gender, date_of_birth, date_registered, id],
    };

    const response = await pool.query(query);
    if (response.rows.length === 0) {
      res.status(404).send({ success: false, message: "Teacher not found" });
      return;
    }
    res.status(200).send({ success: true, message: "Teacher updated successfully", results: response.rows[0] });
    return;
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = {
      text: 'DELETE FROM teachers WHERE id = $1 RETURNING *',
      values: [id]
    }

    const response = await pool.query(query);
    if (response.rows.length === 0) {
      res.status(404).send({ success: false, message: 'Teacher not found' });
      return;
    }
    res.status(204).send();
    return;
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
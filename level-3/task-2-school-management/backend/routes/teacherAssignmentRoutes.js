const express = require("express");
const router = express.Router();
const { pool } = require("../database/database");

router.get("/", async (req, res, next) => {
  try {
    const response = await pool.query(
      "SELECT tc.id AS assignment_id, t.id AS teacher_id, t.first_name AS teacher_first_name, t.last_name AS teacher_last_name, c.id AS class_id, c.name AS class_name, tc.assigned_date AS assigned_date FROM teacher_class_assignments AS tc JOIN teachers AS t ON tc.teacher_id = t.id JOIN classes AS c ON tc.class_id = c.id;",
    );
    res
      .status(200)
      .send({
        success: true,
        message: "All assignments returned",
        results: response.rows,
      });
    return;
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { teacher_id, class_id, assigned_date } = req.body;

    const teacherQuery = {
      text: "SELECT * FROM teachers WHERE id = $1",
      values: [teacher_id],
    };

    const teacherResponse = await pool.query(teacherQuery);
    if (teacherResponse.rows.length === 0) {
      res.status(404).send({ success: false, message: "Teacher not found" });
      return;
    }

    if (teacherResponse.rows[0].employment_type === "Part-time") {
      res
        .status(400)
        .send({
          success: false,
          message: "Part-time teachers cannot be assigned to a class",
        });
      return;
    }

    const assignedQuery = {
      text: "INSERT INTO teacher_class_assignments (teacher_id, class_id, assigned_date) VALUES ($1, $2, $3) RETURNING *",
      values: [teacher_id, class_id, assigned_date],
    };

    const assignedResponse = await pool.query(assignedQuery);
    res
      .status(201)
      .send({
        success: true,
        message: "Teacher assigned to a class",
        results: assignedResponse.rows,
      });
    return;
  } catch (err) {
    return next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { teacher_id, class_id, assigned_date } = req.body;

    const teacherQuery = {
      text: "SELECT * FROM teachers WHERE id = $1",
      values: [teacher_id],
    };
    const teacherResponse = await pool.query(teacherQuery);
    if (teacherResponse.rows.length === 0) {
      res.status(404).send({ success: false, message: "Teacher not found" });
      return;
    }

    if (teacherResponse.rows[0].employment_type !== "Full-time") {
      res
        .status(400)
        .send({
          success: false,
          message: "Teacher found is not a full-time staff",
        });
      return;
    }

    const updateQuery = {
      text: 'UPDATE teacher_class_assignments SET teacher_id = $1, class_id = $2, assigned_date = $3 WHERE id = $4 RETURNING *',
      values: [teacher_id, class_id, assigned_date, id]
    }
    const updateResponse = await pool.query(updateQuery);
    if (updateResponse.rows.length === 0) {
      res.status(404).send({ success: false, message: "Teacher assignment ID does not exist" });
      return;
    }
    res.status(200).send({ success: true, message: "Teacher assignment updated successfully", results: updateResponse.rows[0] });
    return;
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const query = {
    text: 'DELETE FROM teacher_class_assignments WHERE id = $1 RETURNING *',
    values: [id]
  };
  const response = await pool.query(query);
  if (response.rows.length === 0) {
    res.status(404).send({ success: false, message: 'Teacher assignment ID not found' });
    return;
  }
  res.status(204).send();
  return;
});

module.exports = router;

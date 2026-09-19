const express = require("express");
const dotenv = require("dotenv");
const getStudentRoute = require("./routes/studentRoutes");
const { pool } = require("./database/database");

const app = express();

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/students", async(req, res) => {
  try {
    const response = await pool.query('SELECT * FROM students');
    res.status(200).send({ success: true, message: "All students returned", results: response.rows });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
    return false;
  }
});

app.get("/api/students/:id", async(req, res) => {
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
    res.status(200).send({ success: true, message: "Student Found", result: response.rows });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
})

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
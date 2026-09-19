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
    res.status(200).send({ success: true, message: response.rows });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
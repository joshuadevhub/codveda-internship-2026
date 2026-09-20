const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/studentRoutes")
const { pool } = require("./database/database");

const app = express();

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/students", router);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
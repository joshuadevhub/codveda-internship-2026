const express = require("express");
const dotenv = require("dotenv");
const studentRouter = require("./routes/studentRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const validateStudent = require("./middleware/studentValidation");
const errorHandler = require("./middleware/errorHandler");

const app = express();

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/students", studentRouter);
app.use("/api/teachers", teacherRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
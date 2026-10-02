const express = require("express");
const dotenv = require("dotenv");
const studentRouter = require("./routes/studentRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const teacherAssignmentRouter = require("./routes/teacherAssignmentRoutes");
const classRouter = require("./routes/classRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/students", studentRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/teacher-assignments", teacherAssignmentRouter);
app.use("/api/classes", classRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
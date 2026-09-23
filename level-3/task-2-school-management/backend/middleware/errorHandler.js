function errorHandler(err, req, res, next) {
  let statusCode;
  switch (err.code) {
    case "23505":
      statusCode = 409;
      if (err.constraint === "students_student_id_key") {
        res.status(statusCode).send({ success: false, message: "Student ID already exists" });
        return;
      }
      break;
    
    case "23503":
      statusCode = 404;
      if (err.constraint === "students_class_id_fkey") {
        res.status(statusCode).send({ success: false, message: "The class ID provided does not exist" });
        return;
      }
      break;
    
    case "23502":
      if (err.column === 'student_id') {
        res.status(400).send({ success: false, message: "Student ID is required" });
        return;
      }
      if (err.column === 'first_name') {
        res.status(400).send({ success: false, message: "First name is required" });
        return;
      }

      if (err.column === 'last_name') {
        res.status(400).send({ success: false, message: "Last name is required" });
        return;
      }

      if (err.column === 'class_id') {
        res.status(400).send({ success: false, message: "Class ID is required" });
        return;
      }

      if (err.column === 'date_registered') {
        res.status(400).send({ success: false, message: "Please provide a registration date" });
        return;
      }
      break;
    
    case "23514":
      if (err.constraint === 'students_phone_check') {
        res.status(400).send({ success: false, message: "Phone number must be exactly 11 digits" });
        return;
      }

      if (err.constraint === "students_gender_check") {
        res
          .status(400)
          .send({ success: false, message: "Invalid gender value. Allowed values are: male and female",
          });
        return;
      }
      break;
    
    default:
      break;
  }
  next(err);
}

module.exports = errorHandler;
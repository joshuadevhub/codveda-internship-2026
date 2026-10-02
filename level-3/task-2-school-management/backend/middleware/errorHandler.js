function errorHandler(err, req, res, next) {
  switch (err.code) {
    case "23505":
      if (err.constraint === "students_student_id_key") {
        res.status(409).send({ success: false, message: "Student ID already exists" });
        return;
      }
      if (err.constraint === "teachers_teacher_id_key") {
        res.status(409).send({ success: false, message: "Teacher ID already exists" });
        return;
      }
      if (err.constraint === "teachers_email_key") {
        res.status(409).send({success: false,message: "This email address is already registered"});
        return;
      }
      if (err.constraint === "teachers_phone_key") {
        res.status(409).send({ success: false, message: "This phone number is already registered" });
        return;
      }
      if (err.constraint === "teacher_class_assignments_teacher_id_key" &&err.table === "teacher_class_assignments") {
        res.status(409).send({success: false,message: "This teacher is already assigned to a class"});
        return;
      }
      if (err.constraint === "teacher_class_assignments_class_id_key" && err.table === "teacher_class_assignments") {
        res.status(409).send({ success: false, message: "This class already has a coordinating teacher" });
        return;
      }
      break;
    
    case "23503":
      if (err.constraint === "students_class_id_fkey") {
        res.status(404).send({ success: false, message: "The student class ID provided does not exist" });
        return;
      }
      if (err.constraint === "teacher_class_assignments_teacher_id_fkey"){
        res.status(404).send({ success: false, message: "The teacher ID provided does not exist" });
        return;
      }
      if (err.constraint === "teacher_class_assignments_class_id_fkey") {
        res.status(404).send({ success: false, message: "The class ID provided does not exist" });
        return;
      }
      break;
    
    case "23502":
      if (err.column === 'student_id' && err.table === "students") {
        res.status(400).send({ success: false, message: "Student ID is required" });
        return;
      }
      if (err.column === 'first_name' && err.table === "students") {
        res.status(400).send({ success: false, message: "Student first name is required" });
        return;
      }

      if (err.column === 'last_name' && err.table === "students") {
        res.status(400).send({ success: false, message: " Student last name is required" });
        return;
      }

      if (err.column === 'class_id') {
        res.status(400).send({ success: false, message: "Class ID is required" });
        return;
      }

      if (err.column === 'date_registered' && err.table === "students") {
        res.status(400).send({ success: false, message: "Please provide a registration date for the student" });
        return;
      }

      if (err.column === "teacher_id" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Teacher ID is required" });
        return;
      }

      if (err.column === "first_name" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Teacher first name is required" });
        return;
      }

      if (err.column === "last_name" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Teacher last name is required" });
        return;
      }

      if (err.column === "email" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Teacher email is required" });
        return;
      }

      if (err.column === "phone" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Teacher phone number is required" });
        return;
      }

      if (err.column === "date_registered" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Please provide a registration date for the teacher" });
        return;
      }

      if (err.column === "gender" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Gender is required" });
        return;
      }

      if (err.column === "employment_type" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Employment type is required" });
        return;
      }

      if (err.column === "date_of_birth" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Date of birth is required" });
        return;
      }

      if (err.column === "teacher_id" && err.table === "teacher_class_assignments") {
        res.status(400).send({ success: false, message: "Teacher ID is required" });
        return;
      }
      if (err.column === "class_id" && err.table === "teacher_class_assignments") {
        res.status(400).send({ success: false, message: "Class ID is required" });
        return;
      }
      if (err.column === "assigned_date" && err.table === "teacher_class_assignments") {
        res.status(400).send({ success: false, message: "Assigned Date is required" });
        return;
      }
      break;
    
    case "23514":
      if (err.constraint === 'students_phone_check' && err.table === "students") {
        res.status(400).send({ success: false, message: "Phone number must be exactly 11 digits" });
        return;
      }

      if (err.constraint === "students_gender_check" && err.table === "students") {
        res.status(400).send({ success: false, message: "Invalid gender value. Allowed values are: male and female"});
        return;
      }

      if (err.constraint === "teachers_phone_check" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Teacher phone number must be exactly 11 digits" });
        return;
      }

      if (err.constraint === "teachers_gender_check" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Invalid gender value for teacher. Allowed values are: male and female" });
        return;
      }

      if (err.constraint === "teachers_employment_type_check" && err.table === "teachers") {
        res.status(400).send({ success: false, message: "Invalid employment type. Allowed values are: Part-time and Full-time" });
        return;
      }
      break;
    
    default:
      res.status(500).send({ success: false, message: "Internal server error. Please try again later" });
      console.log(err);
      break;
  }
}

module.exports = errorHandler;
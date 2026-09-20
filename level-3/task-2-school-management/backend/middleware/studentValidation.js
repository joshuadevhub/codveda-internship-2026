function studentValidation(req, res, next) {
  const { student_id, first_name, last_name, email, phone, date_of_birth, gender, class_id, date_registered } = req.body;

  if (!validateStudentId(student_id, res)) return;
  if (!validateName(first_name, res, "First Name")) return;
  if (!validateName(last_name, res, "Last Name")) return;
  if (!validateEmail(email, res)) return;
  if (!validatePhone(phone, res)) return;
  if (!validateDateOfBirth(date_of_birth, res)) return;
  if (!validateGender(gender, res)) return;
  if (!validateClassId(class_id, res)) return;
  if (!validateDateRegistered(date_registered, res)) return;

  next();
}

function validateStudentId(studentId, res) {
  if (studentId === undefined || studentId === null) {
    res.status(400).send({ success: false, message: "Student ID is required" });
    return false;
  }

  if (studentId.trim() === "") {
    res.status(400).send({ success: false, message: "Student ID cannot be empty" });
    return false;
  }

  if (studentId.length !== 12) {
    res.status(400).send({ success: false, message: "Student ID cannot be more or less than 12 characters"});
    return false;
  }
  return true;
}

function validateName(name, res, fieldName) {
  const nameRegex = /^[A-Za-z]{3,50}$/;
  if (name === undefined || name === null) {
    res.status(400).send({ success: false, message: `${fieldName} is required` });
    return false;
  }

  if (name.trim() === "") {
    res.status(400).send({ success: false, message: `${fieldName} cannot be empty` });
    return false;
  }

  if (!nameRegex.test(name)) {
    res.status(400).send({ success: false, message: `${fieldName} must be between 3 and 50 characters` })
    return false;
  }
  return true;
}

function validateEmail(email, res) {
  const emailRegex = /^(?:$|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/;

  if (!emailRegex.test(email)) {
    res.status(400).send({ success: false, message: "Enter a valid email" });
    return false;
  }
  return true;
}

function validatePhone(phone, res) {
  const phoneRegex = /^0(70|80|81|90|91)\d{8}$/;
  if (phone === undefined || phone === null) {
    res.status(400).send({ success: false, message: "Phone number is required" });
    return false;
  }

  if (phone === "") {
    res.status(400).send({ success: false, message: "Phone number cannot be empty" });
    return false;
  }

  if (!phoneRegex.test(phone)) {
    res.status(400).send({ success: false, message: "Enter a valid nigerian phone number (e.g. 080****7334)" });
    return false;
  }
  return true;
}

function validateDateOfBirth(dob, res) {
  if (dob === undefined || dob === null) {
    res.status(400).send({
      success: false,
      message: "Date of birth is required",
    });
    return false;
  }

  if (dob === "") {
    res.status(400).send({
      success: false,
      message: "Date of birth cannot be empty",
    });
    return false;
  }

  const birthDate = new Date(dob);

  if (Number.isNaN(birthDate.getTime())) {
    res.status(400).send({
      success: false,
      message: "Enter a valid date of birth",
    });
    return false;
  }

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const birthdayThisYear = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate(),
  );

  if (today < birthdayThisYear) {
    age--;
  }

  if (age < 10) {
    res.status(400).send({
      success: false,
      message:
        "Student must be at least 10 years old to be eligible for registration",
    });
    return false;
  }

  if (age > 25) {
    res.status(400).send({
      success: false,
      message: "Student must be 25 years old or below",
    });
    return false;
  }

  return true;
}

function validateGender(gender, res) {
  const allowedGender = ["male", "female"];
  if (gender === undefined || gender === null) {
    res.status(400).send({ success: false, message: "Gender is required" });
    return false;
  }

  if (gender === "") {
    res.status(400).send({ success: false, message: "Gender cannot be empty" });
    return false;
  }

  if (!allowedGender.includes(gender.toLowerCase())) { 
    res.status(400).send({ success: false, message: `Invalid gender value provided. Allowed gender: ${allowedGender.join(",")}` });
    return false;
  }
  return true;
}

function validateClassId(classId, res) {
  if (classId === undefined || classId === null) {
    res.status(400).send({ success: false, message: "Class ID is required" });
    return false;
  }

  if (classId === "") {
    res.status(400).send({ success: false, message: "Class ID cannot be empty" });
    return false;
  }

  const numberClassId = Number(classId);

  if (!Number.isInteger(numberClassId)) {
    res.status(400).send({ success: false, message: "Class ID must be an integer" });
    return false;
  }

  if (classId < 1 || classId >= 7) {
    res.status(400).send({ success: false, message: "Class ID must be between 1 and 6" });
    return false
  }
  return true;
}

function validateDateRegistered(dateRegistered, res) {
  if (dateRegistered === undefined || dateRegistered === null) {
    res.status(400).send({
      success: false,
      message: "Date registered is required",
    });
    return false;
  }

  if (dateRegistered === "") {
    res.status(400).send({
      success: false,
      message: "Date registered cannot be empty",
    });
    return false;
  }

  const registeredDate = new Date(dateRegistered);

  if (Number.isNaN(registeredDate.getTime())) {
    res.status(400).send({
      success: false,
      message: "Enter a valid registration date",
    });
    return false;
  }

  const today = new Date();

  if (registeredDate > today) {
    res.status(400).send({
      success: false,
      message: "Registration date cannot be in the future",
    });
    return false;
  }

  return true;
}

module.exports = studentValidation;
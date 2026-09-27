function validateTeacher(req, res, next) {
  const { teacher_id, first_name, last_name, email, phone, gender, employment_type, date_of_birth, date_registered,
  } = req.body;

  if (!validateTeacherId(teacher_id, res)) return;
  if (!validateName(first_name, res, "First name")) return;
  if (!validateName(last_name, res, "Last name")) return;
  if (!validateEmail(email, res)) return;
  if (!validatePhone(phone, res)) return;
  if (!validateGender(gender, res)) return;
  if (!validateEmploymentType(employment_type, res)) return;
  if (!validateDateOfBirth(date_of_birth, res)) return;
  if (!validateDateRegistered(date_registered, res)) return;

  next();
}

function validateTeacherId(teacherId, res) {
  if (teacherId === null || teacherId === undefined) {
    res.status(400).send({ success: false, message: "Teacher ID is required" });
    return false;
  }

  if (teacherId.trim() === "") {
    res.status(400).send({ success: false, message: "Teacher ID cannot be empty" });
    return false;
  }

  if (teacherId.length !== 12) {
    res.status(400).send({ success: false, message: "Invalid teacher ID format" });
    return false;
  }

  const splitTeacherId = teacherId.split("-");
  const message = "Invalid teacher ID format"
  const todayYear = new Date().getFullYear();

  if (splitTeacherId[0] !== 'TCH') {
    res.status(400).send({ success: false, message  });
    return false;
  }

  if (Number(splitTeacherId[1]) !== todayYear) {
    res.status(400).send({ success: false, message });
    return false;
  }

  if (splitTeacherId[2].length !== 3) {
    res.status(400).send({ success: false, message });
    return false;
  }

  for (let i = 0; i < splitTeacherId[2].length; i++) {
    const char = splitTeacherId[2][i];
    if (char < "0" || char > "9") {
      res.status(400).send({ success: false, message });
      return false;
    }
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
    res.status(400).send({ success: false, message: `${fieldName} must be between 3 and 50 characters`});
    return false;
  }
  return true;
}

function validateEmail(email, res) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (email === null || email === undefined) {
    res.status(400).send({ success: false, message: "Email is required" });
    return false;
  }

  if (email.trim() === "") {
    res.status(400).send({ success: false, message: "Email cannot be empty" });
    return false;
  }

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

  if (phone.trim() === "") {
    res.status(400).send({ success: false, message: "Phone number cannot be empty" });
    return false;
  }

  if (!phoneRegex.test(phone)) {
    res.status(400).send({ success: false, message: "Enter a valid Nigerian phone number (e.g. 080****7334)"});
    return false;
  }
  return true;
}

function validateGender(gender, res) {
  const allowedGender = ["Male", "Female"];

  if (gender === null || gender === undefined) {
    res.status(400).send({ success: false, message: "Gender is required" });
    return false;
  }

  if (gender.trim() === "") {
    res.status(400).send({ success: false, message: "Gender cannot be empty" });
    return false;
  }

  if (!allowedGender.includes(gender)) {
    res.status(400).send({ success: false, message: `Invalid gender value provided. Allowed gender: ${allowedGender.join(",")}`});
    return false;
  }
  return true;
}

function validateEmploymentType(employmentType, res) {
  const allowedEmploymentType = ["Full-time", "Part-time"];

  if (employmentType === null || employmentType === undefined) {
    res.status(400).send({ success: false, message: "Employment type is required" });
    return false;
  }

  if (employmentType.trim() === "") {
    res.status(400).send({ success: false, message: "Employment type cannot be empty" });
    return false;
  }

  if (!allowedEmploymentType.includes(employmentType)) {
    res.status(400).send({ success: false, message: `Invalid employment type provided. Allowed employment type: ${allowedEmploymentType.join(",")}`});
    return false;
  }
  return true;
}

function validateDateOfBirth(dob, res) {
  if (dob === undefined || dob === null) {
    res.status(400).send({ success: false, message: "Date of birth is required"});
    return false;
  }

  if (dob === "") {
    res.status(400).send({ success: false, message: "Date of birth cannot be empty"});
    return false;
  }

  const birthDate = new Date(dob);

  if (Number.isNaN(birthDate.getTime())) {
    res.status(400).send({ success: false, message: "Enter a valid date of birth"});
    return false;
  }

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const birthdayThisYear = new Date( today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  if (today < birthdayThisYear) {
    age--;
  }

  if (age < 18) {
    res.status(400).send({ success: false, message: "Teacher must be at least 18 years old to be eligible for registration"});
    return false;
  }

  return true;
}

function validateDateRegistered(dateRegistered, res) {
  if (dateRegistered === undefined || dateRegistered === null) {
    res.status(400).send({ success: false, message: "Date registered is required"});
    return false;
  }

  if (dateRegistered === "") {
    res.status(400).send({ success: false, message: "Date registered cannot be empty"});
    return false;
  }

  const registeredDate = new Date(dateRegistered);

  if (Number.isNaN(registeredDate.getTime())) {
    res.status(400).send({ success: false, message: "Enter a valid registration date"});
    return false;
  }

  const today = new Date();

  if (registeredDate > today) {
    res.status(400).send({ success: false, message: "Registration date cannot be in the future"});
    return false;
  }

  return true;
}

module.exports = validateTeacher;
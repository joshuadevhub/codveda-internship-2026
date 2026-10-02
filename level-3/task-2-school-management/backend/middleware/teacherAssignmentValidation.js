function validateTeacherAssignment(req, res, next) {
  const { teacher_id, class_id, assigned_date } = req.body;
  if (!validateTeacherId(teacher_id, res)) return;
  if (!validateClassId(class_id, res)) return;
  if (!validateAssignedDate(assigned_date, res)) return;
  next();
}

const numberRegex = /^\d+$/;
function validateTeacherId(teacherId, res) {
  if (teacherId === null || teacherId === undefined) {
    res.status(400).send({ success: false, message: "Teacher ID is required" });
    return false;
  }

  if (teacherId === "") {
    res.status(400).send({ success: false, message: "Teacher ID cannot be empty" });
    return false
  }

  if (!numberRegex.test(teacherId)) {
    res.status(400).send({ success: false, message: "Teacher ID must be a digit" });
    return false;
  }
  return true;
}

function validateClassId(classId, res) {
  if (classId === null || classId === undefined) {
    res.status(400).send({ success: false, message: "Class ID is required" });
    return false;
  }

  if (classId === "") {
    res.status(400).send({ success: false, message: "Class ID cannot be empty" });
    return false
  }

  if (!numberRegex.test(classId)) {
    res.status(400).send({ success: false, message: "Class ID must be a digit" });
    return false;
  }
  return true;
}

function validateAssignedDate(assignedDate, res) {
  if (assignedDate === undefined || assignedDate === null) {
    res
      .status(400)
      .send({ success: false, message: "Date assigned is required" });
    return false;
  }

  if (assignedDate === "") {
    res
      .status(400)
      .send({ success: false, message: "Date assigned cannot be empty" });
    return false;
  }

  const registeredDate = new Date(assignedDate);

  if (Number.isNaN(registeredDate.getTime())) {
    res
      .status(400)
      .send({ success: false, message: "Enter a valid assigned date" });
    return false;
  }

  const today = new Date();

  if (registeredDate > today) {
    res
      .status(400)
      .send({
        success: false,
        message: "Assigned date cannot be in the future",
      });
    return false;
  }

  return true;
}

module.exports = validateTeacherAssignment;
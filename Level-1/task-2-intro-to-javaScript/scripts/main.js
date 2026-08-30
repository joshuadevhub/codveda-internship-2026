document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const closeToggle = document.getElementById("close-icon");
  const navBar = document.getElementById("navbar");

  const dropdown = document.getElementById("class-info");
  const classHeading = document.getElementById("class-heading");
  const classCode = document.getElementById("class-code");
  const totalStudents = document.getElementById("students");
  const classTeacher = document.getElementById("class-teacher");
  const viewStudents = document.getElementById("view-students");

  const form = document.getElementById("registration-form");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const select = document.getElementById("select");

  const modal = document.getElementById("student-modal");
  const modalTitle = document.getElementById("modal-title");
  const studentList = document.getElementById("student-list");

  const successModal = document.getElementById("success-modal");
  const formContent = document.querySelectorAll(".form-content");

  const nameHasNumber = /[0-9]/;
  const phoneRegex =
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{3,}[-\s\.]?[0-9]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const toggleMenu = () => {
    navBar.classList.add("isOpen");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  };

  const closeMenu = () => {
    navBar.classList.remove("isOpen");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  };

  menuToggle.addEventListener("click", toggleMenu);
  closeToggle.addEventListener("click", closeMenu);

  // Explore Class Section
  const students = [];

  const classes = {
    ss1: {
      name: "Senior Secondary School 1",
      classCode: "SS1",
      classTeacher: "Mr James Precious",
    },

    ss2: {
      name: "Senior Secondary School 2",
      classCode: "SS2",
      classTeacher: "Mr Joshua Damilare",
    },
    ss3: {
      name: "Senior Secondary School 3",
      classCode: "SS3",
      classTeacher: "Mrs Deborah Goodness",
    },
  };

  const selectedClass = document.getElementById("class-select");
  selectedClass.addEventListener("change", () => {
    if (selectedClass.value === "") {
      dropdown.classList.remove("isActive");
    } else {
      const selectedValue = classes[selectedClass.value];
      classHeading.textContent = selectedValue.name;
      classCode.textContent = selectedValue.classCode;

      const total = students.filter(
        (s) => s.class === selectedClass.value,
      ).length;
      totalStudents.textContent = total;
      classTeacher.textContent = selectedValue.classTeacher;

      dropdown.classList.add("isActive");
    }
  });

  // Registration Section

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    registerStudent();
  });

  function registerStudent() {
    const firstNameValue = validateFirstName();
    const lastNameValue = validateLastName();
    const phoneNumberValue = validatePhone();
    const emailValue = validateEmail();
    const selectValue = validateSelect();

    const isValid =
      firstNameValue &&
      lastNameValue &&
      phoneNumberValue &&
      emailValue &&
      selectValue;

    if (isValid) {
      const student = {
        id: generateStudentId(),
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phoneNumber: phoneNumberValue,
        class: selectValue,
      };
      students.push(student);
      showSuccessModal();
      form.reset();
      formContent.forEach((f) => {
        f.classList.remove("success", "error");
      });
    }
  }

  select.addEventListener("change", () => {
    if (select.value == "") {
      setError(select, "Please select a class");
    } else {
      setSuccess(select);
    }
  });

  function validateFirstName() {
    let isFirstNameValid = false;
    const firstNameValue = firstName.value.trim();

    if (firstNameValue == "") {
      setError(firstName, `First name is required`);
    } else if (nameHasNumber.test(firstNameValue)) {
      setError(firstName, `First name cannot contain numbers`);
    } else if (firstNameValue.length <= 2) {
      setError(firstName, `First name must be at least 3 characters`);
    } else {
      setSuccess(firstName);
      isFirstNameValid = true;
    }
    return isFirstNameValid && firstNameValue;
  }

  function validateLastName() {
    let isLastNameValid = false;
    const lastNameValue = lastName.value.trim();

    if (lastNameValue == "") {
      setError(lastName, `Last name is required`);
    } else if (nameHasNumber.test(lastNameValue)) {
      setError(lastName, `Last name cannot contain numbers`);
    } else if (lastNameValue.length <= 2) {
      setError(lastName, `Last name must be at least 3 characters`);
    } else {
      setSuccess(lastName);
      isLastNameValid = true;
    }
    return isLastNameValid && lastNameValue;
  }

  function validateEmail() {
    let isEmailValid = false;
    const emailValue = email.value.trim();

    if (emailValue == "") {
      setError(email, "Email is required");
    } else if (!emailRegex.test(emailValue)) {
      setError(email, "Enter a valid email");
    } else {
      setSuccess(email);
      isEmailValid = true;
    }
    return isEmailValid && emailValue;
  }

  function validatePhone() {
    let isPhoneNumberValid = false;
    const phoneValue = phone.value.trim();

    if (phoneValue == "") {
      setError(phone, "Phone number is required");
    } else if (!phoneRegex.test(phoneValue)) {
      setError(phone, "Enter a valid phone number");
    } else {
      setSuccess(phone);
      isPhoneNumberValid = true;
    }
    return isPhoneNumberValid && phoneValue;
  }

  function validateSelect() {
    let isSelectValid = false;
    if (select.value == "") {
      setError(select, "Please select a class");
    } else {
      setSuccess(select);
      isSelectValid = true;
    }
    return isSelectValid && select.value;
  }

  function setError(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector(".error-message");

    errorMessage.textContent = message;
    formControl.classList.add("error");
    formControl.classList.remove("success");
  }

  function setSuccess(input, message = "") {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector(".error-message");

    errorMessage.textContent = message;
    formControl.classList.add("success");
    formControl.classList.remove("error");
  }

  function generateStudentId() {
    const totalStudent = String(students.length + 1).padStart(3, "0");
    return `STU-${totalStudent}`;
  }

  // Modal Section
  viewStudents.addEventListener("click", (e) => {
    e.preventDefault();

    const selectedValue = selectedClass.value;

    if (selectedValue === "") {
      return;
    }

    const classStudents = students.filter(
      (student) => student.class === selectedValue,
    );

    modalTitle.textContent = `${classes[selectedValue].name} Students`;

    studentList.innerHTML = "";

    if (classStudents.length === 0) {
      studentList.innerHTML = "<p>No students registered in this class.</p>";
    } else {
      classStudents.forEach((student) => {
        const studentItem = document.createElement("div");

        studentItem.classList.add("student-item");

        studentItem.innerHTML = `
          <h3>${student.firstName} ${student.lastName}</h3>
          <p>Student ID: ${student.id}</p>
          <p>Email: ${student.email}</p>
          <p>Phone: ${student.phoneNumber}</p>
        `;

        studentList.appendChild(studentItem);
      });
    }

    modal.classList.add("isOpen");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("isOpen");
    }
  });

  function showSuccessModal() {
    successModal.classList.add("show");

    setTimeout(() => {
      successModal.classList.add("hide");

      setTimeout(() => {
        successModal.classList.remove("show", "hide");
      }, 1000);
    }, 4000);
  }
});

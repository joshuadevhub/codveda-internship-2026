document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const closeToggle = document.getElementById("close-icon");
  const navBar = document.getElementById("navbar");

  const dropdown = document.getElementById("class-info");
  const classHeading = document.getElementById("class-heading");
  const classCode = document.getElementById("class-code");
  const totalStudents = document.getElementById("students");
  const classTeacher = document.getElementById("class-teacher");

  const form = document.getElementById("registration-form");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const select = document.getElementById("select");

  const nameHasNumber = /[0-9]/;
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{3,}[-\s\.]?[0-9]{3,}$/;
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
  const classes = {
    ss1: {
      name: "Senior Secondary School 1",
      classCode: "SS1",
      students: 34,
      classTeacher: "Mr James Precious",
    },

    ss2: {
      name: "Senior Secondary School 2",
      classCode: "SS2",
      students: 29,
      classTeacher: "Mr Joshua Damilare",
    },
    ss3: {
      name: "Senior Secondary School 3",
      classCode: "SS3",
      students: 32,
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
      totalStudents.textContent = selectedValue.students;
      classTeacher.textContent = selectedValue.classTeacher;

      dropdown.classList.add("isActive");
    }
  });


  // Registration Section
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    registerStudent();
  });

  select.addEventListener("change", () => {
    if (select.value == "") {
      setError(select, "Please select a class");
    } else {
      setSuccess(select);
    }
  })

  function registerStudent() {
    let isFirstNameValid = false;
    let isLastNameValid = false;
    let isEmailValid = false;
    let isPhoneNumberValid = false
    let isSelectValid = false;

    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();

    if (firstNameValue == "") {
      setError(firstName, "First name is required");
    } else if (nameHasNumber.test(firstNameValue)) {
      setError(firstName, "First name cannot contain numbers");
    } else if (firstNameValue.length <= 2) {
      setError(firstName, "First Name must be at least 3 characters");
    } else {
      setSuccess(firstName);
      isFirstNameValid = true;
    }

    if (lastNameValue == "") {
      setError(lastName, "Last name is required");
    } else if (nameHasNumber.test(lastNameValue)) {
      setError(lastName, "Last name cannot contain numbers");
    } else if (lastNameValue.length <= 2) {
      setError(lastName, "Last name must be at least 3 characters");
    } else {
      setSuccess(lastName);
      isLastNameValid = true;
    }

    if (emailValue == "") {
      setError(email, "Email is required");
    } else if(!emailRegex.test(emailValue)) {
      setError(email, "Enter a valid email");
    } else {
      setSuccess(email);
      isEmailValid = true;
    }

    if (phoneValue == "") {
      setError(phone, "Phone number is required");
    } else if (!phoneRegex.test(phoneValue)) {
      setError(phone, "Enter a valid phone number");
    } else {
      setSuccess(phone);
      isPhoneNumberValid = true;
    }

    if (select.value == "") {
      setError(select, "Please select a class");
    } else {
      setSuccess(select);
      isSelectValid = true;
    }

    const isValid = isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid && isSelectValid;

    if (isValid) {
      const student = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phoneNumber: phoneValue,
        class: select.value,
      }
    }
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
    
  }
});
import { useState } from "react";
import styles from "./AddStudentModal.module.css";

export function StudentForm() {
  const formValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    class: "",
  };
  const [formData, setFormData] = useState(formValues);
  const [error, setError] = useState({});
  const allowedGenders = ["Male", "Female"];
  const allowedClasses = [
    { name: "Jss 1", value: "jss-1" },
    { name: "Jss 2", value: "jss-2" },
    { name: "Jss 3", value: "jss-3" },
    { name: "Ss 1", value: "ss-1" },
    { name: "Ss 2", value: "ss-2" },
    { name: "Ss 3", value: "ss-3" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (data, fieldName = null) => {
    let newErrors = {};

    if (fieldName === null || fieldName === "first_name") {
      if (!data.first_name.trim()) {
        newErrors.first_name = "First name is required";
      }
      if (data.first_name.length < 3) {
        newErrors.first_name = "First name should contain at least 3 characters";
      }
    }

    if (fieldName === null || fieldName === "last_name") {
      if (!data.last_name.trim()) {
        newErrors.last_name = "Last name is required";
      }
      if (data.last_name.length < 3) {
        newErrors.last_name = "Last name should contain at least 3 characters";
      }
    }

    if (fieldName === null || fieldName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (data.email.trim() && !emailRegex.test(data.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (fieldName === null || fieldName === "phone") {
      const phoneRegex = /^(070|080|081|090|091)\d{8}$/;
      if (!data.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!phoneRegex.test(data.phone.trim())) {
        newErrors.phone = "Enter a valid 11-digit Nigerian phone number";
      }
    }

    if (fieldName === null || fieldName === "date_of_birth") {
      if (!data.date_of_birth) {
        newErrors.date_of_birth = "Date of birth is required";
      } else {
        const today = new Date();
        const birthDate = new Date(`${data.date_of_birth}T00:00:00`);
        today.setHours(0, 0, 0, 0);
        if (Number.isNaN(birthDate.getTime())) {
          newErrors.date_of_birth = "Enter a valid date of birth";
        } else if (birthDate > today) {
          newErrors.date_of_birth = "Date of birth cannot be in the future";
        }
      }
    }

    if (fieldName === null || fieldName === "gender") {
      if (!data.gender) {
        newErrors.gender = "Please select a gender";
      } else if (
        !allowedGenders.some(
          (gender) => gender.toLowerCase() === data.gender.toLowerCase(),
        )
      ) {
        newErrors.gender = "Please select a valid gender";
      }
    }

    if (fieldName === null || fieldName === "class") {
      if (!data.class) {
        newErrors.class = "Please select a class";
      } else if (
        !allowedClasses.some((classes) => classes.value === data.class)
      ) {
        newErrors.class = "Please select a valid class";
      }
    }

    return newErrors;
  };

  const handleBlur = (e) => {
    const { name } = e.target

    const formValidation = validateForm(formData, name);

    setError((prevError) => {
      let existingError;
      if (formValidation[name]) {
        existingError = { ...prevError, [name]: formValidation[name] };
      } else {
        existingError = { ...prevError };
        delete existingError[name];
      }
      return existingError;
    });
  }

  const handleForm = (e) => {
    e.preventDefault();

    const formValidation = validateForm(formData);
    setError(formValidation);

    if (Object.keys(formValidation).length === 0) {
      console.log("Form Submitted");
      setFormData(formValues);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleForm}>
      <div className={styles.formContent}>
        <div className={styles.formControl}>
          <label htmlFor="first-name">
            First name <span>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {error ? (
            <p className={styles.errorMessage}>{error.first_name}</p>
          ) : (
            ""
          )}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="last-name">
            Last name <span>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {error ? (
            <p className={styles.errorMessage}>{error.last_name}</p>
          ) : (
            ""
          )}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="someone@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {error ? (
            <p className={styles.errorMessage}>{error.email}</p>
          ) : (
            ""
          )}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="phone">
            Phone <span>*</span>
          </label>
          <input
            type="tel"
            placeholder="070*****646"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {error ? (
            <p className={styles.errorMessage}>{error.phone}</p>
          ) : (
            ""
          )}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="date-of-birth">
            Date of Birth <span>*</span>
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {error ? (
            <p className={styles.errorMessage}>{error.date_of_birth}</p>
          ) : (
            ""
          )}
        </div>

        <div className={styles.formControl}>
          <label>
            Gender <span>*</span>
          </label>
          <select name="gender" value={formData.gender} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select your Gender</option>
            {allowedGenders.map((gender) => (
              <option value={gender.toLowerCase()} key={gender.toLowerCase()}>
                {gender}
              </option>
            ))}
          </select>
          {error ? (
            <p className={styles.errorMessage}>{error.gender}</p>
          ) : (
            ""
          )}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="class">
            Class <span>*</span>
          </label>
          <select name="class" value={formData.class} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select your Class</option>
            {allowedClasses.map((classes) => (
              <option value={classes.value} key={classes.value}>
                {classes.name}
              </option>
            ))}
          </select>
          {error ? (
            <p className={styles.errorMessage}>{error.class}</p>
          ) : (
            ""
          )}
        </div>
      </div>

      <button className={styles.addButton} type="submit">Add Student</button>
    </form>
  );
}

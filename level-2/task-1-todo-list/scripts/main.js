document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskBoxContainer = document.getElementById("task-box-container");
  const taskHeader = document.getElementById("task-header");
  const formButton = document.getElementById("form-btn");

  const form = document.getElementById("form");
  const taskName = document.getElementById("task-name");
  const taskDescription = document.getElementById("task-description");
  const formControl = document.querySelectorAll(".form-control");

  const todoContainer = document.getElementById("todo-container");
  const emptyTask = document.querySelector(".empty-task");

  let tasks = [];
  let taskBeingEditedId = null;

  addTaskBtn.addEventListener("click", () => {
    taskBoxContainer.classList.add("show");
  });

  taskBoxContainer.addEventListener("click", (e) => {
    if (e.target == taskBoxContainer) {
      taskBoxContainer.classList.remove("show");
    }
  });

  handleTaskToggle();
  deleteTask();
  editTask();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (taskBeingEditedId !== null) {
      let taskToEdit = tasks.find(task => task.taskId === taskBeingEditedId);
      taskToEdit.taskName = taskName.value;
      taskToEdit.taskDescription = taskDescription.value;
      taskHeader.textContent = "Create Task";
      formButton.textContent = "Create Task";
      displayTask(tasks);
      resetForm(form, formControl);
      taskBoxContainer.classList.remove("show");
      taskBeingEditedId = null;
    } else {
      getUserData();
      displayTask(tasks);
    }
  });

  function getUserData() {
    const taskNameValue = validateTaskName();
    const taskDescriptionValue = validateTaskDescription();

    const isValid = taskNameValue && taskDescriptionValue;
    if (isValid) {
      const taskData = {
        taskId: generateTaskId(),
        taskName: taskNameValue,
        taskDescription: taskDescriptionValue,
        checkBoxId: generateCheckBoxId(),
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };
      tasks.push(taskData);
      resetForm(form, formControl);
      taskBoxContainer.classList.remove("show");
    }
  }

  function displayTask(tasks) {
    if (tasks.length <= 0) {
      emptyTask.style.display = "block";
      todoContainer.innerHTML = "";
    } else {
      emptyTask.style.display = "none";
      todoContainer.innerHTML = "";

      tasks.forEach((task) => {
        todoContainer.innerHTML += `
        <div class="todo-item">
          <label class="task-check-box">
            <input type="checkbox" name="checkbox" id="${task.checkBoxId}" />
            <span class="check-mark"></span>
          </label>
          <div>
            <label for="${task.checkBoxId}">${task.taskName}</label>
            <p>${task.taskDescription}</p>
          </div>

          <div>
            <img src="./images/edit.svg" alt="" id="${task.taskId}" class="edit-task">
          </div>

          <div>
            <img src="./images/delete.svg" alt="" id="${task.taskId}" class="delete-btn">
          </div>

        </div>
        `;
      });
    }
  }

  function handleTaskToggle() {
    todoContainer.addEventListener("change", (e) => {
      const clickedCheckBox = e.target;
      const inputId = clickedCheckBox.id;
      let newTask;

      if (clickedCheckBox.checked) {
        newTask = tasks.map((task) =>
          task.checkBoxId === inputId ? { ...task, isCompleted: true } : task,
        );
        tasks = [...newTask];
      } else {
        newTask = tasks.map(task => task.checkBoxId === inputId ? { ...task, isCompleted: false } : task);
        tasks = [...newTask];
      }
      console.log(newTask);
    });

  }

  function deleteTask() {
    todoContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const isToDelete = e.target.id;
        console.log(isToDelete);

        const newTask = tasks.filter((task) => task.taskId !== isToDelete);
        tasks = [...newTask];
        console.log(tasks);
        displayTask(tasks);
      }
    });
  }

  function editTask() {
    todoContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit-task")) {
        let editedTaskId = e.target.id;

        const taskToEdit = tasks.find(task => task.taskId === editedTaskId);
        taskBoxContainer.classList.add("show");
        taskHeader.textContent = "Edit Task";
        formButton.textContent = "Edit Task";
        taskName.value = taskToEdit.taskName;
        taskDescription.value = taskToEdit.taskDescription
        taskBeingEditedId = editedTaskId
      }
    })
  }

  function editUserData(taskData) {
    
  }

  function validateTaskName() {
    let isValid = false;
    const taskNameValue = taskName.value.trim();

    if (taskNameValue == "") {
      setError(taskName, "This field cannot be empty");
    } else if (taskNameValue.length <= 2) {
      setError(taskName, "This field must contain at least 3 characters");
    } else {
      setSuccess(taskName);
      isValid = true;
    }

    return isValid && taskNameValue;
  }

  function validateTaskDescription() {
    let isValid = false;
    const taskDescriptionValue = taskDescription.value.trim();

    if (taskDescriptionValue == "") {
      setError(taskDescription, "This field cannot be empty");
    } else if (taskDescriptionValue.length <= 2) {
      setError(
        taskDescription,
        "This field must contain at least 3 characters",
      );
    } else {
      setSuccess(taskDescription);
      isValid = true;
    }

    return isValid && taskDescriptionValue;
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

  function resetForm(form, formControl) {
    formControl.forEach((fc) => {
      fc.classList.remove("success", "error");
    });

    form.reset();
  }

  function generateTaskId() {
    let highestNumber = 0;
    // TSK-20260901-001
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const date = String(now.getDate()).padStart(2, "0");
    let newTaskId = "TSK-" + year + month + date + "-";

    tasks.forEach((task) => {
      let id = Number(task.taskId.split("-")[2]);
      if (id > highestNumber) {
        highestNumber = id;
      }
    });
    const newSequenceNumber = String(++highestNumber).padStart(3, "0");
    newTaskId += newSequenceNumber;
    return newTaskId;
  }

  function generateCheckBoxId() {
    let highestNumber = 0;
    // checkbox-001;
    let checkBoxId = "checkbox-";
    tasks.forEach((task) => {
      let currentBoxId = Number(task.checkBoxId.split("-")[1]);
      if (currentBoxId > highestNumber) {
        highestNumber = currentBoxId;
      }
    });
    let newHighestNumber = String(++highestNumber).padStart(3, "0");
    checkBoxId += newHighestNumber;
    return checkBoxId;
  }
});

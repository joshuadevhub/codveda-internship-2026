document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskBoxContainer = document.getElementById("task-box-container");

  addTaskBtn.addEventListener("click", () => {
    taskBoxContainer.classList.add("show");
  })
})
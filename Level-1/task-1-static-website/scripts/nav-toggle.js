document.addEventListener("DOMContentLoaded", () => {
  const navBar = document.getElementById("primary-navigation");
  const menuToggle = document.getElementById("menu-toggle");
  const closeToggle = document.getElementById("close-toggle");
  const overlay = document.querySelector(".overlay");

  menuToggle.addEventListener("click", () => {
    navBar.classList.add("isOpen");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    overlay.classList.add("isOpen");
  })

  closeToggle.addEventListener("click", () => {
    navBar.classList.remove("isOpen");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    overlay.classList.remove("isOpen");
  })

  overlay.addEventListener("click", () => {
    overlay.classList.remove("isOpen");
  })
});
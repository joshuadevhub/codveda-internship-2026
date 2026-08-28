document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const closeToggle = document.getElementById("close-icon");
  const navBar = document.getElementById("navbar");

  const toggleMenu = () => {
    navBar.classList.add("isOpen");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  }

  const closeMenu = () => {
    navBar.classList.remove("isOpen");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  menuToggle.addEventListener("click", toggleMenu);
  closeToggle.addEventListener("click", closeMenu);
})
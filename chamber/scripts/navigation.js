// Hamburger menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const nav = document.querySelector("nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      nav.classList.toggle("open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
        nav.classList.remove("open");
      }
    });

    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }
});

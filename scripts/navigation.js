const menuButton = document.getElementById("menu-button");
const navMenu = document.querySelector("nav");
console.log(navMenu.classList);

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuButton.classList.toggle("open");
  console.log(navMenu.classList);
});

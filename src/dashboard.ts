const menuIcon = document.getElementById("menu-icon");
const menuContent = document.getElementById("menu-content");

menuIcon?.addEventListener("click", () => {
  if (menuContent) {
    menuContent.classList.toggle("menu-content");
  }
});

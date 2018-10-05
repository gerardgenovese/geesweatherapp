///////////////////////NAVBAR FUNCTIONALITY/////////////////////////





var countTheClicks = 0;

function clicked() {
  countTheClicks++;
  if (countTheClicks % 2 !== 0) {
    hamburgerToX();
    openMenu();
  } else if (countTheClicks % 2 === 0) {
    hamburgerNormal();
    closeMenu();
  }
  return countTheClicks;
}

//changes hamburger to X
function hamburgerToX() {
  const hamburger = document.querySelector(".hamburger");
  const top = document.querySelector(".hamburger-line1");
  const middle = document.querySelector(".hamburger-line2");
  const bottom = document.querySelector(".hamburger-line3");

  top.style.transform = "rotate(45deg)";
  top.style.top = "50%";
  top.style.transition = ".2s";
  middle.style.display = "none";
  bottom.style.transform = "rotate(-45deg)";
  bottom.style.top = "50%";
  bottom.style.transition = ".2s";
}

//reverts hamburger back to normal
function hamburgerNormal() {
  const hamburger = document.querySelector(".hamburger");
  const top = document.querySelector(".hamburger-line1");
  const middle = document.querySelector(".hamburger-line2");
  const bottom = document.querySelector(".hamburger-line3");

  top.style.transform = "rotate(0)";
  top.style.top = "0";
  top.style.transition = ".2s";
  middle.style.display = "block";
  bottom.style.transform = "rotate(0)";
  bottom.style.top = "100%";
  bottom.style.transition = ".2s";
}

//opens menu when hamburger is clicked
function openMenu() {
  const menu = document.querySelector(".menu");
  const links = document.querySelector(".mobile-navLinks");

  menu.className = "menu2";
  links.style.display = "block";

  // outsideClick();
}

//closes menu when hamburger is clicked
function closeMenu(countClicks) {
  const menu2 = document.querySelector(".menu2");
  const links = document.querySelector(".mobile-navLinks");
  if (menu2) {
    menu2.className = "menu";
    links.style.display = "none";
    countTheClicks = 0;
  }
}

//closes menu and reverts hamburger when the area outside of the menu is clicked
// function outsideClick() {
document.addEventListener("click", function(e) {
  const mobileHide = document.querySelector(".mobile-hide");
  let target = e.target;

  if (target === mobileHide) {
    closeMenu();
    hamburgerNormal();
  }
});




/////////////////////NAVBAR ENDS////////////////////////////


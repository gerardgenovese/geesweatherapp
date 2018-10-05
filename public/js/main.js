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





/////////////////////////////INDEX GET CITY INFO//////////////////////////////////



if (document.body.classList.contains("index")){

  //city codes for lookup
  const cityID1 = 5128638;
  const cityID2 = 4887442;
  const cityID3 = 5162774;
  const cityID4 = 4058076;
  const cityID5 = 5368381;
  const key = "f062c5c06e802d5ddf919342f82d2b1e";
    //retreive data from api
    function getCityData(){
  
      const weather = `https://api.openweathermap.org/data/2.5/group?id=${cityID1},${cityID2},${cityID3},${cityID4},${cityID5}&APPID=${key}&units=imperial`
    
      fetch(weather)
        .then(res => res.json())
        .then(data => {
  
          combineDataTypes(data);
  
        })
      .catch(err => err);
    }
    getCityData();
  
    //extract specific data and combine together
    function combineDataTypes(data){
  
      const cityNames = [];
      const cityTemps = [];
      const cityIcons = [];
  
      if(data){
        //loop through arrays from data
        const allData = data.list.map(val =>{
          return val;
        });
    
        //gets names of cities
        const getNames = allData.forEach(names => {
          cityNames.push(names.name);
        });
        //gets temp of city and converts to F from K
        const getTemps = allData.map(val => {
          const tempD = val.main.temp;
          const temp = tempD.toFixed(0) + String.fromCharCode(176);
          cityTemps.push(temp);
        });
        //gets all icon allData
        const getIcons = allData.map(icons => {
          cityIcons.push(icons.weather[0].icon);
        });
      }
      createCity(cityNames, cityTemps, cityIcons);
    }
  
    //create DOM elements from specific data passed by "combineDataTypes"
    function createCity(name, temp, icon){
  
        const city = document.querySelectorAll(".city");
      if(name,temp,icon){
        city.forEach((cities, index) => {
          let output = `
            <a href="#" class="cityName cityName${index}">${name[index]}</a>
            <div class="cityTemp">${temp[index]}</div>
            <div class="cityIcon"><img src=https://openweathermap.org/img/w/${icon[index]}.png></div>
            `;
            cities.innerHTML = output;
        });
      }
    }
    // createCity();
  
      let targetCityForLink = document.body.addEventListener("click", function(e){
      if (e.target.className === "cityName cityName0"){
        sessionStorage.setItem("city", cityID1);
        window.location.href="destination.ejs";
      } else if (e.target.className === "cityName cityName1"){
        sessionStorage.setItem("city", cityID2);
        window.location.href="destination.ejs";
      } else if (e.target.className === "cityName cityName2"){
        sessionStorage.setItem("city", cityID3);
        window.location.href="destination.ejs";
      } else if (e.target.className === "cityName cityName3"){
        sessionStorage.setItem("city", cityID4);
        window.location.href="destination.ejs";
      }	else if (e.target.className === "cityName cityName4"){
        sessionStorage.setItem("city", cityID5);
        window.location.href="destination.ejs";
      }
    });
  
  
  }
  

  
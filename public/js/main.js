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




///////////////////////////////NAVBAR ENDS/////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/////////////////////////////INDEX GET 5 CITY INFO//////////////////////////////////



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
        //gets temp of city 
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
    let targetCityForLink = document.body.addEventListener("click", function(e){
    if (e.target.className === "cityName cityName0"){
      sessionStorage.setItem("city", cityID1);
      window.location.href="/cityLinks";
    } else if (e.target.className === "cityName cityName1"){
      sessionStorage.setItem("city", cityID2);
      window.location.href="/cityLinks";
    } else if (e.target.className === "cityName cityName2"){
      sessionStorage.setItem("city", cityID3);
      window.location.href="/cityLinks";
    } else if (e.target.className === "cityName cityName3"){
      sessionStorage.setItem("city", cityID4);
      window.location.href="/cityLinks";
    }	else if (e.target.className === "cityName cityName4"){
      sessionStorage.setItem("city", cityID5);
      window.location.href="/cityLinks";
    }
  });


}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////WHEN A 5 CITY LINK CLICKED JS BELOW GETS THAT INFO/////////////////////

  



//only use if the document body has correct class (keeps console clean)
if (document.body.classList.contains("cityLinks")){


  //fetch forecast info
  function propagateCityInfo(){

    const key = "f062c5c06e802d5ddf919342f82d2b1e";
    const forecastID = sessionStorage.getItem("city");
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?id=${forecastID}&APPID=${key}&units=imperial`;

   
    fetch(forecast)
      .then(res => res.json())
      .then(data => {   
      retreiveCityData(data);
    })
      .catch(err => err);
  }
  propagateCityInfo();



function retreiveCityData(data){
  
  createCityHeader(data);

  const time = [];
  const day = [];
  const temps = [];
  const icons = [];
 
  if(data){
////////////HOURLY FORECAST TIME AND DAY////////////
    data.list.forEach(val => {
      let getTime = val.dt_txt;
      let getDay = val.dt_txt;
  
      //slice out time & date
      getTime = getTime.slice(11);
      getDay = getDay.slice(5, 10);
      day.push(getDay);

      //create custom AM PM ending
      let AMPM;
      //ensure time looks normal
      if (parseInt(getTime) > 12){
        AMPM = "PM";
        getTime = parseInt(getTime) - 12 + ":00" + AMPM;
      } else if (parseInt(getTime) === 0){
        getTime = "12:00AM";
      } else if (parseInt(getTime) === 12){
        getTime = "12:00PM";
      } else {
        AMPM = "AM";
        getTime = parseInt(getTime) + ":00" + AMPM;
      }
      //push all times to array with AM or PM 
      time.push(getTime);

//////////TEMPS AND ICONS/////////////
      const tempD = val.main.temp;
      const tempX = tempD.toFixed(0) + String.fromCharCode(176);
      temps.push(tempX)
      icons.push(val.weather[0].icon);

    });
  }
  createSingleCityInfo(time,day,temps,icons);
}


function createCityHeader(data){
  // console.log(data);  

  if(data){

    const name = data.city.name;
    const weather = data.list[0].weather[0].main;
    const detailsData = data.list[0].weather[0].description;
    const details = detailsData.charAt(0).toUpperCase() + detailsData.slice(1);
    const iconData = data.list[0].weather[0].icon;
    const icon = `https://openweathermap.org/img/w/${iconData}.png`;
    const tempD = data.list[0].main.temp;
    const temp = tempD.toFixed(0) + String.fromCharCode(176); 
    const wind = data.list[0].wind.speed + "mph";
    const humidity = data.list[0].main.humidity;
    
    const cityHeader = document.querySelector(".city__header-contain"); 

    let cityHeaderOutput = `
    <div class="city__header">
      <div class="city__header--name">${name}</div>
      <div class="city__header--weather">${weather}</div>
      <div class="city__header--details">( ${details} )</div>
    </div>
    <div class="city__weather--contain">
      <div class="city__weather--contain-inner">
        <img src ="${icon}" class="city__weather--icon"/>
        <div class="city__weather--temp">${temp}</div>
      </div>
      <div>
        <div class="city__weather--wind">Wind: ${wind}</div>
        <div class="city__weather--humidity">Humidity: ${humidity}%</div>
      </div>
    </div>
    `;
    cityHeader.innerHTML = cityHeaderOutput;
  }
}


function createSingleCityInfo(time,day,temps,icons){

///////PROPAGATE HOURLY FORECAST////////
  const hourlyInfo = document.querySelectorAll(".hourly--info");
  const fiveDay = document.querySelectorAll(".fiveDay");
  if(time,day,temps,icons){
    hourlyInfo.forEach((info, index) => {
      let hourlyOutput = `
      <div class="hourly--time">${time[index]}</div>
      <img src=https://openweathermap.org/img/w/${icons[index]}.png class="hourly--icon"/>
      <div class="hourly--temp">${temps[index]}</div>
      `;
      info.innerHTML = hourlyOutput;
    });
    // console.log(time);
    /////////PROPAGATE 5 DAY FORECAST//////////
    fiveDay.forEach((info, index) => {
      let fiveDayOutput = `
      <div class="fiveDay--info">
        <div class="fiveDay--day">${day[index]}</div>
        <img src=https://openweathermap.org/img/w/${icons[index]}.png class="fiveDay--icon"/>
        <div class="fiveDay--temp">${temps[index]}</div>
      </div>    
      `;  
      info.innerHTML = fiveDayOutput;   
    }); 
  }
}
}  




///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////SEARCH FOR CITY JS LOGIC BELOW/////////////////////




if (document.body.classList.contains("searchCity")){

  let submit = document.getElementById("submit");

  submit.addEventListener("click", function(e){
    
    e.preventDefault();
  
    let city;
    let find = document.getElementById("find").value;

    city = find;
    findCity(city);
    
    document.getElementById("find").value = "";
  });


function findCity(city){

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=f062c5c06e802d5ddf919342f82d2b1e`)
  .then(handleErrors) 
  .then(res => res.json())

  .then(data => {
  
  
  console.log(data);


  const city = data.name;
  const kelvinToF = data.main.temp * 9/5 - 459.67;
  const temp = (kelvinToF.toFixed(0)) + String.fromCharCode(176);
  const weather = data.weather[0].main;
  const detailsData = data.weather[0].description;
  const details = detailsData.charAt(0).toUpperCase() + detailsData.slice(1);
  const wind = data.wind.speed + "mph";
  const humidity= data.main.humidity;
  const iconData = data.weather[0].icon;
  const icon = `https://openweathermap.org/img/w/${iconData}.png`;

  const findCity = document.getElementById("find__city-container");

  let findCityOutput = `		
  <div class="find__city--name">${city}</div>
  <div class="find__city--contain">
    <div class="find__city--temp">${temp}</div>
    <div class="find__city--weather">${weather} </div>
    <div class="find__city--details"> (${details})</div>
    <img src="${icon}"class="find__city--icon" /> 
    <div class="find__city--wind">Wind: ${wind}</div>
    <div class="find__city--humidity">Humidity: ${humidity}</div>
  </div>
  `;
  
  findCity.innerHTML = findCityOutput;
  
  })
  .catch(err => {
    console.log(err);
  })
}


function handleErrors(res){
  if (!res.ok){
    throw Error(addError());
  }
  return res;
}


function addError() {
  let errorMessage = document.getElementById("errorMessage");
  
  let showError = setInterval(function(){
    errorMessage.style.display = "flex";
  },50)
  
  setTimeout(function(){
    clearInterval(showError);
      errorMessage.style.display = "none";
  },3000)
}
}



///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////IMAGE SLIDER JS LOGIC BELOW/////////////////////



if (document.body.classList.contains("index")){
  let imgSlideShowIndex = 0;

  function imgSlideShow() {
    let i;
    let imgSlides = document.getElementsByClassName("imgSlides");
    for (i = 0; i < imgSlides.length; i++) {
      imgSlides[i].style.display = "none";  
    }
    imgSlideShowIndex++;
    if (imgSlideShowIndex > imgSlides.length) {imgSlideShowIndex = 1}    
    imgSlides[imgSlideShowIndex-1].style.display = "block";  
    setTimeout(imgSlideShow, 10000);    
  }
  imgSlideShow();
}





///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////CUSTOM DATE/TIME JS LOGIC BELOW/////////////////////



if (document.body.classList.contains("destination")){

  function setDate() {
  
    var now = new Date();
  
    var seconds = now.getSeconds().toString();
    var mins = now.getMinutes().toString();
    var hour = now.getHours().toString();
  
    if (hour > 12) {
      hour -= 12;
    }
    if (mins < 10) {
      mins = 0 + mins;
    }
    if (seconds < 10) {
      seconds = 0 + seconds;
    }
    /*------- check this over AMPM-----*/
    var AMPM = function() {
      var now = new Date();
      var hour = now.getHours();
  
      if (hour > 12) {
        return ' PM';
      } else {
        return ' AM';
      } 
    }
    /*--------GET THE DAY--------------------*/
  
    switch (now.getDay()) {
      case 0:
          day = "Sunday";
          break;
      case 1:
          day = "Monday";
          break;
      case 2:
          day = "Tuesday";
          break;
      case 3:
          day = "Wednesday";
          break;
      case 4:
          day = "Thursday";
          break;
      case 5:
          day = "Friday";
          break;
      case 6:
          day = "Saturday";
    }
  
  
  //----------GET THE MONTH---------//
  
    switch (now.getMonth()) {
      case 0:
          month = "January ";
          break;
      case 1:
          month = "February ";
          break;
      case 2:
          month = "March ";
          break;
      case 3:
          month = "April ";
          break;
      case 4:
          month = "May ";
          break;
      case 5:
          month = "June ";
          break;
      case 6:
          month = "July ";
          break;
      case 7:
          month = "August ";
          break;
      case 8:
          month = "September ";
          break;
      case 9:
          month = "October ";
          break;
      case 10:
          month = "November ";
          break;
      case 11:
          month = "December ";
          break;
      }
  
  //--------ADD THE SUFFIX FOR EACH DAY----------//
  
    function end(day) {
      day = now.getDate();
  
      if (day == 1 || day == 21 || day == 31) {
        return "st";
      } else if (day == 2 || day == 22) {
        return "nd";
      } else if (day == 3 || day == 23) {
        return "rd";
      } else if (day == 4 || day == 5 || day == 6 || day == 7 || day == 8 || day == 9 || day == 10 || day == 11 || day == 12 || day == 13 || day == 14 || day == 15 || day == 16 || day == 17 || day == 18 || day == 19 || day == 20 || day == 24 || day == 25 || day == 26 || day == 27 || day == 28 || day == 29 || day == 30){
        return "th";
      }
    } 
    //--------COMBINE ALL DATA TO CREATE DAY DATE & TIME----------------//
    let inputTime = day + " " +  month + now.getDate() + end() + ", " + hour + ":" + mins + ":" + seconds + AMPM();
    document.getElementById('time').innerHTML = inputTime;
  }
  
  setInterval(setDate, 1000);
  
  setDate();

  
}

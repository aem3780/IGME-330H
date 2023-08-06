//import web components
import "./ww-footer.js";
import "./ww-favoritecard.js";
import {loadFile} from "./utils.js";
//keys and prefixes for local storage
const prefix = "aem3780P1330-";
const favKey = prefix + "faveCities";
//fetch favorites from storage
let favoriteCities = localStorage.getItem(favKey);
let favorites = JSON.parse(favoriteCities);
//get html elements for event listeners
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');
//URLs to complete searches
const cityURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const zipURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const KEY = "&units=imperial&appid=1a88615045a392a793d29428e9a0082f";
//variables
let searchURL;
let city; 
let intCity; 
let zipcode;

//toggle burger icon on and off for mobile
burgerIcon.addEventListener('click', () => 
{
  navbarMenu.classList.toggle('is-active');
});

//create weather watch card for favorites
const showWeather = wwObj =>{
  document.querySelector("#status").innerHTML = `Here are your favorited locations:`;
  const wwCard = document.createElement("ww-card");
  //default values if they cannot be found
  wwCard.dataset.name = wwObj.name ?? "City name not found";
  wwCard.dataset.main = wwObj.weather[0].main ?? "?";
  wwCard.dataset.description = wwObj.weather[0].description ?? "?";
  wwCard.dataset.temp = wwObj.main.temp ?? "°F";
  wwCard.dataset.feelslike = wwObj.main.feels_like ?? "°F";
  wwCard.dataset.humidity = wwObj.main.humidity ?? "%";
  wwCard.dataset.windspeed = wwObj.wind.speed ?? "mph";
  //append to html 
  document.querySelector(".card-list").appendChild(wwCard);


};

//if value is changes call showweather for that value
const selectChange = e => {
  const wwID = e.target.value;
  if(wwID == 0) return; 
  const wwObj = json.name; 
  if(wwObj) showWeather(wwObj);
};

//when url is loaded
const jsonLoaded = json => {
  //store location name in object
  let obj = json.name;

  //create the <option> elements and hook up the `onchange` event
  const optionHTML = Object.keys(favorites).map(wwc => `<option value="${favorites[wwc]}">${favorites[wwc]}</option>`).join("");
  const select = document.querySelector("#location-select");
  select.innerHTML = optionHTML;
  select.onchange = selectChange;
  showWeather(json)
};

// function showFavoriteCities(){
//   let result;
//   //loop through favorites array
//   for (let i = 0; i < favorites.length; i++) {
//       //set the resultURL to the favorite image at i
//       let cityname = favorites[i];
//       //create new image tag for the favorite image at i 
//       result = `<option value="${cityname}">${cityname}</option>`;
//       //update user that their favorites are being displayed
//       document.querySelector("#status").innerHTML = "Here are your favorited locations:";
//   }
//   //display favorites to user
//   document.querySelector("#location-select").innerHTML += result;
// }

//called when clear is clicked
function clearButtonClicked(){
  let string;
  //set favorites to empty array
  favorites = [];
  //store the favorites array as a string and store in local storage
  favoriteCities = JSON.stringify(favorites);
  localStorage.setItem(favKey, favoriteCities);
  //updates the user that they have cleared their favorites and clears the content area
  document.querySelector("#status").innerHTML = "You have cleared your favorites!";
  document.querySelector(".card-list").innerHTML = "";
  string = `<option>No Favorites Found</option>`;
  document.querySelector("#location-select").innerHTML = "";
  document.querySelector("#location-select").innerHTML += string;
  
}

//when search button clicked create location URL and fetch data
function citySearchClicked(){
  city = document.querySelector("#location-select").value;
  searchURL = cityURL + city + KEY;
  document.querySelector("#status").innerHTML = `Searching...`;
  loadFile(searchURL,jsonLoaded);
}

window.onload = function() {
  let result;
  //loop through favorites array
  for (let i = 0; i < favorites.length; i++) {
      let cityname = favorites[i];
      //create new option tag for the favorite location at i 
      result = `<option value="${cityname}">${cityname}</option>`;
      //update user that their favorites are being displayed
      document.querySelector("#status").innerHTML = "Here are your favorited locations:";
      document.querySelector("#location-select").innerHTML += result;
  }

};

//on click events
document.querySelector("#search-city").onclick = citySearchClicked;
document.querySelector("#clear").onclick = clearButtonClicked;



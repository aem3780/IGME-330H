//import web components
import "./ww-footer.js";
import "./ww-favoritecard.js";
import {loadFile} from "./utils.js";

//keys and prefixes for local storage
const prefix = "aem3780P1330-";
const favKey = prefix + "faveCities";
const favZip = prefix + "faveZip";

//get html elements for event listeners
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');
//URLs to complete searches
const cityURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const zipURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
//API key
const KEY = "&units=imperial&appid=1a88615045a392a793d29428e9a0082f";
//variables
let searchURL;
let value;
let favoriteCities;
let favoriteZipcodes;

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
};

//when url is loaded
const jsonLoaded = json => {

  //create the <option> elements and hook up the `onchange` event
  let optionHTML = Object.keys(favoriteCities).map(wwc => `<option value="${favoriteCities[wwc]}">${favoriteCities[wwc]}</option>`).join("");
  optionHTML += Object.keys(favoriteZipcodes).map(wwc => `<option value="${favoriteZipcodes[wwc]}">${favoriteZipcodes[wwc]}</option>`).join("");
  const select = document.querySelector("#location-select");
  select.innerHTML = optionHTML;
  select.onchange = selectChange;
    showWeather(json)
  
};

//called when clear is clicked
function clearButtonClicked(){
  let string;
  //set favorites to empty array
  favoriteCities = [];
  favoriteZipcodes = [];
  //reset item and store in local storage
  localStorage.setItem(favKey, favoriteCities);
  localStorage.setItem(favZip, favoriteZipcodes);
  //updates the user that they have cleared their favorites and clears the content area
  document.querySelector("#status").innerHTML = "You have cleared your favorites!";
  document.querySelector(".card-list").innerHTML = "";
  string = `<option>No Favorites Found</option>`;
  document.querySelector("#location-select").innerHTML = "";
  document.querySelector("#location-select").innerHTML += string;
  //disables buttons so that invalid searches cannot occur
  document.querySelector("#search-city").disabled = true;
  document.querySelector("#clear").disabled = true;
  
}

//when search button clicked create location URL and fetch data
function citySearchClicked(){

  value = document.querySelector("#location-select").value;
  searchURL = cityURL + value + KEY;
  document.querySelector("#status").innerHTML = `Searching...`;
  loadFile(searchURL,jsonLoaded);
}

//when window loads get favorites from local storage
window.onload = function() {
  favoriteCities = localStorage.getItem(favKey);
  favoriteZipcodes = localStorage.getItem(favZip);

  //check for null properties in localstorage
  if (favoriteCities != null){
    favoriteCities = favoriteCities.split(',');
  }
  else{
    //if null set equal to empty array, set property and split
    favoriteCities = [];
    localStorage.setItem(favKey, favoriteCities);
    favoriteCities = favoriteCities.split(',');
  }
  //check for null properties in localstorage
  if (favoriteZipcodes != null){
    favoriteZipcodes = favoriteZipcodes.split(',');
  }
    //if null set equal to empty array, set property and split
  else{
    favoriteZipcodes = [];
    localStorage.setItem(favZip, favoriteZipcodes);
    favoriteZipcodes = favoriteZipcodes.split(',');
  }
  
  let result;
  
  //if either favorites array exists
  if(favoriteCities || favoriteZipcodes){
    //filter empty spaces in array
      favoriteCities = favoriteCities.filter(word => word.length > 0);
      favoriteZipcodes = favoriteZipcodes.filter(word => word.length > 0);
          //loop through favorites array
          for (let i = 0; i < favoriteCities.length; i++) {
              let cityname = favoriteCities[i];
              //create new option tag for the favorite location at i 
              result = `<option value="${cityname}">${cityname}</option>`;
              //update user that their favorites are being displayed
              document.querySelector("#location-select").innerHTML += result;
          }
          //loop through favorites array
          for (let i = 0; i < favoriteZipcodes.length; i++) {
            let zipcode = favoriteZipcodes[i];
            //create new option tag for the favorite location at i 
            result = `<option value="${zipcode}">${zipcode}</option>`;
            //update user that their favorites are being displayed
            
            document.querySelector("#location-select").innerHTML += result;
        }
    document.querySelector("#status").innerHTML = "Here are your favorited locations:";
  }  
  else{
    document.querySelector("#status").innerHTML = "You have no favorited locations";
    document.querySelector("#search-city").disabled = true;
    document.querySelector("#clear").disabled = true;
  }

};

//on click events
document.querySelector("#search-city").onclick = citySearchClicked;
document.querySelector("#clear").onclick = clearButtonClicked;



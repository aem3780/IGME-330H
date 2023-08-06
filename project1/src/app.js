//import footer element
import "./ww-footer.js";
//keys and prefixes for local storage
const prefix = "aem3780P1330-";
const cityKey = prefix + "USCity";
const intCityKey = prefix + "IntCity";
const favKey = prefix + "faveCities";
//URLs to complete searches
const cityURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const zipURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
//API key
const KEY = "&units=imperial&appid=1a88615045a392a793d29428e9a0082f";
//get html elements for event listeners
const burgerIcon = document.querySelector('#burger');
const searchCityButton = document.querySelector('#search-city');
const searchIntCityButton = document.querySelector('#search-int-city');
const navbarMenu = document.querySelector('#nav-links');
//variables
let searchURL;
let city; 
let intCity; 
let zipcode;
//array of favorite locations and random facts
let weatherFacts = [];
let cityFavorites = [];
//fetch favorites from storage
let favoriteCities = localStorage.getItem(favKey);
let favorites = JSON.parse(favoriteCities);

//toggle burger icon on and off for mobile
burgerIcon.addEventListener('click', () => 
{
  navbarMenu.classList.toggle('is-active');
});

//when search button clicked create location URL and fetch data
function citySearchClicked(){
    city = document.querySelector("#city").value;
    searchURL = cityURL + city + KEY;
    document.querySelector("#output").innerHTML = `Searching...`;
    loadJsonFetch();
}

//add selected city to favorites array
function cityFavoriteClicked(){
  loadJsonFetch();
  city = document.querySelector("#city").value;
  //check for duplicate locations
  if(cityFavorites.includes(city)){
    return;
  }
  else{
      cityFavorites.push(city);
      //notify user of favorited location
      document.querySelector("#favorited").innerHTML = `${city} favorited!`;
  }
  favoriteCities = JSON.stringify(cityFavorites);
  localStorage.setItem(favKey, favoriteCities);
}

//when search button clicked create location URL and fetch data
function zipSearchClicked(){
    zipcode = document.querySelector("#zip").value;
    //check if string is empty
    if(zipcode != ""){
      //check if string is a number
      if(isNaN(zipcode))
      {
        let html = "";
        html += `<p class="has-text-danger">Please enter a valid zipcode.</p>`;
        document.querySelector("#output").innerHTML = html;
      }
      else
      {
       searchURL = zipURL + zipcode + KEY;
       loadJsonFetch();
      }
    }
    else
    {
      return;
    }
}

//when search button clicked create location URL and fetch data
function intCitySearchClicked(){
    intCity = document.querySelector("#int-city").value;
    searchURL = cityURL + intCity + KEY;
    document.querySelector("#output").innerHTML = `Searching...`;
    loadJsonFetch();
}

//add selected city to favorites array
function intcityFavoriteClicked(){
  loadJsonFetch();
  intCity = document.querySelector("#int-city").value;
    //check for duplicate locations
  if(cityFavorites.includes(intCity)){
    return;
  }
  else{
    //notify user of favorited location
    cityFavorites.push(intCity);
    document.querySelector("#favorited").innerHTML = `${intCity} favorited!`;
  }
  favoriteCities = JSON.stringify(cityFavorites);
  localStorage.setItem(favKey, favoriteCities);
}

//generates random index for array
function getRandomInt(max) {
  let num = Math.floor(Math.random() * max);
  return num;
}

//fetch json data from url
async function loadJsonFetch(){
  try{
    let response = await fetch(searchURL);
    //if valid search fetch corresponding information
    //else alert user of invalid search
    if(!response.ok){
        let html = "";
        html += `<p class="has-text-danger">Invalid search, please try again.</p>`;
        document.querySelector("#output").innerHTML = html;
    }

    let json = await response.json();
        let keys = Object.keys(json);
        let html = "";
          html += `<h3 class="has-text-weight-bold is-size-4">${json.name}</h3>`;
          html += `<p>Main: ${json.weather[0].main}</p>`;
          html += `<p>Description: ${json.weather[0].description}</p>`;
          html += `<p>Temperature: ${json.main.temp} °F </p>`;
          html += `<p>Feels Like: ${json.main.feels_like} °F </p>`;
          html += `<p>Humidity: ${json.main.humidity} % </p>`;
          html += `<p>Wind Speed: ${json.wind.speed} mph </p>`;

        document.querySelector("#output").innerHTML = html;

  }catch(e){
    document.querySelector("#output").innerHTML = `<p class="has-text-danger">Invalid search, please try again.</p>`;
    
  }
}

//when window loads resore last search terms from local storage
window.onload = (e) => {
    const city = document.querySelector("#city");
    const storedUSCity = localStorage.getItem(cityKey);
    const intCity = document.querySelector("#int-city");
    const storedIntCity = localStorage.getItem(intCityKey);

    //when location is changed update local storage 
    city.onchange = function(e){
        localStorage.setItem(cityKey, e.target.value);
    };
    //if there is a previously stored city in local storage set the loaction value to that city
    if(storedUSCity != null){
        city.querySelector(`option[value='${storedUSCity}']`).selected = true;
    }
    //when location is changed update local storage 
    intCity.onchange = function(e){
        localStorage.setItem(intCityKey, e.target.value);
    };
    //if there is a previously stored city in local storage set the loaction value to that city
    if(storedIntCity != null){
        intCity.querySelector(`option[value='${storedIntCity}']`).selected = true;
    }
    //onclick events 
    document.querySelector("#search-city").onclick = citySearchClicked;
    document.querySelector("#search-zip").onclick = zipSearchClicked;
    document.querySelector("#search-int-city").onclick = intCitySearchClicked;
    document.querySelector("#favorite-city").onclick = cityFavoriteClicked;
    document.querySelector("#favorite-int-city").onclick = intcityFavoriteClicked;
    //create array of random weather facts on load and display random facts
    weatherFacts = ["Dirt mixed with wind can make dust storms called black blizzards.", "A mudslide can carry rocks, trees, vehicles and entire buildings!", "The coldest temperature ever officially recorded was -89.2°C.", "About 2,000 thunderstorms rain down on Earth every minute.", "Raindrops can be the size of a housefly and fall at more than 30kmph.", "Wildfires sometimes create tornadoes made of fire called fire whirls.", "Waterspouts, or rotating columns of air over water, can make sea creatures rain down from the sky."];
    document.querySelector("#fact").innerHTML = weatherFacts[getRandomInt(6)];
}

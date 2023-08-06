//import footer element
import "./ww-footer.js";

//keys and prefixes for local storage
const prefix = "aem3780P1330-";
const cityKey = prefix + "USCity";
const zipKey = prefix + "Zipcode";
const intCityKey = prefix + "IntCity";
const favKey = prefix + "faveCities";
const favZip = prefix + "faveZip";
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
let cityname;
let lon;
let lat;
let geojson;
let favoriteCities;
let favoriteZipcodes;
//array of random facts
let weatherFacts = [];

//mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYWVtMzc4MCIsImEiOiJja3VwcjRnOWE0bzk0MnZvM2xva25kazdoIn0.A522KSqQi5nVpequt8AJxw';
//create new map on screen centered at the US
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v11',
  center: [-98, 39],
  zoom: 3
});
//add user controls
map.addControl(new mapboxgl.NavigationControl());

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
  city = document.querySelector("#city").value;
  //check for duplicate locations
  if(favoriteCities.includes(city)){
    document.querySelector("#favorited").innerHTML = `${city} has already been favorited!`;
  }
  else{
      favoriteCities.push(city);
      //notify user of favorited location
      document.querySelector("#favorited").innerHTML = `${city} favorited!`;
  }
  localStorage.setItem(favKey, favoriteZipcodes);
}

//when search button clicked create location URL and fetch data
function zipSearchClicked(){
    zipcode = document.querySelector("#zip").value;
    //check if string is empty
    if(zipcode != ""){
      //check if string is a number or of valid zipcode length
      if(isNaN(zipcode)|| zipcode.toString().length < 5)
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

//add selected zipcode to favorites array
function zipFavoriteClicked(){
  zipcode = document.querySelector("#zip").value;
  //check if string is a number or of valid zipcode length
  //dont allow invalid zipcodes to be favorited
  if(isNaN(zipcode)|| zipcode.toString().length < 5)
  {
    let html = "";
    html += `<p class="has-text-danger">Please enter a valid zipcode.</p>`;
    document.querySelector("#output").innerHTML = html;
    document.querySelector("#favorite-zip").disabled = true;
    return;
  }
  else{
    document.querySelector("#favorite-zip").disabled = false;
  }


  //check for duplicate locations
  if(favoriteZipcodes.includes(zipcode)){
    document.querySelector("#favorited").innerHTML = `${zipcode} has already been favorited!`;
  }
  else{
      favoriteZipcodes.push(zipcode);
      //notify user of favorited location
      document.querySelector("#favorited").innerHTML = `${zipcode} favorited!`;
  }
  localStorage.setItem(favZip, favoriteZipcodes);
}

//when search button clicked create location URL and fetch data
function intCitySearchClicked(){
    intCity = document.querySelector("#int-city").value;
    searchURL = cityURL + intCity + KEY;
    //inform user of search status
    document.querySelector("#output").innerHTML = `Searching...`;
    loadJsonFetch();
}

//add selected city to favorites array
function intcityFavoriteClicked(){
  intCity = document.querySelector("#int-city").value;
    //check for duplicate locations
  if(favoriteCities.includes(intCity)){
    document.querySelector("#favorited").innerHTML = `${intCity} has already been favorited!`;
  }
  else{
    //notify user of favorited location
    favoriteCities.push(intCity);
    document.querySelector("#favorited").innerHTML = `${intCity} favorited!`;
  }
  localStorage.setItem(favKey, favoriteCities);
}


//generates random index for facts array
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
        //store coordinates in variables so that new map marker can be generated
        cityname = json.name;
        lon = json.coord.lon;
        lat = json.coord.lat;

        //convert city information to geojson
        geojson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [lon, lat]
              },
              properties: {
                title: cityname,
              }
            }
          ]
        };
        //create marker for geojson features
        for (const { geometry, properties } of geojson.features) {
          // create a HTML element for each feature
          const el = document.createElement('div');
          el.className = 'marker';
        
          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
          .setLngLat(geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(`<h3><b>${properties.title}</b></h3><p>${json.weather[0].main}<br>${json.main.temp} °F </p>`)
          )
          .addTo(map);
        }
        //show weather data on the screen
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
    //notify user of invalid search
    document.querySelector("#output").innerHTML = `<p class="has-text-danger">Invalid search, please try again.</p>`;
    
  }
}

//when window loads restore last search terms from local storage
window.onload = (e) => {
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
    
    const city = document.querySelector("#city");
    const storedUSCity = localStorage.getItem(cityKey);
    const intCity = document.querySelector("#int-city");
    const storedIntCity = localStorage.getItem(intCityKey);
    const zipcode = document.querySelector("#zip");
    const storedZipcode = localStorage.getItem(zipKey);

    //when location is changed update local storage 
    city.onchange = function(e){
        localStorage.setItem(cityKey, e.target.value);
    };
    //if there is a previously stored city in local storage set the location value to that city
    if(storedUSCity != null){
        city.querySelector(`option[value='${storedUSCity}']`).selected = true;
    }
    //when location is changed update local storage 
    zipcode.onchange = function(e){
      document.querySelector("#favorite-zip").disabled = false;
      localStorage.setItem(zipKey, e.target.value);
    };
    //if there is a previously stored city in local storage set the location value to nothing
    if(storedZipcode != null){
        document.querySelector("#zip").defaultValue = storedZipcode.toString();
    }
    //when location is changed update local storage 
    intCity.onchange = function(e){
        localStorage.setItem(intCityKey, e.target.value);
    };
    //if there is a previously stored city in local storage set the location value to that city
    if(storedIntCity != null){
        intCity.querySelector(`option[value='${storedIntCity}']`).selected = true;
    }
    //onclick events 
    document.querySelector("#search-city").onclick = citySearchClicked;
    document.querySelector("#search-zip").onclick = zipSearchClicked;
    document.querySelector("#search-int-city").onclick = intCitySearchClicked;
    document.querySelector("#favorite-city").onclick = cityFavoriteClicked;
    document.querySelector("#favorite-zip").onclick = zipFavoriteClicked;
    document.querySelector("#favorite-int-city").onclick = intcityFavoriteClicked;
    //create array of random weather facts on load and display random facts
    weatherFacts = ["Dirt mixed with wind can make dust storms called black blizzards.", "A mudslide can carry rocks, trees, vehicles and entire buildings!", "The coldest temperature ever officially recorded was -89.2°C.", "About 2,000 thunderstorms rain down on Earth every minute.", "Raindrops can be the size of a housefly and fall at more than 30kmph.", "Wildfires sometimes create tornadoes made of fire called fire whirls.", "Waterspouts, or rotating columns of air over water, can make sea creatures rain down from the sky."];
    document.querySelector("#fact").innerHTML = weatherFacts[getRandomInt(6)];
}

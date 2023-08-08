"use strict";

let words1 = [];
let words2 = [];
let words3 = [];

window.onload = () => {
    loadJsonXHR();
};


function randomElement(array){
    return array[Math.floor(Math.random()* array.length)];
}

function loadJsonXHR(){
    
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
      console.log(`In onload - HTTP Status Code = ${e.target.status}`);

      document.querySelector("#myButton").onclick = function() { generateTechnobabble(1) };
      document.querySelector("#fiveButton").onclick = function() { generateTechnobabble(5) };
      
      let json;
      try{
        json = JSON.parse(e.target.responseText);

    } catch{
        document.querySelector("#output").innerHTML = "Invalid JSON"
    }
   
    words1 = json["wordslist1"].wordlist;
    words2 = json["wordslist2"].wordlist;
    words3 = json["wordslist3"].wordlist;
    generateTechnobabble(1);

    };
    xhr.onerror = (e) =>
      console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
      xhr.open("GET", url);
      xhr.send();
  }

function generateTechnobabble(num){
    document.querySelector("#output").innerHTML = "";
    for (let i = 0; i < num; i++) {
        document.querySelector("#output").innerHTML += `${randomElement(words1)}${randomElement(words2)}${randomElement(words3)}<br>`;
    }
}

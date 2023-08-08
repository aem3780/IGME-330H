"use strict";
let words1 = [];
let words2 = [];
let words3 = [];

window.onload = () => {
    loadTextXHR();
    document.querySelector("#myButton").onclick = function() { generateTechnobabble(1) };
    document.querySelector("#fiveButton").onclick = function() { generateTechnobabble(5) };
};

function randomElement(array){
    return array[Math.floor(Math.random()* array.length)];
}

function loadTextXHR(){
    
    const url = "data/babble-data.csv";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
      console.log(`In onload - HTTP Status Code = ${e.target.status}`);
      const text = e.target.responseText;
      console.log(`Success - the file length is ${text.length}`);

      const lines = text.split("\n");
      words1 = lines[0].split(",");
      words2 = lines[1].split(",");
      words3 = lines[2].split(",");
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
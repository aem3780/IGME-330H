"use strict";

let wordsone = [];
let wordstwo = [];
let wordsthree = [];

window.onload = () => {
    loadXmlXHR();

};

document.querySelector("#myButton").onclick = function() { generateTechnobabble(1) };
document.querySelector("#fiveButton").onclick = function() { generateTechnobabble(5) };

function randomElement(array){
    return array[Math.floor(Math.random()* array.length)];
}

function loadXmlXHR(){
    
    const url = "data/babble-data.xml";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
      console.log(`In onload - HTTP Status Code = ${e.target.status}`);
      const xml = e.target.responseXML;


      if(!xml){
        document.querySelector("#output").innerHTML = "XML is null.";
        return;
    }
   
    wordsone = xml.querySelector("wordlist[cid='words1']").textContent.split(",");
    wordstwo = xml.querySelector("wordlist[cid='words2']").textContent.split(",");
    wordsthree = xml.querySelector("wordlist[cid='words3']").textContent.split(",");
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
        document.querySelector("#output").innerHTML += `${randomElement(wordsone)}${randomElement(wordstwo)}${randomElement(wordsthree)}<br>`;
    }
}
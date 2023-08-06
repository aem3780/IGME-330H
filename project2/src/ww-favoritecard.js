//template  for div component that is created
const template = document.createElement("template");
template.innerHTML = `
<style>
div{
    height: 340px;
    width: 170px;
    border: 1px solid gray;
    padding: .5rem;
    overflow: auto;
    font-size: .7rem;
    position: relative;
  }  
h2{
    font-size: 1.1rem;
    letter-spacing: .67px;
    line-height: 1.2;
    margin-top: 20px;
    color: hsl(171, 100%, 41%);
  }

  button{
      border-radius: 1px;
      padding: 2px;
      position: absolute;
      top:1px;
      right:1px;
      opacity: 0.5;
      color: hsl(171, 100%, 41%);
  }
  button:hover{
    opacity: 1;
  }
</style>
<div>
<h2></h2>
<button>X</button>
<p id="wwMain">Main: </p>
<p id="wwDescription">Description: </p>
<p id="wwTemp"Temperature: </p>
<p id="wwFeelsLike">Feels Like: </p>
<p id="wwHumidity">Humidity: </p>
<p id="wwWind">Wind Speed: </p>
</div>
`;
  //class for ww-card element
class WWCard extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:"open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.h2 = this.shadowRoot.querySelector("h2");
        this.p1 = this.shadowRoot.querySelector("#wwMain");
        this.p2 = this.shadowRoot.querySelector("#wwDescription");
        this.p3 = this.shadowRoot.querySelector("#wwTemp");
        this.p4 = this.shadowRoot.querySelector("#wwFeelsLike");
        this.p5 = this.shadowRoot.querySelector("#wwHumidity");
        this.p6 = this.shadowRoot.querySelector("#wwWind");
        this.button = this.shadowRoot.querySelector("button");
    }

//remove elements when x is clicked
connectedCallback(){
    this.button.onclick = () => this.remove();
    this.render();

}
disconnectedCallback(){
    this.button.onclick = null;
}

attributeChangedCallback(attributeName, oldVal, newVal){
    this.render();
}
//get attributes values of available
static get observedAttributes(){
    return ["data-name", "data-main", "data-description", "data-temp", "data-feelslike", "data-humidity", "data-windspeed"];
}

render(){
    //assign values to cordinating attributes
    const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>... Location ...</i>";
    const main = this.getAttribute('data-main') ? this.getAttribute('data-main') : "Unknown";
    const description = this.getAttribute('data-description') ? this.getAttribute('data-description'): "Unknown";
    const temp = this.getAttribute('data-temp') ? this.getAttribute('data-temp') : "Not found...";
    const feelslike = this.getAttribute('data-feelslike') ? this.getAttribute('data-feelslike') : "Not found...";
    const humidity = this.getAttribute('data-humidity') ? this.getAttribute('data-humidity') : "Not found...";
    const windspeed = this.getAttribute('data-windspeed') ? this.getAttribute('data-windspeed') : "Not found...";

    //set this. elements to display attribute values
    this.h2.innerHTML = `${name}`;
    this.p1.innerHTML = `Main: ${main}`;
    this.p2.innerHTML = `Description: ${description}`;
    this.p3.innerHTML = `Temperature: ${temp}°F`;
    this.p4.innerHTML = `Feels like: ${feelslike}°F`;
    this.p5.innerHTML = `Humidity: ${humidity}%`;
    this.p6.innerHTML = `Wind Speed: ${windspeed}mph`;
}
}
//define card web component
customElements.define('ww-card', WWCard);
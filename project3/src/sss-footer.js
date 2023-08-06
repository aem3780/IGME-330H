//template  for div component that is created
  const template = document.createElement("template");
  template.innerHTML = `
  <style>
  :host{
    display: block;

  }
  div{
    display:table;
    margin:0 auto;
    margin-bottom: 20px;
 }

  </style> 
  <div></div>
  `;
    //class for sss-footer element
  class SSSfooter extends HTMLElement{
    constructor(){
      super();

      this.attachShadow({mode:"open"});

      this.shadowRoot.appendChild(template.content.cloneNode(true));
            //if value is empty set equal to default values
      if(!this.dataset.year) this.dataset.year = 2021;
      if(!this.dataset.text) this.dataset.text = "Allison Maus";

      this.div = this.shadowRoot.querySelector("div");


    }

connectedCallback(){
  this.render();
}

render(){
    //if value is empty set equal to default values
  const year = this.getAttribute('data-year') ? this.getAttribute('data-year') : "2021";
  const text = this.getAttribute('data-text') ? this.getAttribute('data-text') : "Allison Maus";
		//select div and assign innerHTML values
  this.shadowRoot.querySelector("div").innerHTML = `&copy; Copyright ${year}, ${text}`;
}
//get the values if available
static get observedAttributes(){
  return ["data-year", "data-text"];
}

} 
		//define new web component
  customElements.define('sss-footer', SSSfooter);
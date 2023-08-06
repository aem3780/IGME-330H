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
  
  //class for ww-contact element
  class WWcontact extends HTMLElement{
    constructor(){
      super();

      this.attachShadow({mode:"open"});

      this.shadowRoot.appendChild(template.content.cloneNode(true));
      //if value is empty set equal to default values
      if(!this.dataset.email) this.dataset.year = "alliemaus@gmail.com";
      if(!this.dataset.linkedin) this.dataset.text = "Allison Maus";
      if(!this.dataset.portfolio) this.dataset.text = "allisonmaus.com";

      this.div = this.shadowRoot.querySelector("div");


    }
connectedCallback(){
  this.render();
}

render(){
  //if value is empty set equal to default values
  const email = this.getAttribute('data-email') ? this.getAttribute('data-email') : "alliemaus13@gmail.com";
  const linkedin = this.getAttribute('data-linkedin') ? this.getAttribute('data-linkedin') : "Allison Maus";
  const portfolio = this.getAttribute('data-portfolio') ? this.getAttribute('data-portfolio') : "allisonmaus.com";
	//select div and assign innerHTML values
  this.shadowRoot.querySelector("div").innerHTML = `<b>Contact Information</b>: LinkedIn- ${linkedin}, Email: 
  ${email}, Portfolio- <a href="${portfolio}"">${portfolio}</a>`;
}
//get the values if available
static get observedAttributes(){
  return ["data-email", "data-linkedin", "data-portfolio"];
}
} 
	//define new web component
  customElements.define('ww-contact', WWcontact);
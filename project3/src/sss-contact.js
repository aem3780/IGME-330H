//template  for div component that is created
  const template = document.createElement("template");
  template.innerHTML = `
  <style>
  :host{
    display: block;

  }
  div{
    display:table;
    margin-bottom: 20px;
    font-family: sans-serif;
 }
  </style> 
  <div></div>
  `;
  
  //class for sss-contact element
  class SSScontact extends HTMLElement{
    constructor(){
      super();

      this.attachShadow({mode:"open"});

      this.shadowRoot.appendChild(template.content.cloneNode(true));
      //if value is empty set equal to default values
      if(!this.dataset.email) this.dataset.email = "SSsandbox@gmail.com";
      if(!this.dataset.website) this.dataset.website = "sandbox-art.com";

      this.div = this.shadowRoot.querySelector("div");


    }
connectedCallback(){
  this.render();
}

render(){
  //if value is empty set equal to default values
  const email = this.getAttribute('data-email') ? this.getAttribute('data-email') : "SSsandbox@gmail.com";
  const website = this.getAttribute('data-website') ? this.getAttribute('data-website') : "sandbox-art.com";
	//select div and assign innerHTML values
  this.shadowRoot.querySelector("div").innerHTML = `<b>Gallery Submission Information</b>: Please email submissions to: 
  ${email}, or upload at- <a href="${website}"">${website}</a>`;
}
//get the values if available
static get observedAttributes(){
  return ["data-email", "data-website"];
}
} 
	//define new web component
  customElements.define('sss-contact', SSScontact);
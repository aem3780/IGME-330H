  // YOUR CODE GOES HERE
  class IGMFooter extends HTMLElement{
    constructor(){
      super();

      this.attachShadow({mode:"open"});


      this.shadowRoot.appendChild(document.createElement('span'));

      this.shadowRoot.appendChild(document.createElement('hr'));

      const style = document.createElement('style');
      style.textContent = `
          :host{
              color: #F76902;
              display: block;
              font-variant: small-caps;
              font-weight: bolder;
              font-family: sans-serif;



          }
          `;
          this.shadowRoot.appendChild(style);
    }

connectedCallback(){
  this.render();
}

render(){
  const year = this.getAttribute('data-year') ? this.getAttribute('data-year') : "1995";
  const text = this.getAttribute('data-text') ? this.getAttribute('data-text') : "Nobody";
	
  this.shadowRoot.querySelector("span").innerHTML = `&copy; Copyright ${year}, ${text}`;
}



} 
	
  customElements.define('igm-footer', IGMFooter);
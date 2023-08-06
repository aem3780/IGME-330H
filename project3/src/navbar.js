//template  for nav component that is created
const template = document.createElement("template");
template.innerHTML = `
<style>
nav{
    font-family: Plastic Love Regular;
}
</style> 

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<nav class="navbar has-background-danger-light">
<div class="navbar-brand">
    <a class="navbar-item has-text-danger-dark is-size-5" href="about.html">
        <img src="images/coloredpencils.png" alt="cloud" style="max-height: 70px;" class="py-2 px-2">SPECTACULAR SENSATIONAL SANDBOX</a>
    <a class="navbar-burger mt-4" id="burger">
        <span></span>
        <span></span>
        <span></span>
    </a>
</div>

<div class="navbar-menu" id=nav-links>
    <div class="navbar-end">
        <a class="navbar-item has-text-danger-dark is is-size-5" href="about.html">ABOUT</a>
        <a class="navbar-item has-text-danger-dark is-size-5" href="app.html">APP</a>
        <a class="navbar-item has-text-danger-dark is-size-5" href="documentation.html">DOCUMENTATION</a>
    </div>
</div>
</nav>
`;


// class for the navbar element
class Navbar extends HTMLElement {
    constructor(){
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        if(this.shadowRoot.querySelector(".navbar-burger")){
            this.shadowRoot.querySelector(".navbar-burger").onclick = e => {
                e.target.classList.toggle("is-active");
                this.shadowRoot.querySelector(".navbar-menu").classList.toggle("is-active");
            }
        }
    }
}

customElements.define('navigation-bar', Navbar);
//import web components
import "./ww-contact.js";
import "./ww-footer.js";

const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

//toggle burger icon on and off for mobile
burgerIcon.addEventListener('click', () => 
{
  navbarMenu.classList.toggle('is-active');
});

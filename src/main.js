"use strict";

import './scss/main.scss';


const themeButton = document.querySelector("#theme-switch");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
});
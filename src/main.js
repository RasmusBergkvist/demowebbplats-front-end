"use strict";

import './scss/main.scss';


/* Temaknapp */
const themeButton = document.querySelector("#theme-switch");

themeButton.addEventListener("click", () => {
    if(document.body.classList.contains("dark-theme")){
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");

    } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
    }

});


/* Mobilmeny */
document.querySelector("#mobile-menu").addEventListener("click", () => {
    document.querySelector("#menu").classList.toggle("active")
});


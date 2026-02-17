"use strict";

import './scss/main.scss';


const themeButton = document.querySelector("#theme-switch");

/* Hämtar sparat tema från local storage */
const savedTheme = localStorage.getItem("theme");

/* Om det finns ett sparat tema läggs det på body */
if (savedTheme) {
    document.body.classList.add(savedTheme);
}


themeButton.addEventListener("click", () => {
    /* Kollar om mörk tema används */
    if (document.body.classList.contains("dark-theme")) {
       
    /* Tar bort mörkt tema, lägger till ljust tema samt sparat det i local storage */   
     document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light-theme");

    } else {
        /* Tar bort ljust tema, lägger till mörkt tema samt sparat det i local storage */   
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark-theme");
    }

});


/* Mobilmeny */
document.querySelector("#mobile-menu").addEventListener("click", () => {
    document.querySelector("#menu").classList.toggle("active")
});


"use strict";

import './scss/main.scss';
import { getData, programChart, courseChart, chartTheme } from './statistic.js';



document.addEventListener("DOMContentLoaded", async () => {
    const applicationData = await getData();
    
    await programChart(applicationData);
    await courseChart(applicationData);
   
});



/* Temaknapp*/


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

    chartTheme();

});


/* Mobilmeny */
document.querySelector("#mobile-menu").addEventListener("click", () => {
    document.querySelector("#menu").classList.toggle("active")
});




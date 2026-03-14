"use strict";

import './scss/main.scss';
import { getData, programChart, courseChart, chartTheme } from './statistic.js';



document.addEventListener("DOMContentLoaded", async () => {
    const applicationData = await getData();
    
    await programChart(applicationData);
    await courseChart(applicationData);
   
});


/* Karta */

const map = L.map('map').setView([56.563107, 14.120924], 7);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const marker = L.marker([56.563107, 14.120924]).addTo(map);
marker.bindPopup("Här bor jag!").openPopup();

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Denna plats har koordinaterna: " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

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




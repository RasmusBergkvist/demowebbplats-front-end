"use strict";

import './scss/main.scss';

let allData = [];

document.addEventListener("DOMContentLoaded", () => {
    getData();
});


/**
 * Hämtar antagningsdata HT2025 för MIUN:s program och kurser.
 * Datan hämtas asynkront från URL:en med fetch-anrop.
 * Vid svar omvandlas datan till JSON-format och lagras i arrayen allData.
 * @error Eventuella fel i anropet fångas upp via catch och skrivs ut i konsolen.
 */

async function getData() {
    const url = "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json";

    try {
        const response = await fetch(url);
        allData = await response.json();
         console.log(allData);

        const mostAppliedCourses = getCourses(allData);
        console.log("De 6 mest sökta kurserna är: ", mostAppliedCourses);

 
  
    } catch (error) {
        console.error("Felmeddelande: ", error);
    }
}
/**
 * 
 * @param {array} allData Array med MIUNs antagningsdata för HT25 
 */

function getCourses(allData) {
    /* Filterar endast kurser */
    const courses = allData.filter(course => course.type === "Kurs");

    /* Skapar nytt objekt med kursnamn och antalsökande */
    const courseList= courses.map(course => ({
        name: course.name,
        applicantsTotal: Number(course.applicantsTotal)
    }));

    /* Sortera flest kurser som har flest sökande */
    courseList.sort((a,b ) => b.applicantsTotal - a.applicantsTotal);

    /* De 6 mest sökta kurserna HT25 */
    const mostAppliedCourses = courseList.slice(0, 6);
     

    return mostAppliedCourses;
    
}
















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

});


/* Mobilmeny */
document.querySelector("#mobile-menu").addEventListener("click", () => {
    document.querySelector("#menu").classList.toggle("active")
});




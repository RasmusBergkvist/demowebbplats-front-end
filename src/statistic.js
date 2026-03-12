"use strict";

import Chart from 'chart.js/auto';

let allData = [];

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

        return allData;


    } catch (error) {
        console.error("Felmeddelande: ", error);
    }
}


/**
 * getCourses
 * 
 * Funktionen filtrerar ut endast kurser, omvandlar antalet sökande till nummer,
 * sorterar kurserna efter flest sökande och returnerar de 6 mest populära.
 * @param {Array} allData - Array med MIUN:s antagningsdata för HT25
 * @returns {Array<{name: string, applicantsTotal: number}>} - Array med upp till 6 objekt  varje objekt innehåller kursnamn och antal sökande
 */
function getCourses(allData) {
    /* Filterar endast kurser */
    const courses = allData.filter(course => course.type === "Kurs");

    /* Skapar nytt objekt med kursnamn och antal sökande */
    const courseList = courses.map(course => ({
        name: course.name,
        applicantsTotal: Number(course.applicantsTotal)
    }));

    /* Sortera kurser som har flest sökande */
    courseList.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    /* De 6 mest sökta kurserna HT25 */
    const mostAppliedCourses = courseList.slice(0, 6);


    return mostAppliedCourses;

}

async function courseChart() {
    const allData = await getData();
    const mostAppliedCourses = getCourses(allData);

    const labels = mostAppliedCourses.map(course => course.name);
    const data = mostAppliedCourses.map(course => course.applicantsTotal);

    const ctx = document.getElementById('barChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Antal sökande till kursen',
                data: data,
                borderWidth: 1,
                
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

function getPrograms(allData) {
    /* Filterar endast program */
    const programs = allData.filter(program => program.type === "Program");


    /* Skapar nytt objekt med programnamn och antal sökande */
    const programList = programs.map(program => ({
        name: program.name,
        applicantsTotal: Number(program.applicantsTotal)
    }));

    /* Sortera program som har flest sökande */
    programList.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    const mostAppliedPrograms = programList.slice(0, 5);

    return mostAppliedPrograms;
}

async function programChart() {
    const allData = await getData();
    const mostAppliedPrograms = getPrograms(allData);

    const labels = mostAppliedPrograms.map(program => program.name);
    const data = mostAppliedPrograms.map(program => program.applicantsTotal);



    const ctx = document.getElementById('doughnutChart');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                label: 'Antal sökande till programmet',
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                ],
                hoverOffset: 4
            }]
        },
    });
}




programChart();
courseChart();
export { getData }

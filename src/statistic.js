"use strict";
import Chart from 'chart.js/auto';

let courseListChart;
let programListChart;

/**
 * Hämtar antagningsdata HT2025 för MIUN:s program och kurser.
 * Datan hämtas asynkront från URL:en med fetch-anrop.
 * Vid svar omvandlas datan till JSON-format och lagras i arrayen allData.
 * @error Eventuella fel i anropet fångas upp via catch och skrivs ut i konsolen.
 * @returns {Array} allData - Antagningsstatisk HT2025, Miun.
 */
async function getData() {
    const url = "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json";

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data


    } catch (error) {
        console.error("Felmeddelande: ", error);
    }
}


/**
 * getCourses
 * 
 * Funktionen filtrerar ut endast kurser, omvandlar antalet sökande till nummer,
 * Sorterar kurserna efter flest sökande och returnerar de 6 mest populära.
 * @param {Array} allData - Array med MIUN:s antagningsdata för HT25
 * @returns {Array<{name: string, applicantsTotal: number}>} - Array med upp till 6 objekt med kursnamn och antal sökande
 */
function getCourses(data) {

    const courses = data.filter(course => course.type === "Kurs");


    const courseList = courses.map(course => ({
        name: course.name,
        applicantsTotal: Number(course.applicantsTotal)
    }));


    courseList.sort((a, b) => b.applicantsTotal - a.applicantsTotal);


    const mostAppliedCourses = courseList.slice(0, 6);


    return mostAppliedCourses;

}

/**
 * getProgram
 * 
 * Funktionen filtrerar ut endast program, omvandlar antalet sökande till nummer,
 * Sorterar programmen efter flest sökande och returnerar de 5 mest populära.
 * @param {Array} data - Array med MIUN:s antagningsdata för HT25
 * @returns {Array<{name: string, applicantsTotal: number}>} - Array med upp till 5 objekt med programmets namn och antal sökande.
 */
function getPrograms(data) {
    /* Filterar endast program */
    const programs = data.filter(program => program.type === "Program");


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



/**
 * getChartColors
 * @returns {{textColor: string}} - returner färginställningarna vit eller svart  beroende om temat är mörkt eller inte.
 */
function getChartColors() {
    if (document.body.classList.contains("dark-theme")) {
        return { textColor: '#FFFFFF' };
    } else {
        return { textColor: '#000000' };
    }
}


/**
 * 
 * @param {Array} data - Array med MIUN:s antagningsdata för HT25
 * @property {string []} labels - Array som inneåller textsträng kursnamnen
 * @property {number []} values - Array som innehåller nummer med antal sökande till kurserna.
 * @returns {Chart} - Returnerar ett chartjs diagram med kursnamn och antal sökande i stapeldiagram.
 */
async function courseChart(data) {

    const mostAppliedCourses = getCourses(data);

    const labels = mostAppliedCourses.map(course => course.name);
    const values = mostAppliedCourses.map(course => course.applicantsTotal);

    const ctx = document.getElementById('barChart');
    const colors = getChartColors();

    courseListChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Antal sökande till kursen',
                data: values,
                borderWidth: 1,

            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: colors.textColor,
                        callback: function (value, index) {
                            const label = this.getLabelForValue(index);
                            const maxLength = 36;

                            if (label.length > maxLength) {
                                // om större än 36 tecken önskas radbrytning
                                return label.match(/.{1,36}/g).map((segment, i, arr) => {
                                    // Lägg till bindestreck om segmentet inte slutar med mellanslag
                                    // och nästa segment inte börjar med mellanslag
                                    if (
                                        i < arr.length - 1 &&
                                        !segment.endsWith(' ') &&
                                        !arr[i + 1].startsWith(' ')
                                    ) {
                                        return segment.trimEnd() + '-';
                                    }
                                    return segment.trim();
                                });
                            }

                            return label;
                        }
                    },
          
                },
                y: {
                    ticks: {
                        color: colors.textColor
                    },
                 
                    beginAtZero: true
                }
            }

        }


    });

    return courseListChart;
}

/**
 * 
 * @param {Array} data -  Array med MIUN:s antagningsdata för HT25
 *  @property {string []} labels - Array som inneåller textsträng progranamn,
 * @property {number []} values - Array som innehåller nummer med antal sökande till program.
 * @returns {Chart} - Returner ett chartjs diagram med kursnamn och antal sökande i stapeldiagram.
 */
async function programChart(data) {

    const mostAppliedPrograms = getPrograms(data);

    const labels = mostAppliedPrograms.map(program => program.name);
    const values = mostAppliedPrograms.map(program => program.applicantsTotal);
    const colors = getChartColors();


    const ctx = document.getElementById('doughnutChart');

    programListChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
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
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: colors.textColor
                    }
                }
            }
        }
    });

    return programListChart;
}

/**
 * Uppdaterar digrammets färger beroende på mörkt eller ljust tema.
 */
function chartTheme() {
    const colors = getChartColors();

    if (courseListChart) {
        courseListChart.options.scales.x.ticks.color = colors.textColor;
        courseListChart.options.scales.y.ticks.color = colors.textColor;

        courseListChart.options.plugins.legend.labels.color = colors.textColor;

        courseListChart.update();
        
    }
    if(programListChart) {
        programListChart.options.plugins.legend.labels.color = colors.textColor;
        
        programListChart.update();
        
    }
    

}



export { getData, programChart, courseChart, chartTheme }

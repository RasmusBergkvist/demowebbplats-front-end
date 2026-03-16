"use strict";

const messageSpan = document.querySelector('#message');

let map;
let marker;

/*Start för kartan*/
function startingMap() {
    const mapEl = document.querySelector('#map');
    if (mapEl === null) return; /* Avbryter om det inte finns något element */
    map = L.map('map').setView([56.563107, 14.120924], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        detectRetina: true,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
   

    marker = L.marker([56.563107, 14.120924]).addTo(map);
 
    marker.bindPopup("Här bor jag!").openPopup();
}



async function getPosition(place) {

    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${place}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
            messageSpan.innerHTML = 'Du måste skriva platsens namn'
        } else {
            messageSpan.innerHTML = "";
        }



        /* Lattitud och longitude */
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        const name = data[0].name;

        map.setView([lat, lon], 13);


        /* Kollar om det redan finns en markör annars skapas en */
        if (marker) {
            marker.setLatLng([lat, lon])
                .setPopupContent(name)
                .openPopup();
        } else {
            marker = L.marker([lat, lon])
                .bindPopup(name)
                .openPopup();
        }

    } catch (error) {
        console.error('Felmeddelande: ', error);

    }

}

export { startingMap, getPosition}

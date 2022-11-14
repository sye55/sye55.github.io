var map = L.map('map').setView([57.155, -2.123], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


async function getStreets() {
    const resp = await fetch('./js/streets.geojson');
    console.log(resp);
    const data = await resp.json();
    
    console.log(data);
    L.geoJSON(data).addTo(map);
    
}
var streets = getStreets();


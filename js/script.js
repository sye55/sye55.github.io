var map = L.map('map').setView([57.155, -2.123], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


async function getStreets() {
    const resp = await fetch('./js/streets.geojson');
    const data = await resp.json();
    
    L.geoJSON(data).addTo(map);
    map.fitBounds(map.getBounds());
    map.setMaxBounds([
        [57.30, -1.8],
        [57.0, -2.4]
    ]);
    
}
var streets = getStreets();


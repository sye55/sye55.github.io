var map = L.map('map').setView([57.155, -2.123], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function getStreets() {
    let url = '/.streets.geojson'
    let obj = await (await fetch(url)).json();
    
    //console.log(obj);
    return obj;
}

var streets = getStreets();
console.log(streets);

L.geoJSON(streets).addTo(map);
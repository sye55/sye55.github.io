var map = L.map('map').setView([57.155, -2.123], 12);
const d = document.getElementById("map");

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


async function getStreets() {
    const resp = await fetch('./js/streets.geojson');
    const data = await resp.json();
    
    L.geoJSON(data, {
        onEachFeature: onEachFeature
    }).addTo(map);
    map.fitBounds(map.getBounds());
    map.setMaxBounds([
        [57.30, -1.8],
        [57.0, -2.4]
    ]);
 
    
    function onEachFeature(feature, layer){
        var hasTouchScreen = 'ontouchstart' in window;
        layer.setStyle({color: 'blue', weight: 8});

        if (hasTouchScreen) {
            layer.bindPopup(feature.properties.name, {className: "custom-popup", autoPan: false});
        } else {
            layer.bindPopup(feature.properties.name);

        }
        

        // mouseover events
        layer.on('mousemove mouseover', function(e) {
            let ev = e.originalEvent; 
            let divBox = d.getBoundingClientRect(); // get pixel space of map canvas
            let p = L.point([ev.clientX - divBox.left, ev.clientY - divBox.top]); // cursor position on canvas
            let latlng = map.containerPointToLatLng(p);
            layer.setStyle({color: 'yellow'}); // highlight the feature
            layer.openPopup(latlng); // open popup near mousover location
        });

        // mouseout events
        layer.on('mouseout', function(e) {
            layer.setStyle({color: 'blue'});
            layer.closePopup();
        });
    }
}
var streets = getStreets();


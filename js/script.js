const clickTolerance = 8;
const aberdeenLatLon = [57.155, -2.123];
const aberdeenZoom = 12;

var map = L.map('map', {zoomControl: false, renderer: L.canvas({padding: 0.5, tolerance: clickTolerance})});
const d = document.getElementById("map");


map.setView(aberdeenLatLon, aberdeenZoom);


// add OSM vector tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// fetch features and apply events
async function getStreets() {
    const resp = await fetch('./js/streets.geojson');
    const data = await resp.json();
    
    L.geoJSON(data, {onEachFeature: onEachFeature}).addTo(map);
    
    map.fitBounds(map.getBounds());
    map.setMaxBounds([ [57.30, -1.8], [57.0, -2.4] ]);

    function onEachFeature(feature, layer){
        var hasTouchScreen = 'ontouchstart' in window;
        var popup = layer.bindPopup(feature.properties.name, {className: "custom-popup", autoPan: false});
        layer.setStyle({color: 'blue', weight: 8});

        // For Desktop Version
        if (!hasTouchScreen) {
        layer.on('mousemove mouseover', function(e) {
            let ev = e.originalEvent; 
            let divBox = d.getBoundingClientRect(); // get pixel space of map canvas
            let p = L.point([ev.clientX - divBox.left, ev.clientY - divBox.top]); // cursor position on canvas
            let latlng = map.containerPointToLatLng(p);
            layer.setStyle({color: 'yellow'}); // highlight the feature
            layer.openPopup(latlng); // open popup near mousover location
        });

        layer.on('mouseout', function(e) {
            layer.setStyle({color: 'blue'});
            layer.closePopup();
        });

        } else {
        layer.on('click', function(e) {
            let ev = e.originalEvent; 
            let divBox = d.getBoundingClientRect(); // get pixel space of map canvas
            let p = L.point([ev.clientX - divBox.left, ev.clientY - divBox.top]); // cursor position on canvas
            let latlng = map.containerPointToLatLng(p);
            layer.setStyle({color: 'yellow'}); // highlight the feature
            layer.openPopup(latlng); // open popup near mousover location
        });

        popup.on('popupclose', function(e) {
            layer.setStyle({color: 'blue'});

        })

    }

    }
}
var streets = getStreets();

var toggleClick = document.querySelector(".toggleBox");
var container = document.querySelector(".container");
toggleClick.addEventListener('click', () => {
    toggleClick.classList.toggle('active');
    container.classList.toggle('active');
})






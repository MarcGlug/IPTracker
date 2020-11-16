window.onload = function (){

    const mymap = L.map('mapid').setView([51.505, -0.09], 13);

    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(mymap);

    //Custom icon
    var customIcon = L.icon({
        iconUrl: '../images/icon-location.svg',
        iconSize:     [40, 50], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var marker = L.marker([51.5, -0.09], {icon: customIcon}).addTo(mymap);
}
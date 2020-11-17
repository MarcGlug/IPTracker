
const form = document.querySelector("form");
const ipAddressParagraph = document.querySelector("#ipAddressParagraph");
const locationParagraph = document.querySelector("#locationParagraph");
const timezoneParagraph = document.querySelector("#timezoneParagraph");
const ispParagraph = document.querySelector("#ispParagraph");

//--------------------------------------FUNCTIONS--------------------------------------------

async function getIpDatas(url) {
    
    const response = await fetch(url);
    const data = await response.json();

    if(data.messages){
        alert(data.messages);
        return false;
    }else{
        return data;
    }
}

function initMap(){

    const mymap = L.map('mapid').setView([50, 0], 3);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(mymap);

    return mymap;
    //Custom icon
   /* var customIcon = L.icon({
        iconUrl: '../images/icon-location.svg',
        iconSize:     [40, 50], // size of the icon
    });*/
    
}

function updateMap(map, lat, lng){
    map.flyTo([lat, lng], 15);
    const marker = L.marker([lat, lng]).addTo(map);
}

function printData(ipAddress, location, timezone, isp ){
    
    ipAddressParagraph.innerHTML = ipAddress;
    locationParagraph.innerHTML = location;
    timezoneParagraph.innerHTML = timezone;
    ispParagraph.innerHTML = isp;
}

function dataProcessing(ipData, map){
    
    var ipAddress = ipData.ip;
    var ipIsp = ipData.isp;

    if(ipIsp.includes("Private-Use")){ //Check if IP Address is private and gives to location, timezone, lat and lng "Private" value if so 
        var IpLocation;
        var ipTimezone;
        var ipLat;
        var ipLng;    
        ipIsp = ipLocation = ipTimezone = ipLat = ipLng = "Private";     
    }else{
        var city = ipData.location.city;
        var region = ipData.location.region;
        var postalCode = ipData.location.postalCode;
        var ipLocation = city + ", "+ region + " " + postalCode;
        var ipTimezone = "UTC"+ipData.location.timezone;
        var lat = ipData.location.lat;
        var lng = ipData.location.lng;
    }
    
    printData(ipAddress, ipLocation, ipTimezone, ipIsp);
    updateMap(map, lat, lng);
}

//----------------------------------------------SCRIPT----------------------------------------------

window.onload = function (){
    
    const map = initMap(); //Initiate a place when first loading page

    form.addEventListener("submit", function(e){

        e.preventDefault(); // prevent form from reload page

        const inputValue = document.querySelector("input").value;
        const api_url = ' https://geo.ipify.org/api/v1?apiKey=at_0YMXDtGfIzdOcSR6t6VugZ21DhR51&ipAddress='+inputValue;

        const ipData = getIpDatas(api_url);
        
        ipData.then(function(value){
            if(value != false){
                dataProcessing(value, map);
            };
        },
        );

    })

}
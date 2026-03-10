let map;

function initMap(){

map = new google.maps.Map(document.getElementById("map"),{

zoom:10,
center:{lat:8.8932,lng:76.6141}

});

}

function addDonor(){

let name=document.getElementById("name").value;
let blood=document.getElementById("blood").value;
let phone=document.getElementById("phone").value;
let city=document.getElementById("city").value;

navigator.geolocation.getCurrentPosition(function(pos){

let lat=pos.coords.latitude;
let lon=pos.coords.longitude;

db.ref("donors").push({

name:name,
blood:blood,
phone:phone,
city:city,
lat:lat,
lon:lon

});

alert("Donor registered");

});

}

function searchDonor(){

let blood=document.getElementById("searchBlood").value;
let city=document.getElementById("searchCity").value.toLowerCase();

let results=document.getElementById("results");
results.innerHTML="";

db.ref("donors").once("value",function(snapshot){

snapshot.forEach(function(child){

let d=child.val();

if(d.blood==blood && d.city.toLowerCase()==city){

results.innerHTML+=`
<div class="card">

<h3>${d.name}</h3>
<p>Blood: ${d.blood}</p>
<p>City: ${d.city}</p>
<p>Phone: ${d.phone}</p>

<a href="tel:${d.phone}">
<button>📞 Call Donor</button>
</a>

</div>
`;

}

});

});

}

function findNearbyDonors(){

navigator.geolocation.getCurrentPosition(function(pos){

let userLat=pos.coords.latitude;
let userLon=pos.coords.longitude;

map.setCenter({lat:userLat,lng:userLon});

new google.maps.Marker({

position:{lat:userLat,lng:userLon},
map:map,
title:"You are here"

});

db.ref("donors").once("value",function(snapshot){

snapshot.forEach(function(child){

let d=child.val();

let distance=getDistance(userLat,userLon,d.lat,d.lon);

if(distance<20){

new google.maps.Marker({

position:{lat:d.lat,lng:d.lon},
map:map,
title:d.name+" "+d.blood

});

}

});

});

});

}

function getDistance(lat1,lon1,lat2,lon2){

let R=6371;

let dLat=(lat2-lat1)*Math.PI/180;
let dLon=(lon2-lon1)*Math.PI/180;

let a=
Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(lat1*Math.PI/180)*
Math.cos(lat2*Math.PI/180)*
Math.sin(dLon/2)*Math.sin(dLon/2);

let c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

return R*c;

}
function addDonor(){

let name = document.getElementById("name").value;
let blood = document.getElementById("blood").value;
let phone = document.getElementById("phone").value;
let city = document.getElementById("city").value;

if(name=="" || blood=="" || phone=="" || city==""){

alert("Please fill all fields");

return;

}

navigator.geolocation.getCurrentPosition(function(position){

let lat = position.coords.latitude;
let lon = position.coords.longitude;

db.ref("donors").push({

name:name,
blood:blood,
phone:phone,
city:city,
lat:lat,
lon:lon

});

alert("Donor Registered Successfully");

document.getElementById("name").value="";
document.getElementById("blood").value="";
document.getElementById("phone").value="";
document.getElementById("city").value="";

});

}



function searchDonor(){

let blood = document.getElementById("searchBlood").value;
let city = document.getElementById("searchCity").value.toLowerCase();

let results = document.getElementById("results");

results.innerHTML="";

db.ref("donors").once("value",function(snapshot){

snapshot.forEach(function(child){

let d = child.val();

if(d.blood==blood && d.city.toLowerCase()==city){

results.innerHTML += `

<div class="card">

<h3>${d.name}</h3>

<p>Blood: ${d.blood}</p>

<p>City: ${d.city}</p>

<p>Phone: ${d.phone}</p>

<a href="tel:${d.phone}">
<button>📞 Call</button>
</a>

<a href="https://www.google.com/maps?q=${d.lat},${d.lon}" target="_blank">
<button>📍 Location</button>
</a>

</div>

`;

}

});

});

}



function findNearbyDonors(){

navigator.geolocation.getCurrentPosition(function(position){

let userLat = position.coords.latitude;
let userLon = position.coords.longitude;

let results = document.getElementById("results");

results.innerHTML="<h3>Nearby Donors</h3>";

db.ref("donors").once("value",function(snapshot){

snapshot.forEach(function(child){

let d = child.val();

let distance = getDistance(userLat,userLon,d.lat,d.lon);

if(distance < 20){

results.innerHTML += `

<div class="card">

<h3>${d.name}</h3>

<p>Blood: ${d.blood}</p>

<p>City: ${d.city}</p>

<p>Distance: ${distance.toFixed(1)} km</p>

<p>Phone: ${d.phone}</p>

<a href="tel:${d.phone}">
<button>📞 Call</button>
</a>

<a href="https://www.google.com/maps?q=${d.lat},${d.lon}" target="_blank">
<button>📍 Location</button>
</a>

</div>

`;

}

});

});

});

}



function getDistance(lat1,lon1,lat2,lon2){

let R = 6371;

let dLat = (lat2-lat1)*Math.PI/180;
let dLon = (lon2-lon1)*Math.PI/180;

let a =

Math.sin(dLat/2)*Math.sin(dLat/2) +

Math.cos(lat1*Math.PI/180) *

Math.cos(lat2*Math.PI/180) *

Math.sin(dLon/2)*Math.sin(dLon/2);

let c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

return R*c;

}
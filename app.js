function addDonor(){

var name=document.getElementById("name").value;
var blood=document.getElementById("blood").value;
var phone=document.getElementById("phone").value;
var city=document.getElementById("city").value;

if(name==""||blood==""||phone==""||city==""){
alert("Fill all fields");
return;
}

db.ref("donors").push({

name:name,
blood:blood,
phone:phone,
city:city

});

alert("Donor Added");

}



function searchDonor(){

var blood=document.getElementById("searchBlood").value;

var results=document.getElementById("results");

results.innerHTML="";

db.ref("donors").once("value",function(snapshot){

snapshot.forEach(function(child){

var d=child.val();

if(d.blood==blood){

results.innerHTML+=`

<div class="card">

<h3>${d.name}</h3>

<p>Blood: ${d.blood}</p>

<p>City: ${d.city}</p>

<p>Phone: ${d.phone}</p>

</div>

`;

}

});

});

}



function findNearbyDonors(){

alert("Near Me feature working (location enabled)");

}
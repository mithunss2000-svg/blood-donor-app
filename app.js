function addDonor(){

let name=document.getElementById("name").value.trim();
let blood=document.getElementById("blood").value.trim();
let phone=document.getElementById("phone").value.trim();
let city=document.getElementById("city").value.trim();

if(name==""||blood==""||phone==""||city==""){
alert("Please fill all fields");
return;
}

db.ref("donors").push({
name:name,
blood:blood,
phone:phone,
city:city
});

alert("Donor Registered");

document.getElementById("name").value="";
document.getElementById("blood").value="";
document.getElementById("phone").value="";
document.getElementById("city").value="";

}



function searchDonor(){

let blood=document.getElementById("searchBlood").value.trim();

let results=document.getElementById("results");

results.innerHTML="";

if(blood==""){
alert("Enter blood group");
return;
}

db.ref("donors").orderByChild("blood").equalTo(blood).once("value",function(snapshot){

if(!snapshot.exists()){
results.innerHTML="<p>No donors found</p>";
return;
}

snapshot.forEach(function(child){

let d=child.val();

results.innerHTML+=`

<div class="card">

<h3>${d.name}</h3>

<p>Blood: ${d.blood}</p>

<p>City: ${d.city}</p>

<p>Phone: ${d.phone}</p>

<a href="tel:${d.phone}">
<button>📞 Call</button>
</a>

</div>

`;

});

});

}



function findNearbyDonors(){
alert("Near Me feature coming next");
}
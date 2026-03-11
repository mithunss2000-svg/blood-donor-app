const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "1234";

function login(){

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if(username === DEMO_USERNAME && password === DEMO_PASSWORD){

        alert("Login Successful!");

        document.getElementById("loginDiv").style.display = "none";
        document.getElementById("appDiv").style.display = "block";

    } else {

        alert("Wrong Username or Password!");

    }

}

function logout(){

    document.getElementById("loginDiv").style.display = "block";
    document.getElementById("appDiv").style.display = "none";

}

function addDonor(){

    let name = document.getElementById("name").value.trim();
    let blood = document.getElementById("blood").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let city = document.getElementById("city").value.trim();

    if(name=="" || blood=="" || phone=="" || city==""){

        alert("Please fill all fields");
        return;

    }

    db.ref("donors").push({

        name: name,
        blood: blood,
        phone: phone,
        city: city

    });

    alert("Donor Registered Successfully");

    document.getElementById("name").value="";
    document.getElementById("blood").value="";
    document.getElementById("phone").value="";
    document.getElementById("city").value="";

}

function searchDonor(){

    let blood = document.getElementById("searchBlood").value.trim();

    let results = document.getElementById("results");

    results.innerHTML = "";

    if(blood==""){

        alert("Enter blood group to search");
        return;

    }

    db.ref("donors")
    .orderByChild("blood")
    .equalTo(blood)
    .once("value", function(snapshot){

        if(!snapshot.exists()){

            results.innerHTML = "<p>No donors found</p>";
            return;

        }

        snapshot.forEach(function(childSnapshot){

            let data = childSnapshot.val();

            results.innerHTML += `
            <div class="card">
                <h3>${data.name}</h3>
                <p>Blood: ${data.blood}</p>
                <p>City: ${data.city}</p>
                <p>Phone: ${data.phone}</p>
            </div>
            `;

        });

    });

}
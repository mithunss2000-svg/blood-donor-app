const firebaseConfig = {
  apiKey: "AIzaSyCvp1Rq8D5ytM5MWi8wnYZuOW_zZzVneZk",
  authDomain: "blood-donor-app-95429.firebaseapp.com",
  databaseURL: "https://blood-donor-app-95429-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blood-donor-app-95429",
  storageBucket: "blood-donor-app-95429.appspot.com",
  messagingSenderId: "733818304553",
  appId: "1:733818304553:web:48399afc5f6ac77d738438"
};

// Initialize Firebase (v8 syntax)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
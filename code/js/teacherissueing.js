import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getFirestore, 
    doc,
    setDoc,
    addDoc,
    collection,
    getDoc, } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
import {
    getAuth,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCION4gldRlEgISWgJBst3RszWUfpSUaUw",
    authDomain: "lmspis.firebaseapp.com",
    projectId: "lmspis",
    storageBucket: "lmspis.appspot.com",
    messagingSenderId: "674585430385",
    appId: "1:674585430385:web:4fef7a2c7081db88214ed0",
    measurementId: "G-636PSZ5R5W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

var sub, user, pass, mainContent, loggedIn;
var loggedIn = document.querySelector(".logged-in");


// authenticating user
const email = sessionStorage.getItem("Email");
const password = sessionStorage.getItem("Password");

var pattern = /^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/;
var result = pattern.test(email);

if (result == true && password.length >= 6) {
    let obj = {
        email: email,
        password: password,
    };

    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (_success) { })
        .catch(function (err) {
            swal({
                title: "Opps !",
                text: "Something Went Wrong Please Try Again",
                icon: "error",
                button: "OK",
            });
        });
} else {
    window.location = "../../index.html";
}


const EmpIDInput = document.getElementById("EmpIDInput");
const fetchButton = document.getElementById("fetchButton");
const mail = document.getElementById("mail");
const DOB = document.getElementById("DOB");



//fetching Teachers Details

fetchButton.addEventListener("click", async () => {
    const EmpIDI= EmpIDInput.value;
    if (EmpIDI) {
        const teacherDoc = doc(db, "Teacher Data", EmpIDI);
        const teacherSnapshot = await getDoc(teacherDoc);

        if (teacherSnapshot.exists()) {
            const teacherData = teacherSnapshot.data();
            teacherName.textContent = teacherData.Name;
            EmpID.textContent = teacherData.EmpID;
            mail.textContent = teacherData.email;
            DOB.textContent = teacherData.Dob
            

           

            detailsContainer.classList.remove("hidden");
        } else {
            detailsContainer.classList.add("hidden");
            alert("Teacher not found.");
        }
    }
});


db.collection("books").get().then((querySnapshot) => {
    var tableBody = document.getElementById("table-body");
    
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      var row = document.createElement("tr");
      
      var titleCell = document.createElement("td");
      titleCell.textContent = data.title;
      
      var authorCell = document.createElement("td");
      authorCell.textContent = data.author;
      
      var yearCell = document.createElement("td");
      yearCell.textContent = data.year;
      
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(yearCell);
      
      tableBody.appendChild(row);
    });
  });
  
  
  
  
  

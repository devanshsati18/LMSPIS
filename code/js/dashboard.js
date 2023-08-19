import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import {
    getAuth,
    signInWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

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
  const auth = getAuth();


//login credientials
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

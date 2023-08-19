// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCION4gldRlEgISWgJBst3RszWUfpSUaUw",
    authDomain: "lmspis.firebaseapp.com",
    projectId: "lmspis",
    storageBucket: "lmspis.appspot.com",
    messagingSenderId: "674585430385",
    appId: "1:674585430385:web:4fef7a2c7081db88214ed0",
    measurementId: "G-636PSZ5R5W"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

var sub, user, pass, mainContent, loggedIn;
var loggedIn = document.querySelector(".logged-in");

function _(x) {
  return document.getElementById(x);
}
sub = _("submit");
user = _("user-id");
pass = _("user-pass");
mainContent = _("main");
loggedIn = _("logged-in");

sub.onclick = function (event) {
  $(".loading-icon").removeClass('hide');
  $(".btn").addClass('hide');

  event.preventDefault();
  let userValue = user.value;
  let passValue = pass.value;

  sessionStorage.setItem("Email", userValue);
  sessionStorage.setItem("Password", passValue);

  var pattern = /^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/;
  var result = pattern.test(userValue);

  if (result == true && passValue.length >= 6) {
    let obj = {
      email: userValue,
      password: passValue,

    };
    try {
      signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (_success) {
          mainContent.classList.add("login-true");
          window.location = "code/html/dashboard.html";
        })
        .catch(function (err) {
          swal({
            title: "Opps Wrong User Id or Password",
            text: "Please Check User Id or Password and Then Try Again",
            icon: "error",
            button: "OK",
          });

          $(".loading-icon").addClass('hide');
          $(".btn").removeClass('hide');
        });
    }
    catch (error) {
      swal({
        title: "Opps !",
        text: "Something went Wrong Please Try Later",
        icon: "error",
        button: "OK",
      });
    }
  } else {
    swal({
      title: "Opps Wrong User Id or Password",
      text: "Please Check User Id or Password and Then Try Again",
      icon: "error",
      button: "OK",
    });

    $(".loading-icon").addClass('hide');
    $(".btn").removeClass('hide');
  }
}
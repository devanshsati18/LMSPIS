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




const admissionNoInput = document.getElementById("admissionNoInput");
const fetchButton = document.getElementById("fetchButton");
const detailsContainer = document.getElementById("detailsContainer");
const studentName = document.getElementById("studentName");
const studentAdmissionNo = document.getElementById("studentAdmissionNo");
const issuedBookId = document.getElementById("issuedBookId");
const issueDate = document.getElementById("issueDate");
const submissionDate = document.getElementById("submissionDate");
const Class = document.getElementById("Class");
const DOB = document.getElementById("DOB");
const fineAmount = document.getElementById("fineAmount");

fetchButton.addEventListener("click", async () => {
  const admissionNo = admissionNoInput.value;
  if (admissionNo) {
    const studentDoc = doc(db, "Student Data", admissionNo);
    const studentSnapshot = await getDoc(studentDoc);

    if (studentSnapshot.exists()) {
      const studentData = studentSnapshot.data();
      studentName.textContent = studentData.Name;
      studentAdmissionNo.textContent = studentData.AdmNo;
      issuedBookId.textContent = studentData.issuedBookId || "None";
      issueDate.textContent = studentData.issueDate || "";
      submissionDate.textContent = studentData.submissionDate || "";
      Class.textContent = studentData.CLASS;
      DOB.textContent = studentData.DOB;

      // to calculate the fine amount

      
      returnBookForm.classList.remove("hidden");
      detailsContainer.classList.remove("hidden");
    } else {
      detailsContainer.classList.add("hidden");
      alert("Student not found.");
    }
  }
});

returnBookButton.addEventListener("click", async () => {
  const bookId = returnBookIdInput.value;
  const admissionNo = admissionNoInput.value;

  if (bookId) {
    const studentDoc = doc(db, "Student Data", admissionNo);
    const studentSnapshot = await getDoc(studentDoc);

    if (studentSnapshot.exists()) {
      const studentData = studentSnapshot.data();

      if (studentData.issuedBookId === bookId) {
        await updateDoc(studentDoc, {
          issuedBookId: null,
          issueDate: null,
          submissionDate: null
        });

        issuedBookId.textContent = "None";
        issueDate.textContent = "";
        submissionDate.textContent = "";
        fineAmount.textContent = "";
        returnBookForm.classList.add("hidden");
        alert("Book successfully returned.");
      } else {
        alert("Incorrect Issued Book ID.");
      }
    }
  }
});
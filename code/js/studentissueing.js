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

const admissionNoInput = document.getElementById("admissionNoInput");
const fetchButton = document.getElementById("fetchButton");
const detailsContainer = document.getElementById("detailsContainer");
const studentName = document.getElementById("studentName");
const studentAdmissionNo = document.getElementById("studentAdmissionNo");
const issuedBookId = document.getElementById("issuedBookId");
const issueBookForm = document.getElementById("issueBookForm");
const bookIdInput = document.getElementById("bookIdInput");
const issueBookButton = document.getElementById("issueBookButton");
const submissionDate = document.getElementById("submissionDate");

fetchButton.addEventListener("click", async () => {
    const AdmNo = admissionNoInput.value;
    if (AdmNo) {
        const studentDoc = doc(db, "Student Data", AdmNo);
        const studentSnapshot = await getDoc(studentDoc);

        if (studentSnapshot.exists()) {
            const studentData = studentSnapshot.data();
            studentName.textContent = studentData.Name;
            studentAdmissionNo.textContent = studentData.AdmNo;
            Class.textContent = studentData.CLASS;
            DOB.textContent = studentData.DOB
            issuedBookId.textContent = studentData.issuedBookId || "None";

            if (!studentData.issuedBookId) {
                issueBookForm.classList.remove("hidden");
            } else {
                issueBookForm.classList.add("hidden");
            }

            detailsContainer.classList.remove("hidden");
        } else {
            detailsContainer.classList.add("hidden");
            alert("Student not found.");
        }
    }
});

issueBookButton.addEventListener("click", async () => {
    const bookId = bookIdInput.value;
    if (bookId) {
        const studentDoc = doc(db, "Student Data", admissionNoInput.value);
        const currentDate = new Date().toISOString().split("T")[0];
        const submissionDateValue = new Date();
        submissionDateValue.setDate(submissionDateValue.getDate() + 7);
        const submissionDateFormatted = submissionDateValue.toISOString().split("T")[0];

        await addDoc(studentDoc, {
            issuedBookId: bookId,
            issueDate: currentDate,
            submissionDate: submissionDateFormatted
        });

        submissionDate.textContent = `Submission Date: ${submissionDateFormatted}`;
        submissionDate.classList.remove("hidden");
        issueBookForm.classList.add("hidden");
        issuedBookId.textContent = bookId;
    }
});
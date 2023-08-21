import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getFirestore, 
    doc,
    setDoc,
    addDoc,
    collection,
    deleteDoc,
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

// to toggle between two forms
const showAddFormButton = document.getElementById("showAddFormButton");
const showSearchFormButton = document.getElementById("showSearchFormButton");
const addForm = document.getElementById("addForm");
const searchForm = document.getElementById("searchForm");

showAddFormButton.addEventListener("click", () => {
    addForm.classList.remove("hidden");
    searchForm.classList.add("hidden");
});

showSearchFormButton.addEventListener("click", () => {
    addForm.classList.add("hidden");
    searchForm.classList.remove("hidden");
});

const addBookForm = document.getElementById("addForm");
const printBarcodeButton = document.getElementById("printBarcodeButton");

addBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const author = addBookForm.querySelector("#author").value;
    const title = addBookForm.querySelector("#title").value;
    const page = addBookForm.querySelector("#pages").value;
    const price = addBookForm.querySelector("#price").value;
    const accno = addBookForm.querySelector("#accno").value;
    const publisher = addBookForm.querySelector("#publisher").value;

    // ... Collect other form field values ...

    // Add book to Firestore
    try{
    const docRef = await addDoc(collection(db, "specimen"), {
        author,
        title,
        page,
        price,
        accno,
        publisher
        // ... Other book details ...
    });

    // Generate barcode using the document reference ID
    const barcodeImage = generateBarcodeImage(docRef.id);

    // Print barcode image
    printBarcode(barcodeImage);

    alert("Book added sucessfully");

    

} catch (error) {
    alert("Error adding book: " + error.message);
}
});






// for the search and delete form elements

const documentIdInput = document.getElementById("documentId");
const viewButton = document.getElementById("viewButton");
const bookDetails = document.getElementById("bookDetails");

viewButton.addEventListener("click", async () => {
    const documentId = documentIdInput.value;

    if (documentId) {
        const bookDoc = doc(db, "specimen", documentId);
        const bookSnapshot = await getDoc(bookDoc);

        if (bookSnapshot.exists()) {
            const bookData = bookSnapshot.data();
            displayBookDetails(bookData);
        } else {
            alert("Book not found.");
        }
    }
});

function displayBookDetails(bookData) {
    bookDetails.innerHTML = `
        <h2>Book Details</h2>
        <p><strong>Author Name:</strong> ${bookData.author}</p>
        <p><strong>Book Title:</strong> ${bookData.title}</p>
        <!-- Display other book details here -->
    `;

    bookDetails.classList.remove("hidden");
}
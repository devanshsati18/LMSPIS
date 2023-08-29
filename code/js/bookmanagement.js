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
    const dccno = addBookForm.querySelector("#classficationNo").value;

    // Add book to Firestore
    try {
      const docRef = await addDoc(collection(db, "books"), {
          author,
          title,
          page,
          price,
          accno,
          publisher,
          dccno,
          // ... Other book details ...
      });

      alert("Book added successfully");

      // Show Print Barcode button
      printBarcodeButton.classList.remove("hidden");

      // Generate barcode and display it
      const barcodeContent = docRef.id;
      const barcodeSvg = document.getElementById('barcodeSvg');
      JsBarcode(barcodeSvg, barcodeContent, {
          format: "CODE128",
          displayValue: true,
          height: 50
      });
    } catch (error) {
      alert("Error adding book: " + error.message);
    }
});






printBarcodeButton.addEventListener("click", () => {
    // Print the barcode
    event.preventDefault();
    
    const barcodeSvg = document.getElementById('barcodeSvg');
    const barcodeDataUrl = barcodeSvg.outerHTML;
    const printWindow = window.open('', '', 'width=300,height=150');
    printWindow.document.write(barcodeDataUrl);
    printWindow.document.close();
    printWindow.print();
});


// code to search the books and delete the data of the book 



const documentIdInput = document.getElementById("documentId");
const viewButton = document.getElementById("viewButton");
const bookDetails = document.getElementById("bookDetails");
const title = document.getElementById("title");
const author = document.getElementById("author");
const year = document.getElementById("year");
const page = document.getElementById("page");
const price = document.getElementById("price");
const accno = document.getElementById("accno");
const dccno = document.getElementById("dccno");
const deleteButton = document.getElementById("deleteButton");

viewButton.addEventListener("click", async () => {
  event.preventDefault();
    const documentId = documentIdInput.value;
    if (documentId) {
        const bookDocRef = doc(db, "books", documentId);
        const bookSnapshot = await getDoc(bookDocRef);

        if (bookSnapshot.exists()) {
            const bookData = bookSnapshot.data();
            title.textContent = bookData.title;
            author.textContent = bookData.author;
            year.textContent = bookData.year;
            page.textContent = bookData.page;
            price.textContent = bookData.price;
            accno.textContent = bookData.accno;
            dccno.textContent = bookData.dccno;

            // ... (Set other span values for book details) ...

            deleteButton.classList.remove("hidden");
            bookDetails.classList.remove("hidden");
        } else {
            alert("Book not found.");
            bookDetails.classList.add("hidden");
            deleteButton.classList.add("hidden");
        }
    }
});

deleteButton.addEventListener("click", async () => {
    const documentId = documentIdInput.value;
    if (confirm("Are you sure you want to delete this book?")) {
        await deleteDoc(doc(db, "books", documentId));
        alert("Book deleted successfully.");
        bookDetails.classList.add("hidden");
    }
});
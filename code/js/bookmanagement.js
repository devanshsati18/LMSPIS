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
const printBarcodeButtons = document.getElementById("printBarcodeButton");

addBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const author = addBookForm.querySelector("#author").value;
    const title = addBookForm.querySelector("#title").value;
    const page = addBookForm.querySelector("#pages").value;
    const price = addBookForm.querySelector("#price").value;
    const accno = addBookForm.querySelector("#accno").value;
    const publisher = addBookForm.querySelector("#publisher").value;
    const dccno = addBookForm.querySelector("#classficationNo").value;

    // ... Collect other form field values ...

    // Add book to Firestore
    try{
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

     


    alert("Book added sucessfully");

    

} catch (error) {
    alert("Error adding book: " + error.message);
}
});



// code to search the books and delete the data of the book 


const searchButton = document.getElementById('viewButton');
const searchInput = document.getElementById('documentIdtxt');
const bookDetails = document.getElementById('bookDetails');
const title = document.getElementById('title');
const author = document.getElementById('author');
const year = document.getElementById('year');
const accno = document.getElementById('accno');
const dccno = document.getElementById('dccno');
const pages = document.getElementById('pages');
const price = document.getElementById('price');
const publisher = document.getElementById('publisher');

const deleteButton = document.getElementById('deleteButton');

searchButton.addEventListener('submit', async () => {
  const bookCode = searchInput.value;

  try {
    const docRef = doc(db, "books", bookCode);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      title.textContent = data.title;
      author.textContent = data.author;
      year.textContent = data.year;
      accno.textContent = data.accno;
      dccno.textContent = dccno.author;
      price.textContent = price.year;
      pages.textContent = price.pages;
      publisher.textContent = publisher.year;

      console.log("Data is sucessfuly fetched");

      bookDetails.classList.remove("hidden1");


      
    } else {
      clearBookDetails();
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
    clearBookDetails();
  }
});

deleteButton.addEventListener('click', async () => {
  const bookCode = searchInput.value;

  try {
    await deleteDoc(doc(db, "books", bookCode));
    clearBookDetails();
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
});

function displayBookDetails(data, bookCode) {
  titleSpan.textContent = data.title;
  authorSpan.textContent = data.author;
  yearSpan.textContent = data.year;
  deleteButton.dataset.bookCode = bookCode;
  bookDetails.classList.remove('hidden');
}

function clearBookDetails() {
  titleSpan.textContent = "";
  authorSpan.textContent = "";
  yearSpan.textContent = "";
  deleteButton.dataset.bookCode = "";
  bookDetails.classList.add('hidden');
}



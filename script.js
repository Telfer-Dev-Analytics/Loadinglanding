// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6pjR8bJ3JTEt-MporhAwEOPzd6VapiFQ",
    authDomain: "emailsignup-795ab.firebaseapp.com",
    databaseURL: "https://emailsignup-795ab-default-rtdb.firebaseio.com",
    projectId: "emailsignup-795ab",
    storageBucket: "emailsignup-795ab.appspot.com",
    messagingSenderId: "601446445042",
    appId: "1:601446445042:web:a3baa91dddd0ce61ae056b",
    measurementId: "G-GGSSMDRG2K"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to subscribe email
async function subscribeEmail(email) {
    try {
        const docRef = await addDoc(collection(db, "subscribers"), {
            email: email,
            timestamp: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
        alert('Subscribed successfully!');
    } catch (e) {
        console.error("Error adding document: ", e);
        alert('Subscription failed. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let email = document.getElementById('email').value;
        subscribeEmail(email);
    });
});

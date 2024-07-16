// Your web app's Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Sign in anonymously
auth.signInAnonymously()
  .then(() => {
    console.log('Signed in anonymously');
  })
  .catch((error) => {
    console.error('Error signing in anonymously: ', error);
  });

// Function to subscribe email
function subscribeEmail(email) {
    const user = auth.currentUser;
    if (!user) {
        console.error('No authenticated user found');
        alert('Subscription failed. Please try again.');
        return;
    }

    const reference = database.ref('subscribers/' + user.uid + '/' + Date.now());
    reference.set({
        email: email,
        uid: user.uid,
        timestamp: new Date().toISOString()
    })
    .then(() => {
        alert('Subscribed successfully!');
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert('Subscription failed. Please try again.');
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let email = document.getElementById('email').value;
        subscribeEmail(email);
    });
});

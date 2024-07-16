const AIRTABLE_API_URL = 'https://api.airtable.com/v0/appnFsuh41kSqhKey/signupsheet';
const AIRTABLE_API_KEY = 'Bearer patltLOS5cYIqkpVt.c5cf67cd025935556c4b6a18f43f2796465a2865d701b0207583f3501d431d7d';

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    const response = await fetch(AIRTABLE_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': AIRTABLE_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: {
                Email: email
            }
        })
    });

    if (response.ok) {
        alert('Subscribed successfully!');
        e.target.email.value = '';  // Clear the form
    } else {
        const error = await response.json();
        alert('Error: ' + error.error.message);
    }
});

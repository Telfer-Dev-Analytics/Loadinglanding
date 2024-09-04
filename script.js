document.addEventListener('DOMContentLoaded', function () {
    // Console log to check if the DOM is fully loaded
    console.log('DOM fully loaded and parsed');

    // FAQ Toggle Functionality
    const questions = document.querySelectorAll('.faq-item .question');
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
            const answer = faqItem.querySelector('.answer');
            answer.style.maxHeight = faqItem.classList.contains('active') ? answer.scrollHeight + 'px' : null;
        });
    });

    // Handling Video and Fade-in Effect
    const sponsorsSection = document.querySelector('.sponsors-section');
    const eventsSection = document.querySelector('.events-section');
    const landingVideo = document.getElementById('landingVideo');
    const sponsorsVideo = document.getElementById('sponsorsVideo');
    const eventsVideo = document.getElementById('eventsVideo');
    const videoContainer = document.querySelector('.video-container');

    // Function to play a video
    function playVideo(video) {
        if (video) video.play();
    }

    // Intersection Observer for the landing video
    const topObserverOptions = {
        root: null,
        threshold: 0.5
    };

    const topObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                playVideo(landingVideo);
            } else {
                if (landingVideo) {
                    landingVideo.pause();
                    landingVideo.currentTime = 0;
                }
            }
        });
    }, topObserverOptions);

    // Observe video container for the top part
    if (videoContainer) topObserver.observe(videoContainer);

    // Video end scroll effect for landing video
    if (landingVideo) {
        landingVideo.addEventListener('ended', function () {
            if (sponsorsSection) sponsorsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Intersection Observer for fade-in effect and video play for the sponsors section
    const sectionObserverOptions = {
        root: null,
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target === sponsorsSection && sponsorsVideo) {
                    playVideo(sponsorsVideo);
                }
                if (entry.target === eventsSection && eventsVideo) {
                    playVideo(eventsVideo);
                }
            } else {
                entry.target.classList.remove('visible');
                if (entry.target === sponsorsSection && sponsorsVideo) {
                    sponsorsVideo.pause();
                    sponsorsVideo.currentTime = 0;
                }
                if (entry.target === eventsSection && eventsVideo) {
                    eventsVideo.pause();
                    eventsVideo.currentTime = 0;
                }
            }
        });
    }, sectionObserverOptions);

    // Observe sponsors and events sections
    if (sponsorsSection) sectionObserver.observe(sponsorsSection);
    if (eventsSection) sectionObserver.observe(eventsSection);

    // Get the team members grid container
    const container = document.querySelector('.team-members-grid');

    // Define the scroll functions
    function scrollLeft() {
        console.log("Scrolling left");
        container.scrollBy({ left: -200, behavior: 'smooth' });
    }

    function scrollRight() {
        console.log("Scrolling right");
        container.scrollBy({ left: 200, behavior: 'smooth' });
    }

    // Attach event listeners to the buttons
    document.querySelector('.scroll-button.left').addEventListener('click', scrollLeft);
    document.querySelector('.scroll-button.right').addEventListener('click', scrollRight);

    // For the newsletter sign-up
    const NEWSLETTER_AIRTABLE_API_URL = 'https://api.airtable.com/v0/appnFsuh41kSqhKey/signupsheet';
    const NEWSLETTER_AIRTABLE_API_KEY = 'Bearer patltLOS5cYIqkpVt.c5cf67cd025935556c4b6a18f43f2796465a2865d701b0207583f3501d431d7d'; // Replace this with your API key

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            console.log('Newsletter form submitted with email:', email);

            const response = await fetch(NEWSLETTER_AIRTABLE_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': NEWSLETTER_AIRTABLE_API_KEY,
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
                console.error('Error in newsletter response:', error);
                alert('Error: ' + error.error.message);
            }
        });
    } else {
        console.error('Signup form element not found');
    }

    // For the contact us message section
    const CONTACT_AIRTABLE_API_URL = 'https://api.airtable.com/v0/appQhf3xh0nsXyzYC/tblZQzTpPqvk8fw43';
    const CONTACT_AIRTABLE_API_KEY = 'Bearer patZAt6XW7CV764lL.1dba561de2f198046a0745d994cd4e4e59b8451ff6a02c7b9adc2766a325c8b6'; // Replace with your actual API key

    console.log('CONTACT_AIRTABLE_API_URL:', CONTACT_AIRTABLE_API_URL);
    console.log('CONTACT_AIRTABLE_API_KEY:', CONTACT_AIRTABLE_API_KEY ? 'Key is set' : 'Key is missing');

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = e.target.name.value;
            const email = e.target.email.value;
            const message = e.target.message.value;

            console.log('Contact form submitted with:', { name, email, message });

            // Prepare the data to send, using the exact field names from Airtable
            const payload = {
                fields: {
                    Name: name,     // Correct field name from Airtable
                    Email: email,   // Correct field name from Airtable
                    Message: message  // Correct field name from Airtable
                }
            };

            console.log('Payload being sent to Airtable:', payload);

            try {
                const response = await fetch(CONTACT_AIRTABLE_API_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': CONTACT_AIRTABLE_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                console.log('Response status:', response.status);
                const responseData = await response.json();
                console.log('Response data:', responseData);

                if (response.ok) {
                    alert('Message sent successfully!');
                    e.target.name.value = '';     // Clear name field
                    e.target.email.value = '';    // Clear email field
                    e.target.message.value = '';  // Clear message field
                } else {
                    console.error('Error in response:', responseData.error);
                    alert('Error: ' + responseData.error.message);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                alert('Network error occurred. Please try again later.');
            }
        });
    } else {
        console.error('Contact form element not found');
    }
});

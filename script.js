document.addEventListener('DOMContentLoaded', function () {
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

    function playVideo(video) {
        if (video) video.play();
    }

    const topObserverOptions = { root: null, threshold: 0.5 };

    const topObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                playVideo(landingVideo);
            } else {
                landingVideo.pause();
                landingVideo.currentTime = 0;
            }
        });
    }, topObserverOptions);

    if (videoContainer) topObserver.observe(videoContainer);

    if (landingVideo) {
        landingVideo.addEventListener('ended', function () {
            if (sponsorsSection) sponsorsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const sectionObserverOptions = { root: null, threshold: 0.1 };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target === sponsorsSection) playVideo(sponsorsVideo);
                if (entry.target === eventsSection) playVideo(eventsVideo);
            } else {
                entry.target.classList.remove('visible');
                if (entry.target === sponsorsSection) {
                    sponsorsVideo.pause();
                    sponsorsVideo.currentTime = 0;
                }
                if (entry.target === eventsSection) {
                    eventsVideo.pause();
                    eventsVideo.currentTime = 0;
                }
            }
        });
    }, sectionObserverOptions);

    if (sponsorsSection) sectionObserver.observe(sponsorsSection);
    if (eventsSection) sectionObserver.observe(eventsSection);

    // Team Members Grid Scroll
    const container = document.querySelector('.team-members-grid');
    function scrollLeft() {
        container.scrollBy({ left: -200, behavior: 'smooth' });
    }
    function scrollRight() {
        container.scrollBy({ left: 200, behavior: 'smooth' });
    }

    document.querySelector('.scroll-button.left').addEventListener('click', scrollLeft);
    document.querySelector('.scroll-button.right').addEventListener('click', scrollRight);

    // Newsletter Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            try {
                const response = await fetch(NEWSLETTER_AIRTABLE_API_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': NEWSLETTER_AIRTABLE_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fields: { Email: email } })
                });

                if (response.ok) {
                    alert('Subscribed successfully!');
                    e.target.email.value = '';
                } else {
                    const error = await response.json();
                    alert('Error: ' + error.error.message);
                }
            } catch (error) {
                alert('Network error occurred. Please try again later.');
            }
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const email = e.target.email.value;
            const message = e.target.message.value;

            const payload = {
                fields: { Name: name, Email: email, Message: message }
            };

            try {
                const response = await fetch(CONTACT_AIRTABLE_API_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': CONTACT_AIRTABLE_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    alert('Error: ' + errorData.error.message);
                }
            } catch (error) {
                alert('Network error occurred. Please try again later.');
            }
        });
    }
});

// Select all the questions
const questions = document.querySelectorAll('.faq-item .question');

// Add a click event listener to each question
questions.forEach(question => {
    question.addEventListener('click', () => {
        // Close any other open FAQ items
        const openItem = document.querySelector('.faq-item.active');
        if (openItem && openItem !== question.parentElement) {
            openItem.classList.remove('active');
            openItem.querySelector('.answer').style.maxHeight = null;
        }

        // Toggle the visibility of the clicked answer
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
        const answer = faqItem.querySelector('.answer');
        answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
    });
});

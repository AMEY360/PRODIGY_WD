// Smooth Scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const responseMessage = document.getElementById('form-response');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            responseMessage.textContent = "Thank you! Your message has been submitted.";
            form.reset();
        });
    }
});

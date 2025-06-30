// Change navbar and background color on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const body = document.body;

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        body.style.backgroundColor = '#e0f7fa'; // Light blue on scroll
    } else {
        navbar.classList.remove('scrolled');
        body.style.backgroundColor = '#f0f0f0'; // Default color
    }
});

// Change background color on hovering over menu items
document.querySelectorAll('.nav-menu li a').forEach(item => {
    item.addEventListener('mouseover', () => {
        document.body.style.backgroundColor = '#ffe0b2'; // Light orange on hover
    });

    item.addEventListener('mouseout', () => {
        if (window.scrollY > 50) {
            document.body.style.backgroundColor = '#e0f7fa'; // Keep scrolled color
        } else {
            document.body.style.backgroundColor = '#f0f0f0'; // Default color
        }
    });
});

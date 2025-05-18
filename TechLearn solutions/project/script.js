// Navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const program = document.getElementById('program').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !program || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Simulate form submission
    alert('Thank you for your application! We will contact you soon.');
    contactForm.reset();
});

// Animate stats when in viewport
const stats = document.querySelectorAll('.number');
const animateStats = () => {
    stats.forEach(stat => {
        const value = parseInt(stat.textContent);
        let current = 0;
        const increment = value / 30;
        const updateCount = () => {
            if (current < value) {
                current += increment;
                stat.textContent = Math.round(current);
                setTimeout(updateCount, 50);
            } else {
                stat.textContent = value;
            }
        };
        updateCount();
    });
};

// Intersection Observer for stats animation
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);
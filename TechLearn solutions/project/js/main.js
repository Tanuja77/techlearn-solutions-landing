// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
  // Page loaded successfully
  console.log('TechLearn Solutions - Page loaded successfully');
  
  // Initialize all components
  initializeAOS();
  initializeContactForm();
  initializeProjectFilter();
});

// Initialize Animate on Scroll functionality
function initializeAOS() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  // Intersection Observer configuration
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  // Create the observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        // Unobserve the element once it's animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe each element
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize Contact Form
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Basic form validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Simulate form submission (in a real application, this would be an AJAX call)
      console.log('Form submission:', { name, email, subject, message });
      
      // Show success message
      alert('Thank you for contacting us! We will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }
}

// Initialize Project Filtering
function initializeProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to current button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (filterValue === 'all' || filterValue === cardCategory) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

// Helper function to smooth scroll to element
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Offset for header
      behavior: 'smooth'
    });
  }
}

// Preload images to avoid delay
function preloadImages() {
  // Add paths to images that should be preloaded
  const imagePaths = [
    'assets/images/techlearn-logo.png',
    'assets/images/hero-image.png',
    'assets/images/code-icon.png',
    'assets/images/interview-icon.png',
    'assets/images/resume-icon.png',
    'assets/images/designlab.png',
    'assets/images/internship.png'
  ];
  
  imagePaths.forEach(path => {
    const img = new Image();
    img.src = path;
  });
}

// Execute preload
preloadImages();
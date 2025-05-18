// Navigation functionality

document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeScrollHeader();
  initializeSmoothScroll();
});

// Initialize navigation menu functionality
function initializeNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile a');
  
  if (hamburger && navMobile) {
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMobile.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMobile.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);
      
      if (navMobile.classList.contains('active') && !isClickInsideNav && !isClickOnHamburger) {
        hamburger.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
}

// Change header style on scroll
function initializeScrollHeader() {
  const header = document.getElementById('header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Initial check
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    }
  }
}

// Initialize smooth scrolling for anchor links
function initializeSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Calculate header height dynamically
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Update active menu item based on scroll position
function updateActiveMenuItem() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-desktop a, .nav-mobile a');
  
  // Get current scroll position
  let scrollPosition = window.scrollY;
  
  // Add offset for header
  const header = document.getElementById('header');
  const headerHeight = header ? header.offsetHeight : 0;
  scrollPosition += headerHeight + 50; // Add some offset for better UX
  
  // Find the current section
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      const currentId = section.getAttribute('id');
      
      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to corresponding links
      document.querySelectorAll(`a[href="#${currentId}"]`).forEach(link => {
        link.classList.add('active');
      });
    }
  });
}

// Initialize active menu item update on scroll
window.addEventListener('scroll', function() {
  updateActiveMenuItem();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  updateActiveMenuItem();
});
// Animation functionality

document.addEventListener('DOMContentLoaded', function() {
  initializeElementAnimations();
  initializeParallaxEffect();
  initializeCounterAnimation();
});

// Initialize custom animations for elements
function initializeElementAnimations() {
  // Find all elements with the 'animated' class
  const animatedElements = document.querySelectorAll('.animated');
  
  if (animatedElements.length > 0) {
    // Intersection Observer configuration
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-viewport');
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
  
  // Add hover animations to program cards
  const programCards = document.querySelectorAll('.program-card');
  
  programCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('animate-hover');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('animate-hover');
    });
  });
}

// Initialize parallax effect
function initializeParallaxEffect() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.scrollY;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.2;
        const offset = scrollTop * speed;
        
        element.style.transform = `translateY(${offset}px)`;
      });
    });
  }
}

// Initialize counter animation
function initializeCounterAnimation() {
  const counterElements = document.querySelectorAll('.highlight-number');
  
  if (counterElements.length > 0) {
    // Intersection Observer configuration
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
    
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get target number from the content
          const target = parseInt(entry.target.textContent.replace(/[^\d]/g, ''));
          animateCounter(entry.target, 0, target, 1500);
          
          // Unobserve the element once animation starts
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe each counter element
    counterElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Animate counter from start to end
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentCount = Math.floor(progress * (end - start) + start);
    
    // Update element text
    element.textContent = currentCount + (element.textContent.includes('%') ? '%' : '');
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + (element.textContent.includes('%') ? '%' : '');
    }
  };
  
  window.requestAnimationFrame(step);
}

// Add typed text effect
function typeText(element, text, speed) {
  let i = 0;
  
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  
  element.textContent = '';
  typing();
}

// Initialize reveal animation for elements
function initializeRevealAnimation() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    // Intersection Observer configuration
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, 100);
          
          // Unobserve the element once it's revealed
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe each element
    revealElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeRevealAnimation();
});
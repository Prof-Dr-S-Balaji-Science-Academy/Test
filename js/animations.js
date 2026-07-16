/* ================================================================
   PROF. BALAJI DESIGN SYSTEM - ANIMATIONS JS
   Scroll animations, smooth scrolling, interactive effects
   ================================================================ */

// ==================== SCROLL ANIMATIONS ====================

class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    this.init();
  }

  init() {
    // Observe elements with scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Unobserve after animation to improve performance
          // observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    // Elements to observe
    document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-in-left, .scroll-slide-in-right, .scroll-scale-in'
    ).forEach(el => {
      observer.observe(el);
    });
  }
}

// ==================== SMOOTH SCROLLING ====================

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offset = 80; // Account for sticky header
          const top = target.offsetTop - offset;
          window.scrollTo({
            top: top,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// ==================== STAGGER ANIMATIONS ====================

class StaggerAnimation {
  constructor(selector, staggerDelay = 0.1) {
    this.elements = document.querySelectorAll(selector);
    this.staggerDelay = staggerDelay;
    this.init();
  }

  init() {
    this.elements.forEach((el, index) => {
      el.style.animationDelay = `${index * this.staggerDelay}s`;
    });
  }
}

// ==================== HOVER ANIMATIONS ====================

class HoverAnimation {
  constructor() {
    this.init();
  }

  init() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'translate(-50%, -50%)';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        // Animate ripple
        ripple.animate([
          { width: '0px', height: '0px', opacity: 1 },
          { width: '200px', height: '200px', opacity: 0 }
        ], {
          duration: 600,
          easing: 'ease-out'
        });

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }
}

// ==================== INTERSECTION OBSERVER FOR STAGGER ====================

class StaggerOnScroll {
  constructor(selector) {
    this.selector = selector;
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll(this.selector);
          children.forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
            child.classList.add('fade-in-up');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-stagger]').forEach(el => {
      observer.observe(el);
    });
  }
}

// ==================== PAGE TRANSITIONS ====================

class PageTransition {
  constructor() {
    this.init();
  }

  init() {
    // Add fade-in animation on page load
    const elements = document.querySelectorAll('[data-fade-in]');
    elements.forEach((el, index) => {
      el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
      el.style.opacity = '0';
    });
  }
}

// ==================== COUNTER ANIMATION ====================

class CounterAnimation {
  constructor(selector, duration = 2000) {
    this.elements = document.querySelectorAll(selector);
    this.duration = duration;
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          this.count(entry.target);
          entry.target.dataset.counted = 'true';
        }
      });
    }, { threshold: 0.5 });

    this.elements.forEach(el => observer.observe(el));
  }

  count(element) {
    const finalValue = parseInt(element.textContent);
    let currentValue = 0;
    const increment = finalValue / (this.duration / 16);

    const counter = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        element.textContent = finalValue;
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(currentValue);
      }
    }, 16);
  }
}

// ==================== PARALLAX EFFECT ====================

class ParallaxEffect {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.elements.forEach(el => {
        const scrollPosition = window.scrollY;
        const elementPosition = el.offsetTop;
        const distance = scrollPosition - elementPosition;
        el.style.transform = `translateY(${distance * 0.5}px)`;
      });
    });
  }
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all animations
  new ScrollAnimations();
  new SmoothScroll();
  new HoverAnimation();
  new PageTransition();

  // Initialize stagger animations
  document.querySelectorAll('[data-stagger]').forEach(el => {
    const children = el.querySelectorAll('[data-stagger-item]');
    children.forEach((child, index) => {
      child.style.setProperty('--stagger-index', index);
    });
  });
});

// ==================== SCROLL TO TOP BUTTON ====================

class ScrollToTop {
  constructor() {
    this.button = document.querySelector('[data-scroll-to-top]');
    if (!this.button) return;
    
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        this.button.style.display = 'flex';
      } else {
        this.button.style.display = 'none';
      }
    });

    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', () => {
  new ScrollToTop();
});

// ==================== UTILITY FUNCTIONS ====================

// Add animation class to element
function addAnimation(element, animationName, duration = 0.6) {
  element.classList.add(animationName);
  setTimeout(() => {
    element.classList.remove(animationName);
  }, duration * 1000);
}

// Trigger animation on scroll
function triggerOnScroll(selector, animationName, offset = 0.1) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationName);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: offset });

  document.querySelectorAll(selector).forEach(el => {
    observer.observe(el);
  });
}

// Export for use in other files
window.scrollAnimations = {
  addAnimation,
  triggerOnScroll,
  ScrollAnimations,
  SmoothScroll,
  HoverAnimation,
  ParallaxEffect
};

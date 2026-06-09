/* ==========================================================================
   Allan Linus Portfolio JavaScripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Dynamic Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Typewriter Effect with Typo Correction
  const typedTextElement = document.getElementById('typed-text');
  if (typedTextElement) {
    const phrase1 = "Fuul stack developer";
    const phrase2 = "ull Stack Developer";
    let currentText = "";
    let step = 0; // 0: typing phrase 1, 1: deleting back to 'F', 2: typing correction, 3: idle

    const typeWriter = () => {
      if (step === 0) {
        // Typing phrase 1
        currentText = phrase1.substring(0, currentText.length + 1);
        typedTextElement.textContent = currentText;
        if (currentText === phrase1) {
          step = 1;
          setTimeout(typeWriter, 1500); // Pause on typo
        } else {
          setTimeout(typeWriter, 80 + Math.random() * 40);
        }
      } else if (step === 1) {
        // Deleting back to 'F'
        currentText = phrase1.substring(0, currentText.length - 1);
        typedTextElement.textContent = currentText;
        if (currentText === "F") {
          step = 2;
          setTimeout(typeWriter, 500); // Pause before correcting
        } else {
          setTimeout(typeWriter, 40);
        }
      } else if (step === 2) {
        // Typing corrected text
        const target = "F" + phrase2;
        currentText = target.substring(0, currentText.length + 1);
        typedTextElement.textContent = currentText;
        if (currentText === target) {
          step = 3; // Done
        } else {
          setTimeout(typeWriter, 80 + Math.random() * 40);
        }
      }
    };

    // Start typing animation after a brief initial delay
    setTimeout(typeWriter, 1000);
  }

  // 3. Sticky Navbar effect on Scroll
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 4. Mobile Menu Toggle (Hamburger)
  const burger = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('navbar-links');
  const navItems = document.querySelectorAll('.nav-link');

  if (burger && navLinks) {
    const toggleMenu = () => {
      navLinks.classList.toggle('active');
      burger.classList.toggle('toggle');
      const expanded = burger.getAttribute('aria-expanded') === 'true' || false;
      burger.setAttribute('aria-expanded', !expanded);
    };

    burger.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }

  // 5. Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once revealed, no need to track again
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null, // Viewport
      threshold: 0.15, // Reveal when 15% is visible
      rootMargin: "0px 0px -50px 0px" // Slight offset from bottom
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  // 6. Active Nav Link Highlighter on Scroll
  const sections = document.querySelectorAll('section, footer');
  const activeNavCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  };

  const activeNavObserver = new IntersectionObserver(activeNavCallback, {
    root: null,
    threshold: 0.5, // Highlight when section is 50% visible
    rootMargin: "-80px 0px -20px 0px" // Adjust for navigation bar height
  });

  sections.forEach(section => {
    activeNavObserver.observe(section);
  });

  // 7. Contact Form Handling with Feedback
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      
      let isValid = true;

      // Simple Validation Style helper
      const markInvalid = (element, message) => {
        element.style.borderColor = '#EF4444';
        element.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.15)';
        isValid = false;
      };

      const markValid = (element) => {
        element.style.borderColor = '';
        element.style.boxShadow = '';
      };

      // Reset border styles
      [nameInput, emailInput, subjectInput, messageInput].forEach(markValid);

      // Validation
      if (!nameInput.value.trim()) markInvalid(nameInput);
      if (!emailInput.value.trim() || !validateEmail(emailInput.value)) markInvalid(emailInput);
      if (!subjectInput.value.trim()) markInvalid(subjectInput);
      if (!messageInput.value.trim()) markInvalid(messageInput);

      if (isValid) {
        // Change button state
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerHTML = `
          <span>Sending...</span>
          <svg class="animate-spin" viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" style="stroke-width: 2px;">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-dasharray="32" stroke-dashoffset="8"></circle>
          </svg>
        `;

        // Simulate API call
        setTimeout(() => {
          // Success Response UI
          showNotification('Success!', 'Thank you. Your message has been sent successfully.', 'success');
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
          submitBtn.innerHTML = originalContent;
        }, 1500);
      }
    });

    const validateEmail = (email) => {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());
    };
  }

  // 8. Custom Premium Notification System
  const showNotification = (title, message, type) => {
    // Remove existing notification if any
    const existingNotif = document.querySelector('.custom-notification');
    if (existingNotif) {
      existingNotif.remove();
    }

    // Create Notification Element
    const notif = document.createElement('div');
    notif.className = `custom-notification ${type}`;
    notif.innerHTML = `
      <div class="notification-icon">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="notification-body">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    // Append Styles dynamically if not in CSS
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        .custom-notification {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: #FFFFFF;
          border-left: 5px solid var(--primary);
          padding: 1.25rem 1.75rem;
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          gap: 1.25rem;
          z-index: 2000;
          transform: translateY(100px);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          max-width: 400px;
        }
        .custom-notification.show {
          transform: translateY(0);
          opacity: 1;
        }
        .custom-notification.success {
          border-left-color: #10B981;
        }
        .custom-notification.success .notification-icon {
          color: #10B981;
        }
        .notification-icon svg {
          display: block;
        }
        .notification-body h5 {
          margin: 0 0 0.25rem 0;
          font-size: 1.05rem;
          font-weight: 700;
        }
        .notification-body p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-light);
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notif);
    
    // Animate In
    setTimeout(() => {
      notif.classList.add('show');
    }, 50);

    // Animate Out
    setTimeout(() => {
      notif.classList.remove('show');
      setTimeout(() => {
        notif.remove();
      }, 400);
    }, 4000);
  };
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for internal links (within the same page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing animation
    const typingText = document.querySelector('.typing-text');
    const words = ['Blockchain Developer', 'Smart Contract Engineer', 'Web3 Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function type() {
        if (!typingText) return; // Skip if element doesn't exist on current page
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add character
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // If word is complete, start deleting after a delay
        if (!isDeleting && charIndex === currentWord.length) {
            isWaiting = true;
            setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
            }, 1500);
        }

        // If deletion is complete, move to next word
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        // Typing speed
        let typeSpeed = isDeleting ? 80 : 120;
        
        // Pause at the end of a word
        if (isWaiting) {
            typeSpeed = 1500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start the typing animation
    if (typingText) {
        setTimeout(type, 1000);
    }

    // Animate sections on page load
    function animateSections() {
        // Get all elements that should be animated
        const animateElements = document.querySelectorAll('.animate__animated');
        
        // Add visible class to trigger animations
        animateElements.forEach(element => {
            if (!element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }

    // Run animation after a slight delay to ensure DOM is ready
    setTimeout(animateSections, 300);

    // Reveal animations on scroll using Animate.css
    const revealElements = document.querySelectorAll('.project-card:not(.animate__animated), .about-text:not(.animate__animated), .skills:not(.animate__animated), .contact-form:not(.animate__animated), .social-links:not(.animate__animated)');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                if (!element.classList.contains('animate__animated')) {
                    element.classList.add('animate__animated', 'animate__lightSpeedInLeft', 'visible');
                }
            }
        });
    }

    // Initial check on page load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add active class to current section in navigation
    function highlightNavigation() {
        const pathname = window.location.pathname;
        const filename = pathname.split('/').pop();
        
        navItems.forEach(link => {
            const href = link.getAttribute('href');
            if (href === filename || (filename === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Trigger highlight on page load
    highlightNavigation();
}); 
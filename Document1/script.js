// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordion functionality
    initFaqAccordion();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Add event listeners to buttons
    initButtonHandlers();
    
    // Initialize animation on scroll
    initScrollAnimations();
});

// FAQ Accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process internal links (those starting with #)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get the navbar height for offset
                    const navHeight = document.querySelector('nav').offsetHeight;
                    
                    // Calculate position to scroll to (subtracting navbar height)
                    const offsetTop = targetElement.offsetTop - navHeight;
                    
                    // Scroll smoothly to the target
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Button event handlers
function initButtonHandlers() {
    const demoButtons = document.querySelectorAll('.demo-btn, .secondary-btn');
    const startTrialButtons = document.querySelectorAll('.primary-btn');
    
    // Demo button handlers
    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            // In a real app, this would open a demo request form
            alert('Thank you for your interest in ARXplore! A demo request form would open here.');
        });
    });
    
    // Start trial button handlers
    startTrialButtons.forEach(button => {
        button.addEventListener('click', () => {
            // In a real app, this would redirect to registration
            alert('Thank you for your interest in ARXplore! You would be redirected to a trial registration page.');
        });
    });
    
    // Video play button handler
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', () => {
            // In a real app, this would play a video
            alert('Video would play here. In a production environment, this would load and play the product demo video.');
        });
    }
}

// Animation on scroll
function initScrollAnimations() {
    // Get all elements that should be animated on scroll
    const animateElements = document.querySelectorAll('.feature-card, .workflow-step, .persona-card, .deployment-card, .screenshot');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                // Add animation class when element comes into viewport
                element.classList.add('animated');
                
                // Add a slight delay for cascading effect
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 150);
            }
        });
    }
    
    // Set initial state for animation
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Trigger once on load
    handleScrollAnimation();
}

// Navbar scroll behavior
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
}); 
// ITSA SJCEM Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initClock();
    initCounters();
    initProgressBars();
    initScrollAnimations();
    initTypingEffect();
    initContactForm();
    initMobileNav();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Real-time clock
function initClock() {
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    
    function updateClock() {
        const now = new Date();
        
        // Format time
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const timeString = now.toLocaleTimeString('en-IN', timeOptions);
        
        // Format date
        const dateOptions = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        const dateString = now.toLocaleDateString('en-IN', dateOptions);
        
        if (timeElement) timeElement.textContent = timeString;
        if (dateElement) dateElement.textContent = dateString;
    }
    
    // Update immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateCounters() {
        if (hasAnimated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
        
        hasAnimated = true;
    }
    
    // Trigger animation when hero section is visible
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 3500); // Start after hero animations
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heroSection);
    }
}

// Progress bar animations
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.dataset.progress;
                
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-item, .event-card, .member-card, .timeline-item, .contact-card, .form'
    );
    
    // Add animation classes
    animatedElements.forEach((element, index) => {
        if (element.classList.contains('feature-item') || 
            element.classList.contains('timeline-item')) {
            element.classList.add('fade-in');
        } else if (index % 2 === 0) {
            element.classList.add('slide-in-left');
        } else {
            element.classList.add('slide-in-right');
        }
    });
    
    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const text = 'ITSA SJCEM';
    const speed = 200; // milliseconds per character
    let index = 0;
    
    // Clear existing text
    typingText.textContent = '';
    typingText.style.borderRight = '4px solid white';
    
    function typeWriter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            // Keep blinking cursor for a bit, then remove it
            setTimeout(() => {
                typingText.style.borderRight = 'none';
            }, 2000);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formElements = contactForm.elements;
        
        // Disable form during submission
        Array.from(formElements).forEach(element => {
            element.disabled = true;
        });
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            
            // Re-enable form
            Array.from(formElements).forEach(element => {
                element.disabled = false;
            });
        }, 2000);
    });
}

// Mobile navigation toggle
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-primary)'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(350px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(350px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Enhanced hover effects for event cards
document.addEventListener('DOMContentLoaded', function() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
});

// Parallax effect for floating shapes
function initParallaxShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// Initialize parallax on load
window.addEventListener('load', initParallaxShapes);

// Add loading animation
window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <img src="https://pplx-res.cloudinary.com/image/upload/v1755013054/pplx_project_search_images/c4fb715078dddda219922e4f97275720eeaa0a79.png" alt="IT Logo" class="loading-img">
                <h2>ITSA SJCEM</h2>
            </div>
            <div class="loading-progress">
                <div class="loading-bar"></div>
            </div>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #10b981 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
    `;
    
    const loadingContent = loadingScreen.querySelector('.loading-content');
    loadingContent.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    const loadingImg = loadingScreen.querySelector('.loading-img');
    loadingImg.style.cssText = `
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
        animation: pulse 1.5s ease-in-out infinite;
    `;
    
    const loadingProgress = loadingScreen.querySelector('.loading-progress');
    loadingProgress.style.cssText = `
        width: 200px;
        height: 4px;
        background: rgba(255,255,255,0.3);
        border-radius: 4px;
        overflow: hidden;
        margin-top: 30px;
    `;
    
    const loadingBar = loadingScreen.querySelector('.loading-bar');
    loadingBar.style.cssText = `
        width: 0%;
        height: 100%;
        background: white;
        border-radius: 4px;
        transition: width 2s ease;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Animate loading bar
    setTimeout(() => {
        loadingBar.style.width = '100%';
    }, 100);
    
    // Remove loading screen
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500);
    }, 2000);
});

// Add CSS for mobile navigation
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: 0 0 var(--radius-lg) var(--radius-lg);
            padding: var(--space-16);
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all var(--duration-normal) var(--ease-standard);
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
        
        .nav-menu .nav-link {
            display: block;
            padding: var(--space-12) 0;
            border-bottom: 1px solid var(--color-border);
        }
        
        .nav-menu .nav-link:last-child {
            border-bottom: none;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    }
`;
document.head.appendChild(style);
// Portfolio JavaScript - Enhanced with Animations
document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
});

function initPortfolio() {
    console.log('🚀 Initializing Enhanced Portfolio...');
    
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initThemeToggle();
    initTypingEffect();
    initBackToTop();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initSkillAnimations();
    initParallaxEffects();
    initScrollReveal();
    
    console.log('✅ Portfolio fully loaded with animations');
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Add loaded class to body for animations
                document.body.classList.add('loaded');
            }, 500);
        }, 1500);
    });
    
    // Fallback
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    }, 3000);
}

// Navigation with Scroll Effects
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    // Mobile Menu Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Animate menu icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                menuToggle.style.transform = 'rotate(90deg)';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.style.transform = 'rotate(0)';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.style.transform = 'rotate(0)';
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.style.transform = 'rotate(0)';
            });
        });
    }
    
    // Navbar Scroll Effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
            
            // Update active nav link
            updateActiveNavLink();
        });
    }
    
    // Update active nav link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Theme Toggle with Animation
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('data-theme', 'light');
    }
    
    themeToggle.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = rect.width / 2;
        const y = rect.height / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            margin-left: -${size/2}px;
            margin-top: -${size/2}px;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        // Toggle theme after ripple
        setTimeout(() => {
            document.body.classList.toggle('light-mode');
            
            const isLight = document.body.classList.contains('light-mode');
            themeToggle.innerHTML = isLight 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('data-theme', isLight ? 'light' : 'dark');
            
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            
            console.log(`🌗 Switched to ${isLight ? 'light' : 'dark'} mode`);
            
            ripple.remove();
        }, 300);
    });
    
    // Add ripple animation to CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Enhanced Typing Effect
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = [
        "Dental Surgery Student",
        "Health-Tech Innovator",
        "Python Developer",
        "Data Privacy Specialist",
        "STEM Coordinator",
        "Creative Problem Solver",
        "Mobile App Developer",
        "Tech Leader"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let typingSpeed = 100;
    
    function type() {
        if (isPaused) return;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100 + Math.random() * 50; // Random speed for natural feel
        }
        
        // Add glow effect while typing
        if (!isDeleting && charIndex > 0) {
            typingText.style.textShadow = `0 0 ${charIndex * 2}px rgba(100, 255, 218, 0.5)`;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of word
            isDeleting = true;
            typingSpeed = 2000;
            typingText.style.textShadow = '0 0 20px rgba(100, 255, 218, 0.8)';
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
            typingText.style.textShadow = 'none';
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
    
    // Pause typing on hover
    typingText.parentElement.addEventListener('mouseenter', () => {
        isPaused = true;
        typingText.style.textShadow = '0 0 20px rgba(100, 255, 218, 0.8)';
    });
    
    typingText.parentElement.addEventListener('mouseleave', () => {
        isPaused = false;
        setTimeout(type, 100);
    });
}

// Back to Top with Animation
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scroll with Offset
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const menuToggle = document.getElementById('menuToggle');
                    if (menuToggle) {
                        menuToggle.querySelector('i').classList.remove('fa-times');
                        menuToggle.querySelector('i').classList.add('fa-bars');
                        menuToggle.style.transform = 'rotate(0)';
                    }
                }
                
                // Calculate scroll position
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight + 10;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form with Enhanced Feedback
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Add floating label effect
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const icon = group.querySelector('i');
        
        if (input) {
            // Focus effect
            input.addEventListener('focus', () => {
                group.classList.add('focused');
                if (icon) icon.style.color = '#64ffda';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
                if (icon) icon.style.color = '#999';
            });
            
            // Check initial value
            if (input.value) {
                group.classList.add('focused');
            }
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Add ripple effect to button
        const ripple = document.createElement('span');
        const rect = submitBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = rect.width / 2;
        const y = rect.height / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            margin-left: -${size/2}px;
            margin-top: -${size/2}px;
            pointer-events: none;
        `;
        
        submitBtn.appendChild(ripple);
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>Message Sent Successfully!</h4>
                        <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </div>
                </div>
            `;
            
            successMessage.style.cssText = `
                background: linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(82, 212, 176, 0.1));
                border: 1px solid #64ffda;
                border-radius: 15px;
                padding: 25px;
                margin-top: 30px;
                animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                color: #0a192f;
            `;
            
            const successContent = successMessage.querySelector('.success-content');
            successContent.style.cssText = `
                display: flex;
                align-items: center;
                gap: 20px;
            `;
            
            const icon = successMessage.querySelector('i');
            icon.style.cssText = `
                font-size: 2.5rem;
                color: #64ffda;
                flex-shrink: 0;
            `;
            
            successMessage.querySelector('h4').style.cssText = `
                margin: 0 0 8px 0;
                color: #0a192f;
                font-size: 1.2rem;
            `;
            
            successMessage.querySelector('p').style.cssText = `
                margin: 0;
                color: #666;
                font-size: 1rem;
                line-height: 1.5;
            `;
            
            // Insert success message
            contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
            
            // Reset form
            contactForm.reset();
            
            // Reset button state
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                ripple.remove();
            }, 300);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 5000);
            
            console.log('Your Form submitted successfully');
        }, 2000);
    });
}

// Scroll Animations for Sections
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const skillItems = document.querySelectorAll('.skill-item');
    const projectCards = document.querySelectorAll('.project-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                const skillLevel = entry.target.querySelector('.skill-level');
                if (skillLevel) {
                    const width = skillLevel.style.width;
                    skillLevel.style.width = '0%';
                    
                    setTimeout(() => {
                        skillLevel.style.width = width;
                    }, 300);
                }
            }
        });
    }, { threshold: 0.3 });
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200); // Stagger animation
            }
        });
    }, { threshold: 0.2 });
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 300); // Stagger animation
            }
        });
    }, { threshold: 0.3 });
    
    // Observe elements
    sections.forEach(section => sectionObserver.observe(section));
    skillItems.forEach(item => skillObserver.observe(item));
    projectCards.forEach(card => projectObserver.observe(card));
    timelineItems.forEach(item => timelineObserver.observe(item));
}

// Skill Bar Animations
function initSkillAnimations() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        // Store original width
        const originalWidth = level.style.width;
        level.setAttribute('data-width', originalWidth);
        level.style.width = '0%';
    });
}

// Parallax Effects
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
}

// Scroll Reveal Animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;
        
        this.style.setProperty('--x', `${x}px`);
        this.style.setProperty('--y', `${y}px`);
    });
});

// Add CSS for enhanced effects
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    /* Light Mode */
    .light-mode {
        background: #ffffff;
        color: #333333;
    }
    
    .light-mode .navbar {
        background: rgba(255, 255, 255, 0.95);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .light-mode .name {
        color: #333333;
    }
    
    .light-mode .nav-link {
        color: #666666;
    }
    
    .light-mode .nav-link:hover,
    .light-mode .nav-link.active {
        color: #64ffda;
        background: rgba(100, 255, 218, 0.1);
    }
    
    .light-mode .section-title {
        color: #333333;
    }
    
    .light-mode .section-title::after {
        background: linear-gradient(90deg, #64ffda, #52d4b0);
    }
    
    .light-mode .skill-category,
    .light-mode .project-card,
    .light-mode .contact-form,
    .light-mode .info-item {
        background: #ffffff;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }
    
    .light-mode .project-card:hover {
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
    }
    
    .light-mode .skill-category h3,
    .light-mode .project-content h3,
    .light-mode .info-item h3 {
        color: #333333;
    }
    
    .light-mode .skill-name {
        color: #333333;
    }
    
    .light-mode .tag {
        background: rgba(100, 255, 218, 0.15);
        color: #0a192f;
    }
    
    .light-mode .form-group input,
    .light-mode .form-group textarea {
        background: #f8f9fa;
        border-color: #e0e0e0;
    }
    
    .light-mode .form-group input:focus,
    .light-mode .form-group textarea:focus {
        background: #ffffff;
        border-color: #64ffda;
    }
    
    /* Reveal animation */
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Button hover effect */
    .btn {
        --x: 50%;
        --y: 50%;
        position: relative;
        overflow: hidden;
    }
    
    .btn::after {
        content: '';
        position: absolute;
        top: var(--y);
        left: var(--x);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }
    
    .btn:hover::after {
        width: 300px;
        height: 300px;
    }
    
    /* Form focused state */
    .form-group.focused i {
        color: #64ffda !important;
        transform: scale(1.2);
        transition: all 0.3s ease;
    }
    
    /* Loading animations */
    body.loaded .hero-text {
        animation: slideInLeft 1s ease;
    }
    
    body.loaded .hero-image {
        animation: slideInRight 1s ease;
    }
    
    /* Floating animation for profile card */
    @keyframes floating {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        33% {
            transform: translateY(-20px) rotate(2deg);
        }
        66% {
            transform: translateY(10px) rotate(-2deg);
        }
    }
    
    /* Pulse animation for status dot */
    @keyframes statusPulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(100, 255, 218, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(100, 255, 218, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(100, 255, 218, 0);
        }
    }
`;
document.head.appendChild(enhancedStyles);

// Add floating particles effect
function addFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(100, 255, 218, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
        `;
        
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        
        hero.appendChild(particle);
    }
    
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(floatStyle);
}

// Initialize floating particles after load
window.addEventListener('load', () => {
    setTimeout(addFloatingParticles, 1000);
});

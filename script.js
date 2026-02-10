// Portfolio Initialization
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components
        this.initLoadingScreen();
        this.initNavigation();
        this.initThemeToggle();
        this.initScrollAnimations();
        this.initParticles();
        this.initTypingEffect();
        this.initSkillBars();
        this.initContactForm();
        this.initBackToTop();
        this.initCounters();
        this.initProjectCards();
        this.initFormValidation();
        this.initMobileMenu();
        
        console.log('🎉 Portfolio initialized successfully!');
    }

    // Loading Screen
    initLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.loading-screen').style.opacity = '0';
                setTimeout(() => {
                    document.querySelector('.loading-screen').style.display = 'none';
                }, 500);
            }, 1500);
        });
    }

    // Navigation
    initNavigation() {
        const nav = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            // Update active nav link
            this.updateActiveNavLink();
        });

        // Smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active class
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Close mobile menu if open
                    if (document.querySelector('.nav-menu').classList.contains('active')) {
                        this.toggleMobileMenu();
                    }
                }
            });
        });
    }

    // Mobile Menu
    initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const menuLines = document.querySelectorAll('.menu-line');
        
        navMenu.classList.toggle('active');
        
        // Animate menu lines
        if (navMenu.classList.contains('active')) {
            menuLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuLines[1].style.opacity = '0';
            menuLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            menuLines[0].style.transform = 'none';
            menuLines[1].style.opacity = '1';
            menuLines[2].style.transform = 'none';
        }
    }

    // Update active nav link
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Theme Toggle
    initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const icon = themeToggle.querySelector('i');
        
        // Check for saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Particles Background
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#2563eb" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#8b5cf6",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    }

    // Typing Effect
    initTypingEffect() {
        const dynamicTexts = document.querySelector('.dynamic-texts');
        if (!dynamicTexts) return;
        
        const texts = Array.from(dynamicTexts.querySelectorAll('.dynamic-text'));
        let currentIndex = 0;
        
        function showNextText() {
            texts.forEach((text, index) => {
                text.style.transform = `translateY(-${currentIndex * 100}%)`;
            });
            
            currentIndex = (currentIndex + 1) % texts.length;
        }
        
        // Start animation
        setInterval(showNextText, 3000);
    }

    // Skill Bars Animation
    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = `${width}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }

    // Scroll Animations
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.about-card, .skill-category, .project-card, .info-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    }

    // Contact Form
    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            const formMessage = document.getElementById('formMessage');
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formMessage.textContent = '🎉 Message sent successfully! I\'ll get back to you soon.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    form.reset();
                    
                    // Redirect to thank you page after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'thank-you.html';
                    }, 2000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formMessage.textContent = '⚠️ Something went wrong. Please try again or email me directly.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            } finally {
                submitBtn.disabled = false;
                btnText.textContent = originalText;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Form Validation
    initFormValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        field.classList.remove('error');
        
        // Check required fields
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            field.classList.add('error');
            this.showFieldError(field, errorMessage);
        } else {
            this.removeFieldError(field);
        }
        
        return isValid;
    }

    showFieldError(field, message) {
        // Remove existing error
        this.removeFieldError(field);
        
        // Create error element
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = message;
        error.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 0.3rem;
            margin-left: 0.5rem;
        `;
        
        field.parentNode.appendChild(error);
    }

    removeFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Back to Top Button
    initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Number Counters
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // Project Cards Hover Effect
    initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize Portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .field-error {
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.3rem;
        margin-left: 0.5rem;
    }
    
    input.error,
    textarea.error {
        border-color: #ef4444 !important;
    }
    
    input.error:focus,
    textarea.error:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;
document.head.appendChild(style);

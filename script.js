// Portfolio Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portfolio
    initPortfolio();
});

function initPortfolio() {
    console.log('🚀 Initializing Portfolio...');
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize projects
    initProjects();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Log initialization
    console.log('✅ Portfolio initialized successfully');
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });
    
    // Fallback in case load event doesn't fire
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
}

// Navigation
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                navLinks.classList.contains('active'));
            
            // Update menu icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (!themeToggle || !themeIcon) return;
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Update icon
        if (newTheme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        // Save preference
        localStorage.setItem('portfolio-theme', newTheme);
        
        console.log(`🌗 Theme switched to ${newTheme} mode`);
    });
}

// Typing Effect
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = [
        "Dental Surgery Student",
        "Health-Tech Innovator",
        "Python Developer",
        "Data Privacy Specialist",
        "STEM Coordinator",
        "Creative Problem Solver"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        if (isPaused) return;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Speed control
        let speed = 100;
        
        if (isDeleting) {
            speed = 50;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of word
            isDeleting = true;
            speed = 2000;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500;
        }
        
        setTimeout(type, speed);
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
    
    // Pause typing on hover
    typingText.parentElement.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    typingText.parentElement.addEventListener('mouseleave', () => {
        isPaused = false;
        setTimeout(type, 100);
    });
}

// Projects Data and Initialization
const projectsData = [
    {
        id: 1,
        title: "CheckMySmile",
        description: "An oral health diagnostic tool designed to bridge the gap between neglected oral health symptoms and timely diagnosis. Features interactive learning modules and dental care reminders.",
        category: "dental-tech",
        tags: ["Python", "Mobile App", "Healthcare", "Firebase"],
        image: "checkmysmile.jpg",
        demoUrl: "https://youtu.be/XfdkxzoQw9Q",
        codeUrl: "#"
    },
    {
        id: 2,
        title: "Poetry Quote App",
        description: "Mobile application extracting meaningful lines from poems as daily motivational quotes with mood-based recommendations and personal journaling features.",
        category: "creative-tech",
        tags: ["Python", "NLP", "Literature", "Mobile"],
        image: "poetry-app.jpg",
        demoUrl: "#",
        codeUrl: "#"
    },
    {
        id: 3,
        title: "KUHeS Campus Connect",
        description: "Platform for student discussions, events, academic community building, resource sharing, and collaborative learning at Kamuzu University of Health Sciences.",
        category: "edtech",
        tags: ["Python", "Community", "Firebase", "Education"],
        image: "kuhes-campus-connect.jpg",
        demoUrl: "#",
        codeUrl: "#"
    }
];

function initProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;
    
    // Clear existing content
    projectsContainer.innerHTML = '';
    
    // Create project cards
    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
    
    console.log(`📁 Loaded ${projectsData.length} projects`);
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    
    // Determine category color
    let categoryColor = '#64ffda'; // Default accent
    let categoryIcon = 'fa-code';
    
    switch(project.category) {
        case 'dental-tech':
            categoryColor = '#64ffda';
            categoryIcon = 'fa-tooth';
            break;
        case 'creative-tech':
            categoryColor = '#8892b0';
            categoryIcon = 'fa-pen-fancy';
            break;
        case 'edtech':
            categoryColor = '#52d4b0';
            categoryIcon = 'fa-university';
            break;
    }
    
    card.innerHTML = `
        <div class="project-image" style="background-image: url('${project.image}'); background-color: #0a192f;">
            <div class="project-overlay"></div>
            <div class="project-tag" style="background-color: ${categoryColor};">
                <i class="fas ${categoryIcon}"></i>
                ${project.category.replace('-', ' ').toUpperCase()}
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p class="project-desc">${project.description}</p>
            <div class="project-tech">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <div class="project-actions">
                ${project.demoUrl !== '#' ? 
                    `<a href="${project.demoUrl}" target="_blank" class="btn btn-small">
                        <i class="fas fa-play-circle"></i>
                        View Demo
                    </a>` : 
                    `<button class="btn btn-small" disabled>
                        <i class="fas fa-eye-slash"></i>
                        Demo Coming Soon
                    </button>`
                }
                <button class="btn btn-secondary btn-small" onclick="viewProjectDetails(${project.id})">
                    <i class="fas fa-info-circle"></i>
                    Details
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Global function for project details
window.viewProjectDetails = function(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    alert(`${project.title}\n\n${project.description}\n\nTags: ${project.tags.join(', ')}`);
};

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const formStatus = document.getElementById('formStatus');
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Get form data
            const formData = new FormData(contactForm);
            
            // Send to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                formStatus.innerHTML = `
                    <div class="success">
                        <i class="fas fa-check-circle"></i>
                        <strong>Message sent successfully!</strong>
                        <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </div>
                `;
                formStatus.classList.add('success');
                formStatus.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.classList.remove('success');
                }, 5000);
                
                console.log('📧 Form submitted successfully');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error
            formStatus.innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-circle"></i>
                    <strong>Something went wrong</strong>
                    <p>Please try again or contact me directly at joelkaudzu9@gmail.com</p>
                </div>
            `;
            formStatus.classList.add('error');
            formStatus.style.display = 'block';
            
            console.error('📧 Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const skillBars = skillsSection.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level') || '0';
                    bar.style.width = `${level}%`;
                });
                
                observer.unobserve(skillsSection);
                console.log('📊 Skill bars animated');
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavLink, 100);
    });
}

// Initialize performance optimizations
initPerformanceOptimizations();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initPortfolio };
}

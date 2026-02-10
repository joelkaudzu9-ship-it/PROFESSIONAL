// DOM Ready - ENHANCED WORKING VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio loading...');
    
    // 1. SET CURRENT YEAR
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
        console.log('✅ Year set:', yearElement.textContent);
    }
    
    // 2. HIDE LOADING SCREEN
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            console.log('✅ Loading screen hidden');
        }, 500);
    }
    
    // 3. ENHANCED MOBILE MENU TOGGLE
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            this.innerHTML = isExpanded 
                ? '<i class="fas fa-times"></i><span class="sr-only">Close menu</span>' 
                : '<i class="fas fa-bars"></i><span class="sr-only">Open menu</span>';
        });
        
        // Close menu when clicking links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i><span class="sr-only">Open menu</span>';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i><span class="sr-only">Open menu</span>';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i><span class="sr-only">Open menu</span>';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // 4. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i><span class="sr-only">Open menu</span>';
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
                
                // Scroll to target
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // 5. NAVBAR SCROLL EFFECT
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // 6. TYPING EFFECT
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const texts = [
            "Dental Surgery Student",
            "Health-Tech Innovator",
            "Data Privacy Specialist",
            "Creative Problem Solver",
            "STEM Advocate",
            "KUHeS Coordinator"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const current = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === current.length) {
                setTimeout(() => { isDeleting = true; }, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            setTimeout(type, isDeleting ? 50 : 100);
        }
        
        // Start typing after 1 second
        setTimeout(type, 1000);
    }
    
    // 7. BACK TO TOP BUTTON
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        // Show/hide based on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
        
        // Click to scroll to top
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // 8. DARK/LIGHT MODE
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Check saved preference
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // 9. ENHANCED ANIMATE ON SCROLL
    function checkScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;
        const triggerPoint = 100;
        
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - triggerPoint) {
                el.classList.add('visible');
            }
        });
    }
    
    // Debounced scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkScroll, 50);
    });
    
    // Initial checks
    window.addEventListener('load', checkScroll);
    setTimeout(checkScroll, 100);
    
    // 10. ENHANCED FORM FUNCTIONALITY
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const formStatus = document.getElementById('formStatus');
            
            // Save button text
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
                    formStatus.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                    formStatus.style.color = '#10b981';
                    formStatus.style.display = 'block';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error
                formStatus.textContent = '❌ Something went wrong. Please email me directly at joelkaudzu9@gmail.com';
                formStatus.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                formStatus.style.color = '#ef4444';
                formStatus.style.display = 'block';
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // 11. SKILL BARS ANIMATION
    setTimeout(() => {
        document.querySelectorAll('.skill-level').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }, 1000);
    
    // 12. UPDATE ACTIVE NAV LINK ON SCROLL
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
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
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    console.log('🎉 Portfolio fully loaded!');
});

// DOM Ready - SIMPLIFIED WORKING VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio loading...');
    
    // 1. SET CURRENT YEAR (ALWAYS WORKS)
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
        console.log('✅ Year set:', yearElement.textContent);
    }
    
    // 2. HIDE LOADING SCREEN IMMEDIATELY (NO DELAY)
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            console.log('✅ Loading screen hidden');
        }, 500); // Reduced from 1500ms to 500ms
    }
    
    // 3. MOBILE MENU TOGGLE
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking anywhere else
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
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
                    if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
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
    
    // 9. ANIMATE ON SCROLL (SIMPLIFIED)
    function checkScroll() {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    setTimeout(checkScroll, 500); // Initial check
    
    // 10. FORM FEEDBACK
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Show success message after delay
                setTimeout(() => {
                    const formStatus = document.getElementById('formStatus');
                    if (formStatus) {
                        formStatus.textContent = '✅ Message sent successfully!';
                        formStatus.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                        formStatus.style.color = '#10b981';
                        formStatus.style.display = 'block';
                        formStatus.style.padding = '10px';
                        formStatus.style.borderRadius = '10px';
                        formStatus.style.textAlign = 'center';
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Reset button
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                        submitBtn.disabled = false;
                        
                        // Hide message after 5 seconds
                        setTimeout(() => {
                            formStatus.style.display = 'none';
                        }, 5000);
                    }
                }, 1500);
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
    
    // 12. FIX FOR SOCIAL MEDIA ICONS - Ensure Font Awesome loads
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        .fa-fw {
            width: 1.25em !important;
            text-align: center !important;
            display: inline-block !important;
        }
        
        .social-link i {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        /* Fix for Font Awesome not showing */
        .fab, .fas {
            font-family: 'Font Awesome 6 Brands', 'Font Awesome 6 Free' !important;
            font-weight: 400 !important;
        }
        
        /* Fix for specific social icons */
        .fa-github:before { content: "\\f09b" !important; }
        .fa-linkedin-in:before { content: "\\f0e1" !important; }
        .fa-facebook-f:before { content: "\\f39e" !important; }
        .fa-instagram:before { content: "\\f16d" !important; }
        .fa-whatsapp:before { content: "\\f232" !important; }
        .fa-envelope:before { content: "\\f0e0" !important; }
        .fa-moon:before { content: "\\f186" !important; }
        .fa-sun:before { content: "\\f185" !important; }
    `;
    document.head.appendChild(style);
    
    console.log('🎉 Portfolio fully loaded!');
});

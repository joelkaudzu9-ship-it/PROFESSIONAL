// Android-Style Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initAndroidPortfolio();
});

function initAndroidPortfolio() {
    console.log('🤖 Initializing Android-Style Portfolio...');
    
    // Update time in status bar
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000);
    
    // Initialize Android navigation
    initAndroidNavigation();
    
    // Initialize Android theme
    initAndroidTheme();
    
    // Initialize Android animations
    initAndroidAnimations();
    
    // Initialize Android interactions
    initAndroidInteractions();
    
    // Initialize FAB
    initFloatingActionButton();
    
    console.log('✅ Android Portfolio initialized successfully');
}

function updateStatusBarTime() {
    const timeElement = document.querySelector('.status-time');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
}

function initAndroidNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active nav item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Add click animations to nav items
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Add ripple effect
            createRippleEffect(e, this);
            
            // Update all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function initAndroidTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('android-portfolio-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'light');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply theme transition
        document.documentElement.style.transition = 'all 0.3s ease';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Update icon with animation
        updateThemeIcon(newTheme === 'light');
        
        // Save preference
        localStorage.setItem('android-portfolio-theme', newTheme);
        
        // Reset transition
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
        
        console.log(`🌗 Theme switched to ${newTheme} mode`);
    });
}

function updateThemeIcon(isLight) {
    const themeIcon = document.querySelector('#themeToggle i');
    if (!themeIcon) return;
    
    // Animate icon change
    themeIcon.style.transform = 'rotate(360deg)';
    themeIcon.style.transition = 'transform 0.5s ease';
    
    setTimeout(() => {
        if (isLight) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        themeIcon.style.transform = 'rotate(0)';
    }, 250);
}

function initAndroidAnimations() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.android-progress-fill');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level') || '0';
                skillBar.style.width = `${level}%`;
                
                // Add completion animation
                setTimeout(() => {
                    skillBar.style.opacity = '1';
                    skillBar.style.transform = 'scaleX(1)';
                }, 300);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => skillsObserver.observe(bar));
    
    // Animate cards on scroll
    const cards = document.querySelectorAll('.android-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        cardObserver.observe(card);
    });
    
    // Animate list items
    const listItems = document.querySelectorAll('.android-list-item');
    listItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 100}ms`;
        item.classList.add('page-transition');
    });
}

function initAndroidInteractions() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.android-btn, .android-chip');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.android-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px) scale(1)';
        });
    });
    
    // Add typing animation to hero text
    const heroText = document.querySelector('.typing-text');
    if (heroText) {
        const texts = [
            "Dental Tech Innovator",
            "Android-Style Developer",
            "Healthcare AI Enthusiast",
            "Material Design Expert",
            "Mobile App Creator",
            "Tech Visionary"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                heroText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let speed = 100;
            
            if (isDeleting) {
                speed = 50;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = 500;
            }
            
            setTimeout(type, speed);
        }
        
        setTimeout(type, 1000);
    }
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initFloatingActionButton() {
    const fab = document.querySelector('.fab');
    if (!fab) return;
    
    fab.addEventListener('click', function(e) {
        createRippleEffect(e, this);
        
        // Show quick actions menu
        showQuickActions();
    });
    
    // FAB hover effect
    fab.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(180deg)';
    });
    
    fab.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}

function showQuickActions() {
    // Create quick actions menu
    const quickActions = document.createElement('div');
    quickActions.className = 'quick-actions';
    quickActions.innerHTML = `
        <div class="quick-action" data-action="email">
            <i class="fas fa-envelope"></i>
            <span>Email</span>
        </div>
        <div class="quick-action" data-action="call">
            <i class="fas fa-phone"></i>
            <span>Call</span>
        </div>
        <div class="quick-action" data-action="share">
            <i class="fas fa-share-alt"></i>
            <span>Share</span>
        </div>
    `;
    
    // Add styles
    const styles = `
        .quick-actions {
            position: fixed;
            bottom: 180px;
            right: 30px;
            background: var(--surface-2);
            border-radius: 20px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            box-shadow: var(--android-elevation-4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: slideUp 0.3s ease;
            z-index: 1000;
        }
        .quick-action {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 20px;
            background: var(--surface-3);
            border-radius: 16px;
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .quick-action:hover {
            background: var(--gradient-tech);
            color: white;
            transform: translateX(-8px);
        }
        .quick-action i {
            font-size: 20px;
        }
        .quick-action span {
            font-weight: 500;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(quickActions);
    
    // Add click handlers
    quickActions.querySelectorAll('.quick-action').forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.dataset.action;
            handleQuickAction(actionType);
            quickActions.remove();
            styleSheet.remove();
        });
    });
    
    // Remove on outside click
    setTimeout(() => {
        document.addEventListener('click', function removeQuickActions(e) {
            if (!e.target.closest('.quick-actions') && !e.target.closest('.fab')) {
                quickActions.remove();
                styleSheet.remove();
                document.removeEventListener('click', removeQuickActions);
            }
        });
    }, 100);
}

function handleQuickAction(action) {
    switch(action) {
        case 'email':
            window.location.href = 'mailto:joelkaudzu9@gmail.com';
            break;
        case 'call':
            window.location.href = 'tel:+265983142415';
            break;
        case 'share':
            if (navigator.share) {
                navigator.share({
                    title: 'Joel Kaudzu Portfolio',
                    text: 'Check out this awesome Android-style portfolio!',
                    url: window.location.href
                });
            } else {
                alert('Share feature not supported on this device');
            }
            break;
    }
}

// Battery status simulation
function updateBatteryStatus() {
    const batteryIcon = document.querySelector('.battery-icon');
    if (!batteryIcon) return;
    
    // Simulate battery percentage
    const batteryLevel = Math.floor(Math.random() * 100);
    let iconClass = 'fas fa-battery-full';
    
    if (batteryLevel < 20) {
        iconClass = 'fas fa-battery-empty';
    } else if (batteryLevel < 50) {
        iconClass = 'fas fa-battery-quarter';
    } else if (batteryLevel < 80) {
        iconClass = 'fas fa-battery-half';
    } else if (batteryLevel < 95) {
        iconClass = 'fas fa-battery-three-quarters';
    }
    
    batteryIcon.className = iconClass;
    batteryIcon.title = `${batteryLevel}% battery`;
}

// Initialize battery status
updateBatteryStatus();
setInterval(updateBatteryStatus, 60000);

// Network status simulation
function updateNetworkStatus() {
    const networkIcon = document.querySelector('.network-icon');
    if (!networkIcon) return;
    
    // Simulate network strength
    const strength = Math.floor(Math.random() * 4) + 1;
    networkIcon.className = `fas fa-wifi wifi-${strength}`;
}

// Initialize network status
updateNetworkStatus();
setInterval(updateNetworkStatus, 30000);

// Performance monitoring
let lastScrollTime = 0;
window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime > 100) {
        lastScrollTime = now;
        // Update any scroll-based animations here
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('🚨 Portfolio error:', e.error);
});

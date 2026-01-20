// ============================================
// INTERACTIVE SPA PORTFOLIO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initNumberAnimations();
    initScrollEffects();
    initProgressBars();
    initCardInteractions();
    initStatHovers();
    initParticleBackground();
    initDevBadge();
    initCompanyLogos();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active nav link
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// NUMBER ANIMATIONS
// ============================================
function initNumberAnimations() {
    const animatedNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateNumber(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    animatedNumbers.forEach(num => observer.observe(num));
}

function animateNumber(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    // Get the suffix based on description
    const statItem = element.closest('.stat-item-compact');
    const description = statItem ? statItem.querySelector('.stat-description').textContent.trim() : '';
    let suffix = '';
    
    if (description === 'APIs Built' || description === 'Users Served') {
        suffix = '+';
    } else if (description === '% Test coverage' || description === 'Uptime') {
        suffix = '%';
    }
    
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target, suffix);
            clearInterval(timer);
        } else {
            // For decimals, preserve decimal during animation; for integers, floor
            const displayValue = target % 1 !== 0 ? parseFloat(current.toFixed(1)) : Math.floor(current);
            element.textContent = formatNumber(displayValue, suffix);
        }
    }, stepDuration);
}

function formatNumber(num, suffix = '') {
    const numValue = typeof num === 'string' ? parseFloat(num) : num;
    let formatted;
    if (numValue >= 1000000) {
        const millions = numValue / 1000000;
        formatted = millions % 1 === 0 ? millions + 'M' : millions.toFixed(1) + 'M';
    } else if (numValue >= 1000) {
        const thousands = numValue / 1000;
        formatted = thousands % 1 === 0 ? thousands + 'K' : thousands.toFixed(1) + 'K';
    } else {
        // For decimal numbers like 99.5, preserve the decimal
        formatted = numValue % 1 === 0 ? numValue.toString() : numValue.toFixed(1);
    }
    return formatted + suffix;
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    const nav = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.background = 'rgba(250, 250, 250, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.background = 'rgba(250, 250, 250, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
}

// ============================================
// PROGRESS BARS
// ============================================
function initProgressBars() {
    const bars = document.querySelectorAll('.metric-bar');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
            }
        });
    }, observerOptions);
    
    bars.forEach(bar => observer.observe(bar));
}

// ============================================
// CARD INTERACTIONS
// ============================================
function initCardInteractions() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) translateX(5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) translateX(0) scale(1)';
        });
    });
    

}

// ============================================
// STAT HOVER EFFECTS
// ============================================
function initStatHovers() {
    const heroStats = document.querySelectorAll('.hero-stat');
    const statItems = document.querySelectorAll('.stat-item-compact');
    
    heroStats.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            const statValue = this.getAttribute('data-stat');
            // Add pulse animation
            this.style.animation = 'pulse 0.5s ease';
        });
    });
    
    statItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 0, 0, 0.1)';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ============================================
// SMOOTH REVEAL ANIMATIONS
// ============================================
function initRevealAnimations() {
    const elements = document.querySelectorAll('.experience-card, .about-card, .stats-preview, .education-compact, .contact-compact');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', initRevealAnimations);

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        window.scrollBy({
            top: window.innerHeight * 0.7,
            behavior: 'smooth'
        });
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        window.scrollBy({
            top: -window.innerHeight * 0.7,
            behavior: 'smooth'
        });
    }
});

// ============================================
// AI PARTICLE BACKGROUND
// ============================================
function initParticleBackground() {
    const canvas = document.getElementById('ai-particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;
    const connectionDistance = 150;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Keep particles in bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(26, 26, 26, 0.6)';
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(26, 26, 26, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// DEV BADGE CYCLING
// ============================================
function initDevBadge() {
    const badge = document.getElementById('dev-badge');
    if (!badge) return;
    
    const roles = [
        '💻 Software Developer',
        '🚀 Full-Stack Engineer',
        '⚡ Backend Developer',
        '🎨 Frontend Engineer',
        '🔧 DevOps Engineer',
        '📊 Data Engineer',
        '🤖 ML Engineer',
        '☁️ Cloud Architect'
    ];
    
    let currentIndex = 0;
    let isAnimating = false;
    
    badge.addEventListener('click', () => {
        if (isAnimating) return;
        
        isAnimating = true;
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % roles.length;
            badge.textContent = roles[currentIndex];
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        }, 200);
    });
    
    // Auto-cycle every 4 seconds
    setInterval(() => {
        if (!isAnimating) {
            badge.click();
        }
    }, 4000);
}

// ============================================
// COMPANY LOGOS WITH FALLBACK
// ============================================
function initCompanyLogos() {
    const companyLogos = {
        'torq-sports-logo': { initials: 'TS', color: '#E8B4A0' },
        'iit-logo': { initials: 'IIT', color: '#C4A8D8' },
        'maxgen-logo': { initials: 'MT', color: '#A8C4A8' },
        'fortune-logo': { initials: 'FPS', color: '#A8B8C8' },
        'ASU-logo': { initials: 'ASU', color: '#E8B4A0' },
        'nirma-logo': { initials: 'NU', color: '#C4A8D8' }
    };
    
    // Handle company logos
    const logoContainers = document.querySelectorAll('.company-icon');
    
    logoContainers.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;
        
        const src = img.src;
        let fallbackKey = 'CO';
        let fallbackColor = '#F5F0E8';
        
        // Determine fallback based on image source
        if (src.includes('torq-sports-logo')) {
            fallbackKey = 'torq-sports-logo';
        } else if (src.includes('iit-logo')) {
            fallbackKey = 'iit-logo';
        } else if (src.includes('maxgen-logo')) {
            fallbackKey = 'maxgen-logo';
        } else if (src.includes('fortune-logo')) {
            fallbackKey = 'fortune-logo';
        } else {
            // Fallback for any other logos
            const domain = src.split('logo.clearbit.com/')[1]?.split('?')[0] || '';
            fallbackKey = domain || 'CO';
        }
        
        const fallback = companyLogos[fallbackKey] || { initials: 'CO', color: '#F5F0E8' };
        
        // Create initials div as fallback (shown by default)
        const initialsDiv = document.createElement('div');
        initialsDiv.className = 'company-initials';
        initialsDiv.textContent = fallback.initials;
        initialsDiv.style.background = fallback.color;
        container.appendChild(initialsDiv);
        
        // Hide initials if image loads successfully
        img.addEventListener('load', function() {
            initialsDiv.style.display = 'none';
            this.style.display = 'block';
        });
        
        // Show initials if image fails to load
        img.addEventListener('error', function() {
            initialsDiv.style.display = 'flex';
            this.style.display = 'none';
        });
        
        // Check if image is already loaded or failed
        if (img.complete) {
            if (img.naturalHeight === 0) {
                initialsDiv.style.display = 'flex';
                img.style.display = 'none';
            } else {
                initialsDiv.style.display = 'none';
                img.style.display = 'block';
            }
        }
    });
    
    // Handle education logos
    const educationLogoContainers = document.querySelectorAll('.education-icon');
    
    educationLogoContainers.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;
        
        const src = img.src;
        let fallbackKey = 'CO';
        let fallbackColor = '#F5F0E8';
        
        // Determine fallback based on image source
        if (src.includes('ASU-logo')) {
            fallbackKey = 'ASU-logo';
        } else if (src.includes('nirma-logo')) {
            fallbackKey = 'nirma-logo';
        }
        
        const fallback = companyLogos[fallbackKey] || { initials: 'CO', color: '#F5F0E8' };
        
        // Create initials div as fallback (shown by default)
        const initialsDiv = document.createElement('div');
        initialsDiv.className = 'education-initials';
        initialsDiv.textContent = fallback.initials;
        initialsDiv.style.background = fallback.color;
        container.appendChild(initialsDiv);
        
        // Hide initials if image loads successfully
        img.addEventListener('load', function() {
            initialsDiv.style.display = 'none';
            this.style.display = 'block';
        });
        
        // Show initials if image fails to load
        img.addEventListener('error', function() {
            initialsDiv.style.display = 'flex';
            this.style.display = 'none';
        });
        
        // Check if image is already loaded or failed
        if (img.complete) {
            if (img.naturalHeight === 0) {
                initialsDiv.style.display = 'flex';
                img.style.display = 'none';
            } else {
                initialsDiv.style.display = 'none';
                img.style.display = 'block';
            }
        }
    });
}

// ============================================
// ADD CSS ANIMATIONS VIA JS
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes ripple {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

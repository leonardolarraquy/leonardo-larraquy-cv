// Main JavaScript for Cloud Experts
(function() {
    'use strict';
    
    // Scroll Reveal Animation
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        function checkReveal() {
            reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', checkReveal, { passive: true });
        checkReveal(); // Check on load
    }
    
    // Animated Counters
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent.replace(/\D/g, ''));
            const increment = target / speed;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        updateCounter();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Particles Background (lightweight version)
    function initParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let animationFrame;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        
        const particles = [];
        const particleCount = 40; // Reduced for performance
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.3 - 0.15;
                this.speedY = Math.random() * 0.3 - 0.15;
                this.opacity = Math.random() * 0.3 + 0.1;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            animationFrame = requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', () => {
            resizeCanvas();
        }, { passive: true });
        
        // Only animate if page is visible (performance optimization)
        if (document.visibilityState === 'visible') {
            animate();
        }
        
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                animate();
            } else {
                cancelAnimationFrame(animationFrame);
            }
        });
    }
    
    // Active Navigation Indicator
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        function updateActiveNav() {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav, { passive: true });
        updateActiveNav();
    }
    
    // Enhanced Form Validation
    function initFormValidation() {
        const inputs = document.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value && !this.validity.valid) {
                    this.style.borderColor = '#ef4444';
                } else if (this.value && this.validity.valid) {
                    this.style.borderColor = '#10b981';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value && this.validity.valid) {
                    this.style.borderColor = '#10b981';
                }
            });
        });
    }
    
    // Smooth Scroll Enhancement
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Tab Navigation
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContainers = document.querySelectorAll('.tab-container');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and containers
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContainers.forEach(container => container.classList.remove('active'));
                
                // Add active class to clicked button and corresponding container
                this.classList.add('active');
                const targetContainer = document.getElementById(`tab-${targetTab}`);
                if (targetContainer) {
                    targetContainer.classList.add('active');
                }
            });
        });
    }
    
    // Google Analytics Form Tracking
    function initFormTracking() {
        const form = document.querySelector('form[action*="getform.io"]');
        if (form) {
            form.addEventListener('submit', function(event) {
                if (typeof gtag === 'function') {
                    gtag('event', 'conversion_event_contact_2', {});
                }
            });
        }
    }
    
    // Lazy load images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Initialize all features
    document.addEventListener('DOMContentLoaded', function() {
        initScrollReveal();
        initCounters();
        initParticles();
        initActiveNav();
        initFormValidation();
        initSmoothScroll();
        initTabs();
        initFormTracking();
        initLazyLoading();
    });
})();


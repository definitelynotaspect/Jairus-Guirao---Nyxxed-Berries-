// ============ NAVIGATION MENU TOGGLE ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============ GALLERY LIGHTBOX ============
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const galleryItems = document.querySelectorAll('.gallery-item');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentImageIndex = 0;
const images = Array.from(galleryItems).map(item => item.getAttribute('data-image'));

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        lightboxImage.src = item.getAttribute('data-image');
        lightbox.classList.add('active');
    });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Navigate images
prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentImageIndex];
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImage.src = images[currentImageIndex];
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'Escape') closeBtn.click();
    }
});

// ============ CONTACT FORM VALIDATION ============
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('formMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm() {
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(msg => msg.classList.remove('show'));
    formMessage.classList.remove('success', 'error');

    // Validate name
    if (nameInput.value.trim().length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    if (!emailRegex.test(emailInput.value.trim())) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (subjectInput.value.trim().length < 3) {
        showError('subjectError', 'Subject must be at least 3 characters');
        isValid = false;
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        // Simulate form submission
        formMessage.textContent = 'Message sent successfully! Thank you for reaching out.';
        formMessage.classList.add('success');

        // Reset form
        contactForm.reset();

        // Clear success message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success');
        }, 5000);
    } else {
        formMessage.textContent = 'Please fix the errors above';
        formMessage.classList.add('error');
    }
});

// ============ SMOOTH SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections for scroll animations
document.querySelectorAll('.music-card, .skill-card, .member-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============ NAVBAR BACKGROUND ON SCROLL ============
const navbar = document.querySelector('.navbar');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 8px 30px rgba(0, 217, 255, 0.15)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 217, 255, 0.1)';
    }
});

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--neon-blue)';
            link.style.textShadow = '0 0 10px var(--neon-blue)';
        } else {
            link.style.color = 'var(--text-light)';
            link.style.textShadow = 'none';
        }
    });
});

// ============ SKILL BARS ANIMATION ============
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.animation = 'fillBar 1.5s ease-out forwards';
                    bar.style.width = width;
                }, 100);
            });
            skillsAnimated = true;
            skillsObserver.unobserve(skillsSection);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ============ PARALLAX EFFECT FOR HERO ============
const heroSection = document.querySelector('.hero');
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        const scrollPosition = window.scrollY;
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ============ MUSIC CARD HOVER EFFECTS ============
const musicCards = document.querySelectorAll('.music-card');

musicCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// ============ TYPING EFFECT FOR HERO TITLE ============
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.textContent;
let index = 0;
let isDeleting = false;

function typeEffect() {
    if (!isDeleting && index < originalText.length) {
        heroTitle.textContent = originalText.substring(0, index + 1);
        index++;
        setTimeout(typeEffect, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 500);
});

// ============ AUDIO PLAYER STYLING ============
const audioPlayer = document.querySelector('audio');
if (audioPlayer) {
    audioPlayer.addEventListener('play', function() {
        this.style.filter = 'drop-shadow(0 0 20px var(--neon-blue))';
    });

    audioPlayer.addEventListener('pause', function() {
        this.style.filter = 'drop-shadow(0 0 10px var(--neon-blue))';
    });
}

// ============ RIPPLE EFFECT ON BUTTONS ============
const buttons = document.querySelectorAll('.cta-button, .submit-button, .music-link');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.8s ease-out';
});

// ============ SCROLL TO TOP BUTTON ============
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--neon-blue), var(--neon-cyan));
    color: var(--primary-dark);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    font-size: 20px;
    box-shadow: 0 0 20px var(--neon-blue);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.display = 'flex';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 0 30px var(--neon-blue), 0 0 40px var(--neon-cyan)';
});

scrollTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 0 20px var(--neon-blue)';
});

// ============ ENHANCED SCROLL ANIMATIONS ============
// Advanced intersection observer for scroll animations
const scrollAnimationConfig = {
    threshold: [0, 0.15, 0.25],
    rootMargin: '0px 0px -100px 0px'
};

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get animation type based on element class or position
            const element = entry.target;
            let animationClass = 'animate';

            // Determine animation direction based on screen position
            const rect = element.getBoundingClientRect();
            const screenCenter = window.innerHeight / 2;

            if (!element.classList.contains('animate')) {
                // Apply animation classes if they exist
                if (element.classList.contains('scroll-animate-left')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-animate-right')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-animate-up')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-animate-down')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-animate-zoom')) {
                    element.classList.add('animate');
                } else {
                    // Default animation for elements without specific class
                    element.style.opacity = '0';
                    element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            }

            // Unobserve after animation is triggered
            scrollAnimationObserver.unobserve(element);
        }
    });
}, scrollAnimationConfig);

// Observe all elements with animation classes and cards
document.querySelectorAll(
    '.scroll-animate-left, .scroll-animate-right, .scroll-animate-up, .scroll-animate-down, .scroll-animate-zoom, .music-card, .skill-card, .member-card, .gallery-item, .about-image, .band-intro, section > .container > *'
).forEach(el => {
    scrollAnimationObserver.observe(el);
});

// ============ SCROLL PROGRESS INDICATOR ============
const scrollProgressBar = document.createElement('div');
scrollProgressBar.style.cssText = `
    position: fixed;
    top: 70px;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #c89152, #e5c7a1, #d8a15e);
    z-index: 999;
    width: 0%;
    box-shadow: 0 0 10px rgba(200, 145, 82, 0.5);
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgressBar);

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgressBar.style.width = progress + '%';
});

// ============ STAGGER ANIMATION FOR LISTS ============
function staggerAnimateElements(selector, staggerDelay = 100) {
    const elements = document.querySelectorAll(selector);
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
                }, index * staggerDelay);
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => staggerObserver.observe(el));
}

// Apply stagger animation to skill cards and member cards
staggerAnimateElements('.skill-card', 50);
staggerAnimateElements('.member-card', 60);

// ============ PARALLAX SCROLL EFFECT ============
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const elementOffset = element.getBoundingClientRect().top;
            const scrollPosition = window.scrollY;
            
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
}

initParallaxEffect();

// ============ MOUSE FOLLOW EFFECT ON SCROLL ============
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.music-card, .member-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const distX = mouseX - cardCenterX;
        const distY = mouseY - cardCenterY;
        
        const distance = Math.sqrt(distX * distX + distY * distY);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
            const intensity = (1 - distance / maxDistance) * 10;
            card.style.boxShadow = `0 0 ${20 + intensity * 10}px rgba(200, 145, 82, ${0.3 + intensity * 0.1})`;
        } else {
            card.style.boxShadow = '';
        }
    });
});

// ============ CONSOLE MESSAGE ============
console.log('%c🎸 Welcome to Jairus Guirao\'s Portfolio 🎸', 'color: #c89152; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #c89152;');
console.log('%cLead Guitarist | Music Creator | Performer', 'color: #e5c7a1; font-size: 14px;');
console.log('%cExplore the music and get in touch!', 'color: #d8a15e; font-size: 12px;');

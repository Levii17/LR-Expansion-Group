// Mobile menu functionality
const navbarCenter = document.querySelector('.navbar-center');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset > 50;
    
    if (scrolled) {
        navbarCenter.classList.add('scrolled');
    } else {
        navbarCenter.classList.remove('scrolled');
    }
});

// Also update your existing mobile menu and scroll functions
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const closeMenuBtn = document.getElementById("close-menu-btn");
    const mobileDropdown = document.getElementById("mobile-dropdown");
    const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
    const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav-links a");
    const sections = document.querySelectorAll("section[id]");
    const navbarCenter = document.querySelector('.navbar-center');

    let menuOpen = false;

    // Toggle mobile menu
    function toggleMenu() {
        menuOpen = !menuOpen;
        mobileDropdown.classList.toggle('active', menuOpen);
        mobileMenuOverlay.classList.toggle('active', menuOpen);
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    }

    // Menu button event listeners
    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    mobileMenuOverlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a mobile link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Enhanced scroll function with navbar effect
    function handleScroll() {
        const scrolled = window.pageYOffset > 50;
        
        // Navbar scroll effect
        if (scrolled) {
            navbarCenter.classList.add('scrolled');
        } else {
            navbarCenter.classList.remove('scrolled');
        }
        
        // Set active nav item
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                });
                
                const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
                activeLinks.forEach(link => {
                    link.classList.add("active");
                });
            }
        });
        
        // Back to top button
        const backToTopBtn = document.querySelector('.back-to-top');
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Adjust scroll offset for sticky center navbar
                    const offset = targetSection.id === 'home' ? 0 : 100;
                    window.scrollTo({
                        top: targetSection.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize
    handleScroll();
    
    // Scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Close mobile menu on resize if open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menuOpen) {
            toggleMenu();
        }
    });
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Testimonials Slider
const track = document.querySelector('.testimonials-track');
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
});

// Auto-slide testimonials
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}, 7000);

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will contact you shortly.');
    contactForm.reset();
});

// Animate on Scroll
const animateElements = document.querySelectorAll('.animate-on-scroll');

function checkScroll() {
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.8;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);
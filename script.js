// Typing effect for the hero section
const typewriterText = ["App Developer", "Web Developer"];
const typewriter = document.querySelector('.typewriter');
let i = 0;
let j = 0;
let isDeleting = false;
let speed = 100;
let timeoutId;

function typeWriter() {
    const currentText = typewriterText[j];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, i--);
        speed = 50;
    } else {
        typewriter.textContent = currentText.substring(0, i++);
        speed = 100;
    }

    if (!isDeleting && i === currentText.length) {
        isDeleting = true;
        speed = 1000; // Pause before deleting
    } else if (isDeleting && i === 0) {
        isDeleting = false;
        j = (j + 1) % typewriterText.length; // Loop through the array
        speed = 500; // Pause before typing next text
    }

    timeoutId = setTimeout(typeWriter, speed);
}

// Clean up timeout when component unmounts
window.addEventListener('beforeunload', () => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
});

// Start when page loads
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupScrollAnimations();
    setupParallaxEffect();
    typeWriter(); // Start the typewriter effect
});

// Mobile navigation
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        });
    });

    // Add active class to current section in navigation
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    });
}

// Smooth scroll for navigation links
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

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Here you would typically send the form data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'flex';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add scroll reveal animations
function setupScrollAnimations() {
    const revealElements = document.querySelectorAll('.skill-category, .about-container, .hero-content, .hero-image, .projects-grid > *, .contact-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// Parallax effect for background elements
function setupParallaxEffect() {
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Apply subtle movement to the circle background
        const circleBg = document.querySelector('.circle-bg');
        if (circleBg) {
            circleBg.style.transform = `translate(${mouseX * 20 - 10}px, ${mouseY * 20 - 10}px)`;
        }
        
        // Apply subtle movement to the home background circle
        const homeSection = document.querySelector('.home');
        if (homeSection && homeSection.querySelector(':before')) {
            homeSection.style.setProperty('--bg-position-x', `${mouseX * 5}%`);
            homeSection.style.setProperty('--bg-position-y', `${mouseY * 5}%`);
        }
    });
}

// Add skill progress animation
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.classList.add('skill-animate');
    });
    
    item.addEventListener('mouseleave', () => {
        item.classList.remove('skill-animate');
    });
}); 
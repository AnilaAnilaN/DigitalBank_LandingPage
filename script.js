// Disclaimer popup
const disclaimerOverlay = document.getElementById('disclaimerOverlay');
const closeDisclaimer = document.getElementById('closeDisclaimer');

closeDisclaimer.addEventListener('click', () => {
  disclaimerOverlay.classList.add('hidden');
  setTimeout(() => {
    disclaimerOverlay.style.display = 'none';
  }, 300);
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const hamburgerIcon = document.getElementById('hamburgerIcon');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('active');
  
  if (menuOpen) {
    hamburgerIcon.src = './images/icon-close.svg';
  } else {
    hamburgerIcon.src = './images/icon-hamburger.svg';
  }
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target) && menuOpen) {
    menuOpen = false;
    mobileMenu.classList.remove('active');
    hamburgerIcon.src = './images/icon-hamburger.svg';
  }
});

// Active navigation state
const navLinks = document.querySelectorAll('.nav-links a');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

mobileLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    mobileLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    // Close mobile menu after selection
    menuOpen = false;
    mobileMenu.classList.remove('active');
    hamburgerIcon.src = './images/icon-hamburger.svg';
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .article-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

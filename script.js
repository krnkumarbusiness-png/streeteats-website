// ─── NAVBAR ───
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html') || 
      (currentPage === 'index.html' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── SCROLL TOP ───
const scrollTopBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn?.classList.add('visible');
  } else {
    scrollTopBtn?.classList.remove('visible');
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── REVEAL ON SCROLL ───
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ─── EMAIL FORM ───
const emailForms = document.querySelectorAll('.notify-form');
emailForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast('🎉 You\'re on the list! We\'ll notify you on launch.');
      input.value = '';
    }
  });
});

// ─── CONTACT FORM ───
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✅ Message sent! We\'ll get back to you within 24 hours.');
    contactForm.reset();
  });
}

// ─── TOAST ───
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ─── FOOD CARD HOVER SOUNDS (visual only) ───
document.querySelectorAll('.food-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const r = (Math.random() - 0.5) * 6;
    card.style.transform = `rotate(${r}deg) translate(-2px,-3px) scale(1.06)`;
  });
  card.addEventListener('mouseleave', () => {
    const idx = [...card.parentElement.children].indexOf(card);
    card.style.transform = idx % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)';
  });
});

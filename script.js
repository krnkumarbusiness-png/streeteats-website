/* ═══════════════════════════════════════════
   STREET EATS — script.js
   Fixes: reveal stuck, hamburger broken,
          mobile IntersectionObserver issues
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── 1. REVEAL ANIMATION ─── */
  // Show all reveals immediately if reduced-motion or no IO support
  const revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything right away
    revealEls.forEach(el => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0,          // trigger as soon as 1px enters viewport
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) { io.observe(el); });

    // Safety net: after 800ms force-show anything still hidden
    // (catches elements already in viewport on load)
    setTimeout(function () {
      revealEls.forEach(function (el) {
        if (!el.classList.contains('visible')) {
          el.classList.add('visible');
        }
      });
    }, 800);
  }

  /* ─── 2. HAMBURGER / MOBILE MENU ─── */
  var hamburger  = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var navbar     = document.querySelector('.navbar');

  if (hamburger && mobileMenu) {

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking a menu link
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (navbar && !navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ─── 3. ACTIVE NAV LINK ─── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (href.split('#')[0] === currentPage)
    ) {
      link.classList.add('active');
    }
  });

  /* ─── 4. SCROLL TO TOP ─── */
  var scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 350) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── 5. NOTIFY FORM ─── */
  document.querySelectorAll('.notify-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('🎉 You\'re on the list! We\'ll notify you on launch.');
        input.value = '';
      }
    });
  });

  /* ─── 6. CONTACT FORM ─── */
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('✅ Message sent! We\'ll get back to you within 24 hours.');
      contactForm.reset();
    });
  }

  /* ─── 7. FOOD CARD TOUCH INTERACTION ─── */
  document.querySelectorAll('.food-card').forEach(function (card, idx) {
    // Hover (desktop)
    card.addEventListener('mouseenter', function () {
      var r = (Math.random() - 0.5) * 8;
      card.style.transform = 'rotate(' + r + 'deg) translate(-2px,-3px) scale(1.06)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = idx % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)';
    });
    // Touch feedback (mobile)
    card.addEventListener('touchstart', function () {
      card.style.transform = 'scale(0.96)';
    }, { passive: true });
    card.addEventListener('touchend', function () {
      card.style.transform = idx % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)';
    }, { passive: true });
  });

});

/* ─── TOAST UTILITY ─── */
function showToast(msg) {
  var toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 3500);
}

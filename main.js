/* LDF Fascias & Guttering — Main JS */

(function () {
  'use strict';

  // ── MOBILE NAV DRAWER ──
  const burger       = document.getElementById('burger');
  const navDrawer    = document.getElementById('navDrawer');
  const drawerClose  = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    navDrawer?.classList.add('open');
    drawerOverlay?.classList.add('open');
    burger?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    navDrawer?.classList.remove('open');
    drawerOverlay?.classList.remove('open');
    burger?.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  // Close drawer when a link inside it is clicked
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ── STICKY HEADER ──
  const header = document.getElementById('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    lastScroll = y;
  }, { passive: true });

  // ── BACK TO TOP ──
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  }, { passive: true });
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── CONTACT FORM ──
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  form?.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!validateForm(form)) return;

    const btnText    = form.querySelector('.btn-text');
    const btnLoading = form.querySelector('.btn-loading');
    btnText.style.display    = 'none';
    btnLoading.style.display = 'flex';

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    // Send via Formspree (replace YOUR_FORM_ID with actual ID)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        form.reset();
        formSuccess.style.display = 'flex';
        form.querySelector('button[type=submit]').style.display = 'none';
      } else {
        throw new Error('Server error');
      }
    } catch {
      // Fallback: construct mailto link
      const subject = encodeURIComponent('Quote Request from Website');
      const body = encodeURIComponent(
        `Name: ${payload.fname} ${payload.lname}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nPostcode: ${payload.postcode}\nService: ${payload.service}\n\nMessage:\n${payload.message || 'N/A'}`
      );
      window.location.href = `mailto:info@ldfguttering.co.uk?subject=${subject}&body=${body}`;
    } finally {
      btnText.style.display    = 'inline-flex';
      btnLoading.style.display = 'none';
    }
  });

  function validateForm(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });
    return valid;
  }

  // Clear error on input
  form?.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });

  // ── INTERSECTION OBSERVER — FADE IN ──
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.service-card, .review-card, .process-step, .why-point, .area-pill, .gallery-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity .5s ease ${i * 0.05}s, transform .5s ease ${i * 0.05}s`;
      observer.observe(el);
    });
  }

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();

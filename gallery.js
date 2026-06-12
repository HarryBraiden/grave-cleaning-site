/* LDF Fascias & Guttering — Gallery JS */

(function () {
  'use strict';

  // ── FILTER TABS ──
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const cards       = document.querySelectorAll('.gallery-card');
  const noResults   = document.getElementById('noResults');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('hidden');
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      noResults.style.display = visible === 0 ? 'block' : 'none';
    });
  });

  // ── LIGHTBOX ──
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev  = document.getElementById('lightboxPrev');
  const lightboxNext  = document.getElementById('lightboxNext');

  let currentIndex = 0;
  let visibleCards  = [];

  function getVisibleCards() {
    return [...document.querySelectorAll('.gallery-card:not(.hidden)')];
  }

  function openLightbox(index) {
    visibleCards = getVisibleCards();
    currentIndex = index;
    const src = visibleCards[currentIndex].querySelector('.gallery-zoom').dataset.src;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function showPrev() {
    visibleCards = getVisibleCards();
    currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
    lightboxImg.src = visibleCards[currentIndex].querySelector('.gallery-zoom').dataset.src;
  }

  function showNext() {
    visibleCards = getVisibleCards();
    currentIndex = (currentIndex + 1) % visibleCards.length;
    lightboxImg.src = visibleCards[currentIndex].querySelector('.gallery-zoom').dataset.src;
  }

  document.querySelectorAll('.gallery-zoom').forEach((btn, i) => {
    btn.addEventListener('click', () => openLightbox(i));
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', showPrev);
  lightboxNext?.addEventListener('click', showNext);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

})();

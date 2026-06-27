'use strict';

const CAKES = {
  lavender: {
    num: 'No. I', title: 'Violet Quietude',
    tag: 'A meditation on floral restraint and botanical grace',
    price: 'From £485',
    layers: [
      { name: 'Crown',                  detail: 'Pressed edible violet petals & crystallised lavender sprigs',       color: '#C8A8E0' },
      { name: 'French Buttercream',     detail: 'Lavender-infused French buttercream, whipped to cloud-like peaks',  color: '#C8B5D8' },
      { name: 'Lavender Sponge III',    detail: 'Delicate lavender & Tahitian vanilla sponge',                       color: '#D8C8E8' },
      { name: 'Bergamot Gelee',         detail: 'Bergamot gelee set to a jewel-like, trembling clarity',            color: '#B8D8C8' },
      { name: 'Lavender Sponge II',     detail: 'Delicate lavender & Tahitian vanilla sponge',                       color: '#D8C8E8' },
      { name: 'White Chocolate Mousse', detail: 'Aerated white chocolate mousse — cloud-soft and ethereal',          color: '#F8F0E8' },
      { name: 'Lavender Sponge I',      detail: 'Delicate lavender & Tahitian vanilla sponge',                       color: '#D8C8E8' },
      { name: 'Almond Cremeux Base',    detail: 'Almond cremeux resting on a pate sucree foundation',                color: '#D8C8A8' },
    ],
  },
  orange: {
    num: 'No. II', title: 'Citrus Nocturne',
    tag: 'Bold and luminous — a study in citrus complexity',
    price: 'From £520',
    layers: [
      { name: 'Crown',                    detail: 'Caramelised citrus ribbons & candied Seville orange peel',   color: '#E89060' },
      { name: 'Burnt Lemon Curd',         detail: 'Hand-torched lemon curd with deep, smoky amber notes',      color: '#D0A040' },
      { name: 'Blood Orange Sponge III',  detail: 'Blood orange & extra-virgin olive oil sponge',              color: '#E88060' },
      { name: 'Yuzu Curd',               detail: 'Yuzu curd with Madagascan vanilla — bright and floral',      color: '#F0C870' },
      { name: 'Blood Orange Sponge II',   detail: 'Blood orange & extra-virgin olive oil sponge',              color: '#E88060' },
      { name: 'Seville Marmalade',        detail: 'Seville orange & Campari marmalade — deeply complex',       color: '#C87040' },
      { name: 'Blood Orange Sponge I',    detail: 'Blood orange & extra-virgin olive oil sponge',              color: '#E88060' },
      { name: 'Frangipane Base',          detail: 'Brown butter frangipane in a citrus tart shell',            color: '#C8A870' },
    ],
  },
  dandelion: {
    num: 'No. III', title: 'Wild Reverie',
    tag: 'A tiered pastoral — nature at its most elegant',
    price: 'From £680',
    layers: [
      { name: 'Crown',                detail: 'Crystallised ginger chips & hand-applied edible gold leaf',  color: '#D0B870' },
      { name: 'Wild Honey Glaze',     detail: 'Raw wildflower honey sourced from Dartmoor apiaries',       color: '#D8A840' },
      { name: 'Dandelion Sponge III', detail: 'Dandelion root & brown butter sponge — nutty and warm',     color: '#C8B870' },
      { name: 'Fresh Ginger Curd',    detail: 'Bright, warming curd made from freshly pressed ginger',     color: '#E8C870' },
      { name: 'Dandelion Sponge II',  detail: 'Dandelion root & brown butter sponge — nutty and warm',     color: '#C8B870' },
      { name: 'Honey Mascarpone',     detail: 'Whipped honey mascarpone, lightly spiced with cardamom',    color: '#F5EDD0' },
      { name: 'Dandelion Sponge I',   detail: 'Dandelion root & brown butter sponge — nutty and warm',     color: '#C8B870' },
      { name: 'Ginger Biscuit Base',  detail: 'Dark ginger biscuit with a salted caramel foundation',      color: '#A88848' },
    ],
  },
};

const overlay    = document.getElementById('layerModal');
const exploded   = document.getElementById('exploded');
const detailRows = document.getElementById('detailLayers');

function darken(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const clamp = v => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) - amt);
  const g = clamp(((n >> 8) & 0xff) - amt);
  const b = clamp((n & 0xff) - amt);
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
}

function openModal(key) {
  const data = CAKES[key];
  if (!data) return;

  document.getElementById('detailNum').textContent   = data.num;
  document.getElementById('detailTitle').textContent = data.title;
  document.getElementById('detailTag').textContent   = data.tag;
  document.getElementById('detailPrice').textContent = data.price;

  exploded.innerHTML = '';
  [...data.layers].reverse().forEach((layer, i) => {
    const el = document.createElement('div');
    el.className = 'ex-layer';
    el.style.cssText = `background: linear-gradient(90deg, ${layer.color}, ${darken(layer.color, 22)}); animation-delay: ${i * 0.055}s;`;
    el.setAttribute('data-name', layer.name);
    exploded.appendChild(el);
  });

  detailRows.innerHTML = '';
  data.layers.forEach((layer, i) => {
    const row = document.createElement('div');
    row.className = 'layer-row';
    row.style.animationDelay = `${i * 0.055 + 0.18}s`;
    row.innerHTML = `
      <div class="layer-dot" style="background:${layer.color}"></div>
      <div class="layer-text">
        <span class="layer-name">${layer.name}</span>
        <span class="layer-detail">${layer.detail}</span>
      </div>`;
    detailRows.appendChild(row);
  });

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
document.querySelectorAll('.explore-btn').forEach(btn =>
  btn.addEventListener('click', () => openModal(btn.getAttribute('data-cake')))
);

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  observer.observe(el);
});
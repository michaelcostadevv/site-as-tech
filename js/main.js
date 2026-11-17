/* =========================================================
   AS Tech — interações
   ========================================================= */
(() => {
  'use strict';

  /* ---- Configuração central de contato ----
     Altere aqui para atualizar todos os botões de WhatsApp da página. */
  const CONFIG = {
    whatsapp: '5571999483729',
    message: 'Olá! Conheci a AS Tech pelo site e gostaria de solicitar informações sobre um conserto.',
  };

  const waUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.message)}`;
  document.querySelectorAll('[data-whatsapp]').forEach((el) => { el.href = waUrl; });

  /* ---- Cards de serviço: abrem o WhatsApp já citando o serviço ---- */
  document.querySelectorAll('.service-card').forEach((card) => {
    const service = card.querySelector('h3')?.textContent.trim();
    if (!service) return;
    const msg = `Olá! Vim pelo site da AS Tech e gostaria de um orçamento para: ${service}.`;
    const link = document.createElement('a');
    link.className = 'service-card__cta link-arrow';
    link.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', `Orçar ${service} pelo WhatsApp`);
    link.innerHTML = 'Orçar pelo WhatsApp <svg class="icon icon--sm" aria-hidden="true"><use href="#i-arrow"/></svg>';
    card.appendChild(link);
  });

  /* ---- Fotos: só aparecem se o arquivo existir em assets/fotos ---- */
  const whenLoaded = (img, ok, fail) => {
    if (img.complete) { img.naturalWidth ? ok() : fail(); return; }
    img.addEventListener('load', ok, { once: true });
    img.addEventListener('error', fail, { once: true });
  };
  const heroPhoto = document.querySelector('.device__photo');
  if (heroPhoto) {
    whenLoaded(heroPhoto,
      () => heroPhoto.closest('.device').classList.add('has-photo'),
      () => heroPhoto.remove());
  }
  document.querySelectorAll('.service-card__media img').forEach((img) => {
    // A área de foto fica escondida até a imagem carregar; sem arquivo, o card segue compacto
    whenLoaded(img,
      () => { img.classList.add('is-loaded'); img.parentElement.classList.add('has-photo'); },
      () => img.parentElement.remove());
  });

  /* ---- Ano no rodapé ---- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Header + botão flutuante ao rolar ---- */
  const header = document.querySelector('.header');
  const waFloat = document.querySelector('.wa-float');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 12);
    waFloat.classList.toggle('is-visible', y > 320);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Menu mobile ---- */
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
})();

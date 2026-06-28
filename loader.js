// Script que carrega conteúdo do data.json (via /api/data) e injeta no HTML
(async function() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // HERO SECTION
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (data.hero) {
      const h2 = document.querySelector('.hero-content h2');
      if (h2 && (data.hero.title || data.hero.titleBold)) {
        h2.innerHTML = `${data.hero.title || ''} <strong>${data.hero.titleBold || ''}</strong>`;
      }

      const subtitle = document.querySelector('.hero-content p');
      if (subtitle && data.hero.subtitle) subtitle.textContent = data.hero.subtitle;
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SOBRE SECTION
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (data.sobre) {
      const label = document.querySelector('.about-label');
      if (label && data.sobre.label) label.textContent = data.sobre.label;

      const paragraphs = document.querySelectorAll('.about-text p');
      if (paragraphs[0] && data.sobre.description) paragraphs[0].textContent = data.sobre.description;
      if (paragraphs[1] && data.sobre.philosophy) paragraphs[1].textContent = data.sobre.philosophy;
      if (paragraphs[2] && data.sobre.detailedText) paragraphs[2].textContent = data.sobre.detailedText;

      const photo = document.querySelector('.about-image .profile-image');
      if (photo && data.sobre.photo1) photo.src = data.sobre.photo1;
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SERVIÇOS CARDS (3 primeiros cards da grade)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (data.servicos && Array.isArray(data.servicos.cards)) {
      const cards = document.querySelectorAll('.service-card');
      data.servicos.cards.forEach((cardData, idx) => {
        const card = cards[idx];
        if (!card) return;
        const h3 = card.querySelector('h3');
        if (h3 && cardData.title) h3.textContent = cardData.title;
        const p = card.querySelector('p');
        if (p && cardData.description) p.textContent = cardData.description;
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // CONTATO (header, footer, cta, seção de contato)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (data.contato) {
      const wa = data.contato.whatsapp;
      if (wa) {
        document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
          a.href = `https://wa.me/${wa}`;
        });
      }

      const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
      if (emailLink && data.contato.email) {
        emailLink.href = `mailto:${data.contato.email}`;
        emailLink.textContent = data.contato.email;
      }

      const phoneLink = document.querySelector('.contact-item a[href*="wa.me/"]');
      if (phoneLink && data.contato.telefone) phoneLink.textContent = data.contato.telefone;

      const addressEl = document.querySelector('.contact-details p');
      if (addressEl && data.contato.localizacao) {
        addressEl.innerHTML = data.contato.localizacao.replace(/\n/g, '<br>');
      }

      const instaLink = document.querySelector('.social-icon.instagram');
      if (instaLink && data.contato.instagram) instaLink.href = data.contato.instagram;

      const oabEl = document.querySelector('.contact-oab');
      if (oabEl && data.contato.oab) oabEl.textContent = data.contato.oab;

      const legalizzareLink = document.querySelector('.about-link');
      if (legalizzareLink && data.contato.site_legalizzare) legalizzareLink.href = data.contato.site_legalizzare;
    }

  } catch (error) {
    console.error('Erro ao carregar dados do CMS:', error);
  }
})();

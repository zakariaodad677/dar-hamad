/* ═══════════════════════════════════════════
   DAR HAMAD — Shared Components
   Injects nav, footer, and shared interactions
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Determine current page ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const isArabic = document.documentElement.lang === 'ar';

  /* ── Inject shared nav ── */
  function buildNav() {
    const navLinks = [
      { href: 'index.html#home', label: 'Home', labelAr: 'الرئيسية', id: 'home' },
      { href: 'index.html#heritage', label: 'Our Story', labelAr: 'قصتنا', id: 'heritage' },
      { href: 'menu.html', label: 'Menu', labelAr: 'القائمة', id: 'menu' },
      { href: 'index.html#experience', label: 'Experience', labelAr: 'التجربة', id: 'experience' },
      { href: 'branches.html', label: 'Branches', labelAr: 'الفروع', id: 'branches' },
      { href: 'order.html', label: 'Order', labelAr: 'اطلب الآن', id: 'order' },
    ];

    const activeId = path.replace('.html', '');
    const navLinksHtml = navLinks.map(l => {
      const isActive = path === l.href.split('#')[0] ||
        (path === 'index.html' && l.id === 'home') ||
        (path === '' && l.id === 'home');
      return `<li><a href="${l.href}" class="nav__link${isActive && !l.href.includes('#') ? ' active' : ''}" data-id="${l.id}">${isArabic ? l.labelAr : l.label}</a></li>`;
    }).join('');

    const mobileLinksHtml = navLinks.map(l =>
      `<li><a href="${l.href}" class="nav__mobile-link">${isArabic ? l.labelAr : l.label}</a></li>`
    ).join('');

    const html = `
<nav class="nav" id="mainNav" role="navigation" aria-label="Main navigation">
  <div class="nav__inner">
    <button class="nav__burger" id="burgerBtn" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <a href="index.html" class="nav__logo" aria-label="Dar Hamad — Home">
      <img src="dar_hamad_logo.png" alt="Dar Hamad" class="nav__logo-img" />
    </a>
    <ul class="nav__links" role="list">${navLinksHtml}</ul>
    <div class="nav__actions">
      <button class="nav__lang" id="langToggle" aria-label="Switch to Arabic">عربي</button>
      <a href="order.html" class="btn btn--gold nav__order" id="navOrderBtn">Order Now</a>
    </div>
  </div>
  <!-- Mobile Menu -->
  <div class="nav__mobile" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
    <button class="nav__mobile-close" id="closeMenu" aria-label="Close menu">✕</button>
    <div class="nav__mobile-logo">
      <img src="dar_hamad_logo.png" alt="Dar Hamad" class="nav__mobile-logo-img" />
    </div>
    <ul class="nav__mobile-links" role="list">${mobileLinksHtml}</ul>
    <a href="order.html" class="btn btn--gold nav__mobile-order">Order Online</a>
    <div class="nav__mobile-socials">
      <a href="https://www.instagram.com/DarHamadKW" target="_blank" rel="noopener" aria-label="Instagram">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" stroke-width="1.5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </a>
      <a href="https://www.facebook.com/DarHamadKw" target="_blank" rel="noopener" aria-label="Facebook">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
      <a href="tel:+96522275555" aria-label="Call us">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="currentColor" stroke-width="1.5"/></svg>
      </a>
    </div>
  </div>
  <div class="nav__overlay" id="navOverlay"></div>
</nav>

<!-- Auth Modal (Sign In) -->
<div class="auth-modal" id="authModal" role="dialog" aria-modal="true" aria-labelledby="authTitle">
  <div class="auth-modal__overlay" id="authOverlay"></div>
  <div class="auth-modal__content">
    <button class="auth-modal__close" id="authClose" aria-label="Close modal">✕</button>
    <div class="auth-modal__header">
      <img src="dar_hamad_logo.png" alt="Dar Hamad" class="auth-modal__logo" />
      <h2 id="authTitle" class="auth-modal__title">Welcome Back</h2>
      <p class="auth-modal__desc">Enter your phone number to sign in or create an account.</p>
    </div>
    <form class="auth-modal__form" id="authForm" onsubmit="event.preventDefault(); alert('Authentication Backend (Zyda/Firebase) required for OTP delivery.\\n\\nFrontend flow complete.');">
      <div class="auth-input-group">
        <div class="auth-country-select">
          <img src="https://flagcdn.com/w20/kw.png" alt="Kuwait Flag" class="auth-flag" />
          <span>+965</span>
        </div>
        <input type="tel" id="authPhone" class="auth-input" placeholder="Phone Number" required pattern="[0-9]{8,12}" />
      </div>
      <button type="submit" class="btn btn--gold auth-btn">Continue</button>
    </form>
    <div class="auth-modal__footer">
      <p>By continuing, you agree to our <a href="https://www.orderdarhamad.com/en/terms-and-conditions" target="_blank">Terms</a> and <a href="https://www.orderdarhamad.com/en/privacy-policy" target="_blank">Privacy Policy</a>.</p>
    </div>
  </div>
</div>`;

    document.body.insertAdjacentHTML('afterbegin', html);
    initNav();
    initAuth();
  }

  /* ── Inject shared footer ── */
  function buildFooter() {
    const html = `
<footer class="footer" role="contentinfo">
  <div class="footer__pattern" aria-hidden="true"></div>
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <a href="index.html" class="footer__logo" aria-label="Dar Hamad home">
          <img src="dar_hamad_logo.png" alt="Dar Hamad" class="footer__logo-img" />
        </a>
        <p class="footer__tagline">Authentic Traditional Kuwaiti Restaurant<br>Arabian Gulf Street, Salmiya · Kuwait City</p>
        <p class="footer__desc">A landmark dining destination inspired by Kuwait's golden era of the 1960s–1980s. Serving traditional Kuwaiti cuisine with modern elegance since our founding.</p>
        <div class="footer__socials">
          <a href="https://www.instagram.com/DarHamadKW" target="_blank" rel="noopener" aria-label="Dar Hamad on Instagram" class="footer__social">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" stroke-width="1.5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </a>
          <a href="https://www.facebook.com/DarHamadKw" target="_blank" rel="noopener" aria-label="Dar Hamad on Facebook" class="footer__social">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="tel:+96522275555" aria-label="Call Dar Hamad" class="footer__social">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="currentColor" stroke-width="1.5"/></svg>
          </a>
        </div>
      </div>
      <div class="footer__links-group">
        <h3>Explore</h3>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="index.html#heritage">Our Story</a></li>
          <li><a href="index.html#experience">Dining Experience</a></li>
          <li><a href="menu.html">Full Menu</a></li>
          <li><a href="menu.html#breakfast">Breakfast Menu</a></li>
          <li><a href="menu.html#mains">Lunch &amp; Dinner</a></li>
        </ul>
      </div>
      <div class="footer__links-group">
        <h3>Visit Us</h3>
        <ul>
          <li><a href="branches.html">All Branches</a></li>
          <li><a href="branches.html#salmiya">Salmiya (Flagship)</a></li>
          <li><a href="branches.html#mall360">360 Mall</a></li>
          <li><a href="branches.html#abufatira">Abu Fatira</a></li>
        </ul>
      </div>
      <div class="footer__links-group">
        <h3>Order Online</h3>
        <ul>
          <li><a href="order.html">Order Now</a></li>
          <li><a href="https://www.orderdarhamad.com/en?mode=delivery" target="_blank" rel="noopener">Home Delivery</a></li>
          <li><a href="https://www.orderdarhamad.com/en?mode=pickup" target="_blank" rel="noopener">Store Pick-Up</a></li>
          <li><a href="https://www.orderdarhamad.com/en?mode=car_pickup" target="_blank" rel="noopener">Car Pick-Up</a></li>
          <li><a href="https://www.talabat.com/kuwait/restaurant/602682/dar-hamad-zahra" target="_blank" rel="noopener">Order on Talabat</a></li>
        </ul>
      </div>
      <div class="footer__links-group">
        <h3>Info</h3>
        <ul>
          <li><a href="tel:+96522275555">+965 2227 5555</a></li>
          <li><a href="mailto:info@darhamad.com">info@darhamad.com</a></li>
          <li><a href="https://www.orderdarhamad.com/en/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a></li>
          <li><a href="https://www.orderdarhamad.com/en/terms-and-conditions" target="_blank" rel="noopener">Terms &amp; Conditions</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>&copy; <span id="footerYear"></span> Dar Hamad Restaurant. All rights reserved. Kuwait.</p>
      <p class="footer__bottom-right">
        <span>Salmiya · 360 Mall · Abu Fatira</span>
        <span class="footer__dot" aria-hidden="true">◆</span>
        <a href="tel:+96522275555">+965 2227 5555</a>
      </p>
    </div>
  </div>
</footer>`;

    document.body.insertAdjacentHTML('beforeend', html);
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ── Nav Interactions ── */
  function initNav() {
    const nav = document.getElementById('mainNav');
    const burgerBtn = document.getElementById('burgerBtn');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const navOverlay = document.getElementById('navOverlay');
    const mobileLinks = document.querySelectorAll('.nav__mobile-link');
    const langToggle = document.getElementById('langToggle');

    /* Scroll effect */
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Active link tracking (for anchor links) */
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav__link');
    if (sections.length > 0) {
      const sectionObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinkEls.forEach(link => {
              const href = link.getAttribute('href');
              if (href && href.includes('#' + entry.target.id)) {
                navLinkEls.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
              }
            });
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      sections.forEach(s => sectionObs.observe(s));
    }

    /* Mobile open/close */
    const openMobileMenu = () => {
      mobileMenu.classList.add('open');
      navOverlay.classList.add('active');
      burgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const closeMobileMenu = () => {
      mobileMenu.classList.remove('open');
      navOverlay.classList.remove('active');
      burgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    if (burgerBtn) burgerBtn.addEventListener('click', openMobileMenu);
    if (closeMenu) closeMenu.addEventListener('click', closeMobileMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    /* ESC key */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobileMenu();
    });

    /* Language toggle → Arabic version of orderdarhamad.com */
    if (langToggle) {
      langToggle.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        if (typeof translatePage === 'function') {
          translatePage(newLang);
        }
      });
    }

    /* Smooth scroll for anchor links */
    document.querySelectorAll('a[href^="#"], a[href*=".html#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        const hashIndex = href.indexOf('#');
        if (hashIndex === -1) return;
        const targetId = href.slice(hashIndex + 1);
        const samePageAnchor = href.startsWith('#') || href.startsWith('index.html#') && (path === 'index.html' || path === '');
        if (samePageAnchor) {
          const target = document.getElementById(targetId);
          if (target) {
            e.preventDefault();
            const offset = nav ? nav.offsetHeight + 16 : 90;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
          }
        }
      });
    });
  }

  /* ── Auth Modal Logic ── */
  function initAuth() {
    const authModal = document.getElementById('authModal');
    const authOverlay = document.getElementById('authOverlay');
    const authClose = document.getElementById('authClose');
    
    // Change "Order Now" buttons in the nav to "Sign In"
    const navOrderBtn = document.getElementById('navOrderBtn');
    if (navOrderBtn) {
      navOrderBtn.textContent = 'Sign In';
      navOrderBtn.href = '#';
      navOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuth();
      });
    }

    const navMobileOrderBtn = document.querySelector('.nav__mobile-order');
    if (navMobileOrderBtn) {
      navMobileOrderBtn.textContent = 'Sign In';
      navMobileOrderBtn.href = '#';
      navMobileOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const mobileMenu = document.getElementById('mobileMenu');
        const navOverlay = document.getElementById('navOverlay');
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        openAuth();
      });
    }

    function openAuth() {
      authModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => document.getElementById('authPhone').focus(), 100);
    }

    function closeAuth() {
      authModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (authClose) authClose.addEventListener('click', closeAuth);
    if (authOverlay) authOverlay.addEventListener('click', closeAuth);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && authModal.classList.contains('active')) closeAuth();
    });
  }

  /* ── Scroll Reveal ── */
  function initReveal() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!revealEls.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          setTimeout(() => el.classList.add('visible'), parseFloat(delay) * 1000);
          obs.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.08 });
    revealEls.forEach(el => obs.observe(el));
  }

  /* ── Marquee pause on hover ── */
  function initMarquee() {
    const track = document.querySelector('.marquee__track');
    if (!track) return;
    const wrapper = track.parentElement;
    wrapper.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    wrapper.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  }

  /* ── Run on DOM ready ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    buildNav();
    buildFooter();
    initReveal();
    initMarquee();

    /* Inject i18n script */
    if (!document.querySelector('script[src="i18n.js"]')) {
      const script = document.createElement('script');
      script.src = 'i18n.js';
      document.body.appendChild(script);
    }

    /* Dev console branding */
    console.log(
      '%c 🍽️  Dar Hamad — Premium Kuwaiti Restaurant ',
      'background:#1a1208;color:#c8973a;font-size:13px;font-weight:bold;padding:8px 16px;border-radius:4px;'
    );
  }

})();

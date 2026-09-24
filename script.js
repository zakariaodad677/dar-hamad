/* ═══════════════════════════════════════════
   DAR HAMAD — JavaScript
═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Nav Scroll Effect ──────────────────────
  const nav = document.getElementById('mainNav');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Active Nav Link ───────────────────────
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  // ── Mobile Menu ───────────────────────────
  const burgerBtn = document.getElementById('burgerBtn');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const navOverlay = document.getElementById('navOverlay');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenuFn() {
    mobileMenu.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
  if (closeMenu) closeMenu.addEventListener('click', closeMenuFn);
  if (navOverlay) navOverlay.addEventListener('click', closeMenuFn);
  mobileLinks.forEach((link) => link.addEventListener('click', closeMenuFn));

  // ── Menu Tabs ─────────────────────────────
  const tabs = document.querySelectorAll('.menu-tab');
  const tabPanels = document.querySelectorAll('[id^="tab-"]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      tabPanels.forEach((panel) => {
        if (panel.id === 'tab-' + target) {
          panel.classList.remove('hidden');
          panel.style.opacity = '0';
          panel.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            panel.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
          });
        } else {
          panel.classList.add('hidden');
          panel.style.transition = '';
        }
      });
    });
  });

  // ── Scroll Reveal ─────────────────────────
  function addRevealClasses() {
    // Heritage
    const heritageVisual = document.querySelector('.heritage__visual');
    const heritageContent = document.querySelector('.heritage__content');
    if (heritageVisual) heritageVisual.classList.add('reveal-left');
    if (heritageContent) heritageContent.classList.add('reveal-right');

    // Section headers
    document.querySelectorAll('.section-header').forEach((el) => {
      el.classList.add('reveal');
    });

    // Menu cards
    document.querySelectorAll('.menu-card, .menu-list-item').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.06}s`;
    });

    // Experience
    document.querySelectorAll('.experience__card, .experience__feature-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });

    // Order modes
    document.querySelectorAll('.order-mode-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.1}s`;
    });

    // Branches
    document.querySelectorAll('.branch-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.1}s`;
    });

    // Contact
    const contactContent = document.querySelector('.contact__content');
    const contactMap = document.querySelector('.contact__map');
    if (contactContent) contactContent.classList.add('reveal-left');
    if (contactMap) contactMap.classList.add('reveal-right');
  }

  addRevealClasses();

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
    revealObserver.observe(el);
  });

  // ── Smooth Anchor Scroll ──────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 76;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Marquee Pause on Hover ─────────────────
  const marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack) {
    const marquee = marqueeTrack.parentElement;
    marquee.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  // ── Parallax Hero ─────────────────────────
  const heroImg = document.querySelector('.hero__img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroImg.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ── Language Toggle (placeholder) ─────────
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      window.location.href = 'https://www.orderdarhamad.com/ar';
    });
  }

  console.log(
    '%c Dar Hamad 🍽️ — Premium Kuwaiti Restaurant ',
    'background: #1a1208; color: #c8973a; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 4px;'
  );
})();

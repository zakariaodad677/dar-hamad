/* ═══════════════════════════════════════════════════
   MENU.JS — Menu page interactions
═══════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ── Kuwait Time Banner ── */
  function updateTimeBanner(){
    const banner = document.getElementById('timeBanner');
    const bannerText = document.getElementById('timeBannerText');
    if(!banner || !bannerText) return;

    // Kuwait is UTC+3
    const now = new Date();
    const kuwaitHours = (now.getUTCHours() + 3) % 24;
    const kuwaitMinutes = now.getUTCMinutes();
    const totalMins = kuwaitHours * 60 + kuwaitMinutes;

    const breakfastStart = 8 * 60;        // 8:00
    const breakfastEnd   = 12 * 60 + 30;  // 12:30
    const mainsStart     = 13 * 60;       // 1:00 PM
    const close          = 23 * 60;       // 11:00 PM

    banner.classList.remove('time-banner--breakfast','time-banner--mains','time-banner--closed');

    if(totalMins >= breakfastStart && totalMins < breakfastEnd){
      banner.classList.add('time-banner--breakfast');
      bannerText.textContent = '🌅 Breakfast menu is active now (8:00 AM – 12:30 PM Kuwait time). Main courses available from 1:00 PM.';
    } else if(totalMins >= breakfastEnd && totalMins < mainsStart){
      bannerText.textContent = '⏳ Breakfast has ended. Main courses begin at 1:00 PM Kuwait time.';
    } else if(totalMins >= mainsStart && totalMins < close){
      banner.classList.add('time-banner--mains');
      bannerText.textContent = '🍽️ Full menu active now (1:00 PM – 11:00 PM Kuwait time). Breakfast items are not available.';
    } else {
      banner.classList.add('time-banner--closed');
      bannerText.textContent = '🌙 Kitchen is currently closed. We open daily at 8:00 AM Kuwait time.';
    }
  }
  updateTimeBanner();
  setInterval(updateTimeBanner, 60000);

  /* ── Category Tab Scrolling ── */
  const catTabs = document.querySelectorAll('.cat-tab');
  const sections = document.querySelectorAll('.menu-section');
  const nav = document.getElementById('mainNav');
  const catBar = document.getElementById('catBar');
  const timeBanner = document.getElementById('timeBanner');

  function getOffset(){
    const navH = nav ? nav.offsetHeight : 76;
    const bannerH = timeBanner ? timeBanner.offsetHeight : 48;
    const barH = catBar ? catBar.offsetHeight : 50;
    return navH + bannerH + barH + 20;
  }

  catTabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      const targetId = tab.dataset.target;
      const target = document.getElementById(targetId);
      if(target){
        const top = target.getBoundingClientRect().top + window.scrollY - getOffset();
        window.scrollTo({top, behavior:'smooth'});
      }
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ── Active tab on scroll ── */
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.dataset.section;
        catTabs.forEach(t => {
          t.classList.toggle('active', t.dataset.target === id);
        });
        // scroll active tab into view in cat bar
        const activeTab = document.querySelector(`.cat-tab[data-target="${id}"]`);
        if(activeTab && catBar){
          const barRect = catBar.getBoundingClientRect();
          const tabRect = activeTab.getBoundingClientRect();
          if(tabRect.left < barRect.left || tabRect.right > barRect.right){
            activeTab.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
          }
        }
      }
    });
  },{rootMargin:`-${getOffset()}px 0px -40% 0px`,threshold:0});

  sections.forEach(s => sectionObserver.observe(s));

  /* ── Search / Filter ── */
  const searchInput = document.getElementById('menuSearch');
  const searchClear = document.getElementById('menuSearchClear');
  const allCards = document.querySelectorAll('.dish-card');
  const allSections = document.querySelectorAll('.menu-section');
  const allDividers = document.querySelectorAll('.menu-divider');
  const noResults = document.getElementById('noResults');
  const resultsInfo = document.getElementById('searchResults');
  const clearSearchBtn = document.getElementById('clearSearch');

  function filterMenu(query){
    const q = query.trim().toLowerCase();
    searchClear.style.display = q ? 'block' : 'none';
    resultsInfo.classList.toggle('hidden', !q);

    if(!q){
      allCards.forEach(c => c.style.display = '');
      allSections.forEach(s => s.style.display = '');
      allDividers.forEach(d => d.style.display = '');
      noResults.classList.add('hidden');
      return;
    }

    let total = 0;
    allSections.forEach(section => {
      const cards = section.querySelectorAll('.dish-card');
      let visible = 0;
      cards.forEach(card => {
        const name = (card.dataset.name || '').toLowerCase();
        const desc = card.querySelector('.dish-card__desc')?.textContent.toLowerCase() || '';
        const match = name.includes(q) || desc.includes(q);
        card.style.display = match ? '' : 'none';
        if(match) visible++;
      });
      section.style.display = visible ? '' : 'none';
      total += visible;
    });

    allDividers.forEach(d => d.style.display = 'none');
    noResults.classList.toggle('hidden', total > 0);
    resultsInfo.textContent = `${total} dish${total !== 1 ? 'es' : ''} matching "${query}"`;
  }

  if(searchInput){
    searchInput.addEventListener('input', e => filterMenu(e.target.value));
    searchInput.addEventListener('keydown', e => { if(e.key === 'Escape') clearFilter(); });
  }

  function clearFilter(){
    if(searchInput) searchInput.value = '';
    filterMenu('');
  }

  if(searchClear) searchClear.addEventListener('click', clearFilter);
  if(clearSearchBtn) clearSearchBtn.addEventListener('click', clearFilter);

  console.log('[Menu] Dar Hamad menu page loaded.');
})();

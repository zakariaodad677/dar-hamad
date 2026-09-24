const fs = require('fs');

const menuData = {
  breakfast: [
    { en: 'Balaleet', ar: '??????', price: '1.950 KD', desc: 'Sweet vermicelli noodles with saffron, cardamom, and omelet.', img: 'balaleet_dish.jpg' },
    { en: 'Kuwaiti Mahalabia', ar: '?????? ??????', price: '2.000 KD', desc: 'Traditional chilled milk pudding.', img: '' },
    { en: 'Girs Aqeeli', ar: '??? ?????', price: '2.950 KD', desc: 'Saffron and cinnamon traditional cake.', img: '' },
    { en: 'Date Pudding', ar: '?????? ?????', price: '4.500 KD', desc: 'Sticky date pudding with caramel.', img: '' },
    { en: 'Chicken Shawarma', ar: '?????? ????', price: '3.500 KD', desc: 'Traditional chicken shawarma.', img: '' },
    { en: 'Prawn Hamsa', ar: '???? ?????', price: '4.900 KD', desc: 'Spiced prawn hamsa.', img: '' },
    { en: 'Breakfast Meal Box', ar: '????? ??????', price: '6.500 KD', desc: 'Includes Foul, Falafel, Balaleet, Honey, etc.', img: '' }
  ],
  salads: [
    { en: 'Garden Salad', ar: '???? ???????', price: '6.000 KD', desc: 'Crisp seasonal greens, tomatoes, cucumber, and herbs.', img: '' },
    { en: 'Dar Hamad Salad', ar: '???? ??? ???', price: '10.000 KD', desc: 'Signature salad with crispy matai, vegetables, mango.', img: '' },
    { en: 'Traditional Soup', ar: '????? ???????', price: '6.950 KD', desc: 'Rich homestyle traditional soup.', img: '' },
    { en: 'Ebraq', ar: '?????', price: 'Price varies', desc: 'Vine leaves stuffed with rice/meat.', img: 'ebraq_dish_new.jpg' },
    { en: 'Dill Kibbeh', ar: '??? ????', price: '3.750 KD', desc: 'By the dozen.', img: '' }
  ],
  mains: [
    { en: 'Chicken Machboos', ar: '????? ????', price: '4.950 KD', desc: 'Traditional chicken with spiced rice.', img: '' },
    { en: 'Meat Machboos', ar: '????? ???', price: '6.450 KD', desc: 'Tender lamb with saffron rice.', img: 'machbous_lamb.jpg' },
    { en: 'Murabyan', ar: '?????', price: '7.000 KD', desc: 'Shrimp rice dish.', img: 'murabyan_dish_new.jpg' },
    { en: 'Chicken Biryani', ar: '?????? ????', price: '5.950 KD', desc: 'Classic chicken biryani.', img: '' },
    { en: 'Mashwi Jidr', ar: '???? ???', price: '7.950 KD', desc: 'Jidr-roasted lamb on spiced rice.', img: '' },
    { en: 'Margouga', ar: '??????', price: 'Price varies', desc: 'Slow-cooked lamb stew.', img: 'margouga_dish_new.jpg' },
    { en: 'Gaboot', ar: '????', price: 'Price varies', desc: 'Stuffed dumplings in broth.', img: 'gaboot_dish_new.jpg' }
  ]
};

function buildCard(item) {
  let imgHtml = '';
  if (item.img) {
    imgHtml = <div class="dish-card__img"><img src="" alt="" loading="lazy"/></div>;
  } else {
    imgHtml = <div class="dish-card__img dish-card__img--placeholder"><div class="dish-card__icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 22V12M12 12C12 12 8 10 5 6c4 0 7 2 7 6zM12 12c0 0 4-2 7-6-4 0-7 2-7 6z" stroke="currentColor" stroke-width="1.5"/></svg></div></div>;
  }

  return 
        <article class="dish-card" data-name=" ">
          
          <div class="dish-card__body">
            <div class="dish-card__top">
              <div>
                <h3 class="dish-card__name" data-i18n=""></h3>
                <span class="dish-card__name-ar ar-text" lang="ar"></span>
              </div>
              <span class="dish-card__price" data-i18n=""></span>
            </div>
            <p class="dish-card__desc" data-i18n=""></p>
            <div class="dish-card__footer">
              <button class="btn btn--gold dish-card__btn" onclick="document.getElementById('authModal').classList.add('active')" data-i18n="Order">Order</button>
            </div>
          </div>
        </article>;
}

let menuHtml = fs.readFileSync('menu.html', 'utf8');

// Replace breakfast section
let bfastHtml = '<div class="dish-grid">\n' + menuData.breakfast.map(buildCard).join('\n') + '\n      </div>';
menuHtml = menuHtml.replace(/<div class="dish-grid">[\s\S]*?<\/div>\s*<\/section>\s*<div class="menu-divider"/, bfastHtml + '\n    </section>\n\n    <div class="menu-divider"');

// Wait, the regex might fail if there are multiple. Let's do string replacement for the whole file.

let output = 
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=5"/>
  <title data-i18n="Menu — Dar Hamad">Menu — Dar Hamad</title>
  <link rel="stylesheet" href="shared.css"/>
  <link rel="stylesheet" href="menu.css"/>
</head>
<body>
<!-- PAGE HERO -->
<div class="page-hero">
  <div class="page-hero__pattern" aria-hidden="true"></div>
  <div class="container page-hero__content">
    <p class="page-hero__breadcrumb"><a href="index.html" data-i18n="Home">Home</a> / <span data-i18n="Menu">Menu</span></p>
    <h1 data-i18n="Our Menu">Our Menu</h1>
    <span class="page-hero__ar ar-text" lang="ar">???????</span>
  </div>
</div>

<main class="menu-content">
  <div class="container">
    <section id="breakfast" class="menu-section">
      <div class="menu-section-header">
        <h2 class="menu-section-title" data-i18n="Breakfast Menu">Breakfast Menu</h2>
        <p class="menu-section-title__ar ar-text" lang="ar">????? ??????</p>
      </div>
      <div class="dish-grid">
        
      </div>
    </section>

    <div class="menu-divider"><span>?</span></div>

    <section id="salads" class="menu-section">
      <div class="menu-section-header">
        <h2 class="menu-section-title" data-i18n="Salads & Appetizers">Salads & Appetizers</h2>
        <p class="menu-section-title__ar ar-text" lang="ar">??????? ?????????</p>
      </div>
      <div class="dish-grid">
        
      </div>
    </section>

    <div class="menu-divider"><span>?</span></div>

    <section id="mains" class="menu-section">
      <div class="menu-section-header">
        <h2 class="menu-section-title" data-i18n="Main Courses">Main Courses</h2>
        <p class="menu-section-title__ar ar-text" lang="ar">??????? ????????</p>
      </div>
      <div class="dish-grid">
        
      </div>
    </section>
  </div>
</main>
<script src="components.js"></script>
<script src="i18n.js"></script>
</body>
</html>
;

fs.writeFileSync('menu.html', output);

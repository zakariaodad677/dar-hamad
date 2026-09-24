document.addEventListener('DOMContentLoaded', () => {
  // Parallax effect for hero image
  const heroImg = document.querySelector('.hero__img');
  
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (scrollPos < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrollPos * 0.4}px) scale(1)`;
      }
    });
  }

  // Scroll Reveal System
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});

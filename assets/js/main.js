const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '0px 0px 200px 0px'
  });

  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
} else {
  lazyImages.forEach((img) => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
}

const yearTarget = document.querySelector('[data-year]');
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector('#career-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    const phoneField = contactForm.querySelector('input[name="telefon"]');
    if (phoneField && phoneField.value.trim().length < 5) {
      event.preventDefault();
      phoneField.focus();
      alert('Bitte geben Sie eine gültige Telefonnummer ein.');
    }
  });
}

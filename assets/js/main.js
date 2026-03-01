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

const testimonialForm = document.querySelector('#testimonial-form');
const testimonialList = document.querySelector('#testimonial-list');

if (testimonialForm && testimonialList) {
  testimonialForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameField = testimonialForm.querySelector('input[name="name"]');
    const reviewField = testimonialForm.querySelector('textarea[name="review"]');
    if (!nameField || !reviewField) {
      return;
    }

    const name = nameField.value.trim();
    const review = reviewField.value.trim();

    if (!name || !review) {
      return;
    }

    const emptyState = testimonialList.querySelector('.testimonial-empty');
    if (emptyState) {
      emptyState.remove();
    }

    const card = document.createElement('article');
    card.className = 'card';

    const quote = document.createElement('blockquote');
    quote.textContent = `"${review}"`;

    const author = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = name;
    author.appendChild(strong);

    card.appendChild(quote);
    card.appendChild(author);
    testimonialList.prepend(card);

    testimonialForm.reset();
    nameField.focus();
  });
}

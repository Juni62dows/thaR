/* Thalina — Site Scripts */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky header shadow
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Catalog tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (tabBtns.length && productCards.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        productCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // Product details toggle
  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      if (details && details.classList.contains('product-details')) {
        const isOpen = details.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        btn.querySelector('.label').textContent = isOpen ? 'Скрыть' : 'Подробнее';
      }
    });
  });

  // Fade-up animations
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // Contact form (mailto fallback)
  const form = document.getElementById('coop-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const company = form.querySelector('[name="company"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const direction = form.querySelector('[name="direction"]').value;
      const message = form.querySelector('[name="message"]').value.trim();

      const subject = encodeURIComponent(`Запрос на сотрудничество: ${direction} — ${company || name}`);
      const body = encodeURIComponent(
        `Имя: ${name}\nКомпания: ${company}\nEmail: ${email}\nТелефон: ${phone}\nНаправление: ${direction}\n\nСообщение:\n${message}`
      );

      window.location.href = `mailto:corporate@thalina.ru?subject=${subject}&body=${body}`;
    });
  }
});

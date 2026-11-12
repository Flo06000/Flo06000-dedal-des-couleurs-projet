/* effet au défilement : apparition des blocs */
(function () {
  var root = document.documentElement;
  if (!('IntersectionObserver' in window) ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    return;
  }
  root.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    /* les blocs apparaissent quand on arrive dessus */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) { io.observe(el); });
  });
})();


(function initNavigationHelpers() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const promoBanner = document.getElementById('promo-banner');

  if (promoBanner) {
    const closeBtn = promoBanner.querySelector('.banner-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        promoBanner.style.display = 'none';
      });
    }
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar && docHeight > 0) {
      const percent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      progressBar.style.width = percent + '%';
    }
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

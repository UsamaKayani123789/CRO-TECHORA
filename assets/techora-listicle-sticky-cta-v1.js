(function () {
  'use strict';

  function initStickyCta(bar) {
    bar.setAttribute('data-techora-sticky-cta-initialized', '');
    var offset = parseInt(bar.getAttribute('data-techora-sticky-cta-offset') || '0', 10) || 0;
    var ticking = false;

    function update() {
      ticking = false;
      var scrolled = window.scrollY || window.pageYOffset || 0;
      bar.classList.toggle('techora-listicle-v1__offer-sticky-cta--visible', scrolled >= offset);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initStickyCtas(root) {
    var bars = root.querySelectorAll('[data-techora-sticky-cta]:not([data-techora-sticky-cta-initialized])');
    bars.forEach(initStickyCta);
  }

  initStickyCtas(document);

  document.addEventListener('shopify:section:load', function (event) {
    initStickyCtas(event.target);
  });
})();

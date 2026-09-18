(function () {
  'use strict';

  var countdowns = document.querySelectorAll('[data-techora-countdown]:not([data-techora-countdown-initialized])');

  if (!countdowns.length) {
    return;
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  countdowns.forEach(function (countdown) {
    countdown.setAttribute('data-techora-countdown-initialized', '');
    var end = Date.parse(countdown.getAttribute('data-techora-countdown-end') || '');
    var clock = countdown.querySelector('.techora-listicle-v1__announcement-countdown-clock');
    var expired = countdown.querySelector('[data-techora-countdown-expired]');
    var expiredMessage = countdown.getAttribute('data-techora-countdown-expired-message') || '';
    var hours = countdown.querySelector('[data-techora-countdown-hours]');
    var minutes = countdown.querySelector('[data-techora-countdown-minutes]');
    var seconds = countdown.querySelector('[data-techora-countdown-seconds]');
    var interval;

    function render() {
      var remaining = Math.max(0, end - Date.now());
      var totalSeconds = Math.floor(remaining / 1000);
      var isExpired = !Number.isFinite(end) || totalSeconds <= 0;

      if (isExpired) {
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';

        if (expiredMessage) {
          expired.textContent = expiredMessage;
          expired.hidden = false;
        } else {
          countdown.hidden = true;
        }

        if (interval) {
          window.clearInterval(interval);
        }
        return;
      }

      hours.textContent = pad(Math.floor(totalSeconds / 3600));
      minutes.textContent = pad(Math.floor(totalSeconds / 60) % 60);
      seconds.textContent = pad(totalSeconds % 60);
    }

    render();

    if (Number.isFinite(end) && end > Date.now()) {
      interval = window.setInterval(render, 1000);
    }
  });
})();

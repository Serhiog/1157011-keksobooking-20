'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (cb) {
    var cardClose = document.querySelector('.popup__close');
    if (cardClose) {
      cardClose.removeEventListener('click', window.cardClose.byClick);
      document.removeEventListener('keydown', window.cardClose.byKeyDown);
    }
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();

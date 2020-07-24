'use strict';

(function () {

  var cardClose = window.renderCard.card.querySelector('.popup__close');
  cardClose.addEventListener('click', function (evt) {
    Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (elem) {
      elem.classList.remove('map__pin--active');
    });
    evt.preventDefault();
    window.renderCard.card.classList.add('hidden');
    window.renderCard.card.style.display = 'none';
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });
      evt.preventDefault();
      window.renderCard.card.classList.add('hidden');
      window.renderCard.card.style.display = 'none';
      window.renderPins.mapPins.forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });
    }
  });
})();

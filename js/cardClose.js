'use strict';

(function () {

  var toCloseCardByClick = function (evt) {
    Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (elem) {
      elem.classList.remove('map__pin--active');
    });
    evt.preventDefault();
    window.renderCard.card.classList.add('hidden');
    window.renderCard.card.style.display = 'none';
    var cardClose = document.querySelector('.popup__close');
    cardClose.removeEventListener('click', window.cardClose.byClick);
    document.removeEventListener('keydown', window.cardClose.byKeyDown);
  };

  var toCloseCardByKeyDown = function (evt) {
    if (evt.key === 'Escape') {
      Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });
      evt.preventDefault();
      window.renderCard.card.classList.add('hidden');
      window.renderCard.card.style.display = 'none';
      window.renderPins.mapAds.forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });
    }
    var cardClose = document.querySelector('.popup__close');
    if (cardClose) {
      cardClose.removeEventListener('click', window.cardClose.byClick);
      document.removeEventListener('keydown', window.cardClose.byKeyDown);
    }

  };

  window.cardClose = {
    byClick: toCloseCardByClick,
    byKeyDown: toCloseCardByKeyDown,
  };
})();

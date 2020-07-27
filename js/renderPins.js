'use strict';

(function () {

  window.renderPins = {

    mapAds: document.querySelectorAll('.map__pin:not(.map__pin--main)'),

    onSucces: function (actualPins) {

      Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (elem) {
        elem.remove();
      });
      var mapAds = document.querySelector('.map__pins');
      var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
      var fragment = new DocumentFragment();

      for (var i = 0; i < actualPins.slice(0, 5).length; i++) {
        var clonePin = pinElement.cloneNode(true);
        clonePin.style.left = actualPins[i].location.x - window.mainPin.PIN_WIDTH / 2 + 'px';
        clonePin.style.top = actualPins[i].location.y - window.mainPin.PIN_HEIGHT + 'px';
        clonePin.querySelector('img').src = actualPins[i].author.avatar;
        clonePin.querySelector('img').alt = actualPins[i].offer.title;

        fragment.appendChild(clonePin);
      }

      mapAds.appendChild(fragment);

      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      pins.forEach(function (elem) {
        elem.addEventListener('click', function (evt) {
          evt.preventDefault();
          window.renderPins.markPinAsUnctive();
          elem.classList.add('map__pin--active');
          var indexPin = [].slice.call(pins).indexOf(elem);
          window.renderCard.showAd((actualPins[indexPin]));
        });
      });
    },


    markPinAsUnctive: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (pin) {
        pin.classList.remove('map__pin--active');
      });
    },

    onError: function (errortext) {
      var errorMessage = document.querySelector('#error').content.querySelector('.error');
      var closeErrorBtn = errorMessage.querySelector('.error__button');
      var cloneMessage = errorMessage.cloneNode(true);
      document.querySelector('main').appendChild(cloneMessage);
      var errorMessageCloned = document.querySelector('.error__message');
      errorMessageCloned.textContent = errortext + 'Ошибка загрузки объявлений :-(';
      cloneMessage.addEventListener('click', function () {
        cloneMessage.classList.add('hidden');
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
          cloneMessage.classList.add('hidden');
        }
      });

      closeErrorBtn.addEventListener('click', function () {
        cloneMessage.classList.add('hidden');
      });
    }
  };
}
)();

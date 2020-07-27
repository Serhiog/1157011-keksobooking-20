'use strict';

(function () {

  window.mainPin = {
    map: document.querySelector('.map'),
    PIN_HEIGHT: 87,
    PIN_WIDTH: 64,
    address: document.querySelector('#address'),
    adsLocation: document.querySelector('.map__pin--main')
  };

  var adsLocation = window.mainPin.map.querySelector('.map__pin--main');

  adsLocation.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.active.initializationPage();
    }
  });
})();

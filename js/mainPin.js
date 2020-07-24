'use strict';

(function () {

  window.mainPin = {
    map: document.querySelector('.map'),
    PINHEIGHT: 87,
    PINWIDTH: 64,
    address: document.querySelector('#address'),
    pinMap: document.querySelector('.map__pin--main')
  };

  var pinMap = window.mainPin.map.querySelector('.map__pin--main');

  pinMap.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.active.activePage();
    }
  });

  pinMap.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.active.activePage();
    }
  });
})();

'use strict';

(function () {

  window.mainPin = {
    map: document.querySelector('.map'),
    PINHEIGHT: 50,
    PINWIDTH: 70,
    address: document.querySelector('#address'),
    pinMap: document.querySelector('.map__pin--main')
  };

  var pinMap = window.mainPin.map.querySelector('.map__pin--main');
  var pinX = parseInt(pinMap.style.left);
  var pinY = parseInt(pinMap.style.top);

  pinMap.addEventListener('click', function (evt) {
    if (evt.button === 0) {
      window.active.activePage();
    };
  });

  pinMap.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.active.activePage();
    };
  });
})();

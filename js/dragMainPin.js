'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;
  var MAP_OFFSET_LEFT = 0 - Math.floor(MAIN_PIN_WIDTH / 2);
  var MAP_OFFSET_RIGHT = 1200 - Math.floor(MAIN_PIN_WIDTH / 2);
  var MAP_OFFSET_TOP = 130 - MAIN_PIN_HEIGHT;
  var MAP_OFFSET_BOTTOM = 630 - MAIN_PIN_HEIGHT;
  var mainPinElement = document.querySelector('.map__pin--main');

  window.mainPin.address.value = Math.round(window.mainPin.adsLocation.offsetLeft + (window.mainPin.PIN_WIDTH / 2)) + ',' + Math.round(window.mainPin.adsLocation.offsetTop + window.mainPin.PIN_HEIGHT);

  window.mainPin.adsLocation.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      window.active.initializationPage();
      var card = document.querySelector('.map__card');
      if (card) {
        card.remove();
      }
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPinElement.offsetLeft - shift.x >= MAP_OFFSET_LEFT && mainPinElement.offsetLeft - shift.x <= MAP_OFFSET_RIGHT) {
        mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';
      }

      if (mainPinElement.offsetTop - shift.y >= MAP_OFFSET_TOP && mainPinElement.offsetTop - shift.y <= MAP_OFFSET_BOTTOM) {
        mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
      }

      window.mainPin.address.value = Math.floor(mainPinElement.offsetLeft + MAIN_PIN_WIDTH / 2) + ',' + (mainPinElement.offsetTop);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();


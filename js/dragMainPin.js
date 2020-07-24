'use strict';

(function () {
  window.mainPin.address.value = Math.round(window.mainPin.pinMap.offsetLeft + (window.mainPin.PINWIDTH / 2)) + ',' + Math.round(window.mainPin.pinMap.offsetTop + window.mainPin.PINHEIGHT);
  var mapPinWidth = window.renderPins.mapPins.offsetWidth;
  var mapPinHeight = window.renderPins.mapPins.offsetHeight;
  window.mainPin.pinMap.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    var moveMainPin = function (evtMove) {
      evtMove.preventDefault();
      var shift = {
        x: startPosition.x - evtMove.clientX,
        y: startPosition.y - evtMove.clientY,
      }

      startPosition = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      window.mainPin.pinMap.style.left = (window.mainPin.pinMap.offsetLeft - shift.x) + 'px';
      window.mainPin.pinMap.style.top = (window.mainPin.pinMap.offsetTop - shift.y) + 'px';


      window.dragMainPin = {
        left: window.mainPin.pinMap.offsetLeft - shift.x,
        top: window.mainPin.pinMap.offsetTop - shift.y
      }

      window.mainPin.address.value = Math.round(window.dragMainPin.left + (window.mainPin.PINWIDTH / 2)) + ',' + Math.round(window.dragMainPin.top + 88);

      if (window.dragMainPin.left > (window.renderPins.mapPins.offsetWidth - window.mainPin.PINWIDTH / 2) || window.dragMainPin.left < (mapPinWidth - (mapPinWidth + window.mainPin.PINWIDTH / 2))
        || window.dragMainPin.top < 130 || window.dragMainPin.top > 540
      ) {
        document.removeEventListener('mousemove', moveMainPin);
        document.removeEventListener('mouseup', moveMainPin);

      }
    };


    var upMainPin = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', moveMainPin);
      document.removeEventListener('mouseup', moveMainPin);
    };


    document.addEventListener('mousemove', moveMainPin);
    document.addEventListener('mouseup', upMainPin);

  })
})();


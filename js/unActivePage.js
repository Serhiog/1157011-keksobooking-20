'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var START_MAIN_PIN_X = 570 + 'px';
  var START_MAIN_PIN_Y = 375 + 'px';


  window.unActivePage = {

    deactivationState: function () {
      window.mainPin.map.classList.add('map--faded');
      window.validateForms.turnOfControls();
      form.classList.add('ad-form--disabled');
      form.reset();
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (pin) {
        pin.remove();
      });
      mainPin.style.top = START_MAIN_PIN_Y;
      mainPin.style.left = START_MAIN_PIN_X;
      window.validateForms.type.removeEventListener('change', window.validateForms.activeForm);
    }

  };
  window.unActivePage.deactivationState();
})();

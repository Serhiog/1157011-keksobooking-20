'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formFilterAd = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');
  var START_MAIN_PIN_X = 570 + 'px';
  var START_MAIN_PIN_Y = 375 + 'px';


  window.unActivePage = {

    deactivationState: function () {
      var card = document.querySelector('.map__card');
      if (card) {
        card.remove();
      }
      window.mainPin.map.classList.add('map--faded');
      window.validateForms.turnOfControls();
      form.classList.add('ad-form--disabled');
      form.reset();
      formFilterAd.reset();
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (pin) {
        pin.remove();
      });
      mainPin.style.top = START_MAIN_PIN_Y;
      mainPin.style.left = START_MAIN_PIN_X;
      window.validateForms.type.removeEventListener('change', window.validateForms.activeForm);
      window.validateForms.clearBtn.removeEventListener('click', window.validateForms.toClearButton);
      window.validateForms.form.removeEventListener('submit', window.validateForms.sendForm);

      window.filter.housingFeatures.forEach(function (checkbox) {
        checkbox.removeEventListener('change', window.debounce(window.filter.renderFiltredPins));
      });
      window.filter.housingType.removeEventListener('change', window.debounce(window.filter.renderFiltredPins));
      window.filter.housingPrice.removeEventListener('change', window.debounce(window.filter.renderFiltredPins));
      window.filter.housingRooms.removeEventListener('change', window.debounce(window.filter.renderFiltredPins));
      window.filter.housingGuests.removeEventListener('change', window.debounce(window.filter.renderFiltredPins));
    }

  };
  window.unActivePage.deactivationState();
})();

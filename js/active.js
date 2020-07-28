'use strict';

(function () {


  window.active = {
    initializationPage: function () {

      window.mainPin.map.classList.remove('map--faded');
      window.backend.load(window.renderPins.onSucces, window.renderPins.onError);

      window.validateForms.type.addEventListener('change', window.validateForms.activeForm);

      window.validateForms.turnOnControls();
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');

      window.validateForms.numberOfRooms.addEventListener('change', window.validateForms.checkNumberCapacityOfGuests);
      window.validateForms.numberOfGuests.addEventListener('change', window.validateForms.checkNumberCapacityOfGuests);
      window.validateForms.checkNumberCapacityOfGuests();

      window.filter.housingFeatures.forEach(function (checkbox) {
        checkbox.addEventListener('change', window.debounce(window.filter.renderFiltredPins));
      });

      window.filter.housingType.addEventListener('change', window.debounce(window.filter.renderFiltredPins));
      window.filter.housingPrice.addEventListener('change', window.debounce(window.filter.renderFiltredPins));
      window.filter.housingRooms.addEventListener('change', window.debounce(window.filter.renderFiltredPins));
      window.filter.housingGuests.addEventListener('change', window.debounce(window.filter.renderFiltredPins));

      window.validateForms.clearBtn.addEventListener('click', window.validateForms.toClearButton);
      window.validateForms.form.addEventListener('submit', window.validateForms.sendForm);
    }
  };


})();

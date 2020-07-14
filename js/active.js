'use strict';

(function () {

  window.active = {
    activePage: function () {

      window.mainPin.map.classList.remove('map--faded');
      window.backend.get(window.renderPins.onSucces, window.renderPins.onError);

      window.validateForms.turnOnControls();
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.validateForms.activeForm();

      window.validateForms.numberOfRooms.addEventListener('change', window.validateForms.capacityCheck);
      window.validateForms.numberOfGuests.addEventListener('change', window.validateForms.capacityCheck);
      window.validateForms.capacityCheck();

    }
  };
})();

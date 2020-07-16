'use strict';

(function () {


  var checkGet = false
  window.active = {
    activePage: function () {

      window.mainPin.map.classList.remove('map--faded');

      checkGet ? console.log() : window.backend.load(window.filterPins.toFilterPins);
      checkGet = true

      window.validateForms.turnOnControls();
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.validateForms.activeForm();

      window.validateForms.numberOfRooms.addEventListener('change', window.validateForms.capacityCheck);
      window.validateForms.numberOfGuests.addEventListener('change', window.validateForms.capacityCheck);
      window.validateForms.capacityCheck();
    }
  };
})();

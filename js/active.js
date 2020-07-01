'use strict';

(function () {

  var isActive = false;

  window.active = {
    activePage: function () {
      window.mainPin.map.classList.remove('map--faded');
      if (!isActive) {
        window.renderPins.renderPins();
        isActive = true;
      }
      window.validateForms.turnOnControls();
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.validateForms.activeForm();
      window.validateForms.numberOfRooms.addEventListener('change', window.validateForms.capacityCheck);
      window.validateForms.numberOfGuests.addEventListener('change', window.validateForms.capacityCheck);
      window.validateForms.capacityCheck();

      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)')
      pins.forEach(element => {
        element.addEventListener('click', function () {
          var indexPin = [].slice.call(pins).indexOf(element);
          window.renderCard.renderCard(window.renderPins.createAds()[indexPin]);
        });
      });
    }
  };
})();

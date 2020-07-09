'use strict';

(function () {
  var form = document.querySelector('.ad-form')
  var mainPin = document.querySelector('.map__pin--main')
  var STARTMAINPINX = 570 + 'px';
  var STARTMAINPINY = 375 + 'px';
  var card = document.querySelector('#card').content.querySelector('.map__card');

  window.unActivePage = {

    unActivePage: function () {
      window.mainPin.map.classList.add('map--faded');
      window.validateForms.turnOfControls();
      form.classList.add('ad-form--disabled')
      form.reset()
      card.style.display = 'none'
      
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)')
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove()
      }

      mainPin.style.top = STARTMAINPINY
      mainPin.style.left = STARTMAINPINX
    }
  };
  window.unActivePage.unActivePage();
})();

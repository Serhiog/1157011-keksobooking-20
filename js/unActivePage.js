'use strict';

(function () {

  var unActivePage = function () {
    window.mainPin.map.classList.add('map--faded');
    window.validateForms.turnOfControls();
  };

  unActivePage()

})();

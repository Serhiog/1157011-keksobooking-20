'use strict';

(function () {
  var selects = document.querySelectorAll('select');
  var inputs = document.querySelectorAll('input');
  var fieldSets = document.querySelectorAll('fieldset');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  window.validateForms = {
    turnOnControls: function () {
      for (var i = 0; i < selects.length; i++) {
        selects[i].removeAttribute('disabled');
      };
      for (var j = 0; j < inputs.length; j++) {
        inputs[j].removeAttribute('disabled');
      };
      for (var n = 0; n < fieldSets.length; n++) {
        fieldSets[n].removeAttribute('disabled');
      };
    },

    turnOfControls: function () {
      for (var i = 0; i < selects.length; i++) {
        selects[i].setAttribute('disabled', 'disabled');
      };
      for (var j = 0; j < inputs.length; j++) {
        inputs[j].setAttribute('disabled', 'disabled');
      };
      for (var n = 0; n < fieldSets.length; n++) {
        fieldSets[n].setAttribute('disabled', 'disabled');
      };
    },

    activeForm: function () {

      window.mainPin.address.setAttribute('disabled', 'disabled');

      var typeRelation = { flat: 1000, bungalo: 0, house: 5000, palace: 10000 };
      type.addEventListener('change', function () {
        price.setAttribute('min', typeRelation[type.value])
        price.setAttribute('placeholder', typeRelation[type.value])
      })
    },

    capacityCheck: function () {
      if (window.validateForms.numberOfRooms.value === '100' && window.validateForms.numberOfGuests.value !== '0') {
        window.validateForms.numberOfGuests.setCustomValidity('Не для гостей');
      } else if (window.validateForms.numberOfGuests.value === '0' && window.validateForms.numberOfRooms.value !== '100') {
        window.validateForms.numberOfRooms.setCustomValidity('Выберите 100 комнат');
      } else if (window.validateForms.numberOfRooms.value < window.validateForms.numberOfGuests.value) {
        window.validateForms.numberOfGuests.setCustomValidity('Не больше ' + window.validateForms.numberOfRooms.value + ' гостей');
      }
      else {
        window.validateForms.numberOfGuests.setCustomValidity('');
        window.validateForms.numberOfRooms.setCustomValidity('');
      }
    },

    numberOfRooms: document.querySelector('#room_number'),
    numberOfGuests: document.querySelector('#capacity')
  }

})();

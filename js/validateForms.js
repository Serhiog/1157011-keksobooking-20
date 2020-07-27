'use strict';

(function () {

  var TYPE_RELATION = {
    flat: 1000, bungalo: 0, house: 5000, palace: 10000
  };
  var selects = document.querySelectorAll('select');
  var inputs = document.querySelectorAll('input');
  var fieldSets = document.querySelectorAll('fieldset');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var form = document.querySelector('.ad-form');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var closeErrorBtn = errorMessage.querySelector('.error__button');
  var clearBtn = document.querySelector('.ad-form__reset');
  var address = document.querySelector('#address');
  var startPositionMainPin = '605,425';


  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  window.validateForms = {

    activeForm: function () {
      price.setAttribute('min', TYPE_RELATION[type.value]);
      price.setAttribute('placeholder', TYPE_RELATION[type.value]);
    },

    filterForm: Array.from(document.querySelector('.map__filters').children),

    turnOnControls: function () {
      selects.forEach(function (select) {
        select.removeAttribute('disabled');
      });
      inputs.forEach(function (input) {
        input.removeAttribute('disabled');
      });
      fieldSets.forEach(function (fieldSet) {
        fieldSet.removeAttribute('disabled');
      });
    },

    turnOfControls: function () {
      selects.forEach(function (select) {
        select.setAttribute('disabled', 'disabled');
      });
      inputs.forEach(function (input) {
        input.setAttribute('disabled', 'disabled');
      });
      fieldSets.forEach(function (fieldSet) {
        fieldSet.setAttribute('disabled', 'disabled');
      });
    },

    checkNumberCapacityOfGuests: function () {
      if (window.validateForms.numberOfRooms.value === '100' && window.validateForms.numberOfGuests.value !== '0') {
        window.validateForms.numberOfGuests.setCustomValidity('Не для гостей');
      } else if (window.validateForms.numberOfGuests.value === '0' && window.validateForms.numberOfRooms.value !== '100') {
        window.validateForms.numberOfRooms.setCustomValidity('Выберите 100 комнат');
      } else if (window.validateForms.numberOfRooms.value < window.validateForms.numberOfGuests.value) {
        window.validateForms.numberOfGuests.setCustomValidity('Не больше ' + window.validateForms.numberOfRooms.value + ' гостей');
      } else {
        window.validateForms.numberOfGuests.setCustomValidity('');
        window.validateForms.numberOfRooms.setCustomValidity('');
      }
    },

    numberOfRooms: document.querySelector('#room_number'),
    numberOfGuests: document.querySelector('#capacity'),
    type: type

  };

  var cloneMessage = successMessage.cloneNode(true);

  var closeSuccesMessage = function (evt) {
    if (evt.key === 'Escape' || evt.button === 0) {
      cloneMessage.classList.add('hidden');
    }
    document.removeEventListener('click', closeSuccesMessage);

    document.removeEventListener('keydown', closeSuccesMessage);
  };

  var onSuccesPost = function () {
    window.unActivePage.deactivationState();

    document.querySelector('main').appendChild(cloneMessage);

    document.addEventListener('click', closeSuccesMessage);

    document.addEventListener('keydown', closeSuccesMessage);

    address.value = startPositionMainPin;
  };

  var onErrorPost = function () {
    document.querySelector('main').appendChild(cloneMessage);

    cloneMessage.addEventListener('click', function () {
      cloneMessage.classList.add('hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        cloneMessage.classList.add('hidden');
      }
    });

    closeErrorBtn.addEventListener('click', function () {
      cloneMessage.classList.add('hidden');
    });
  };

  form.addEventListener('submit', function (evt) {
    window.backend.post(new FormData(form), onSuccesPost, onErrorPost);
    evt.preventDefault();
  });

  clearBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.renderCard.card.remove();
    window.unActivePage.deactivationState();
    address.value = startPositionMainPin;
    window.avatar.userPic.src = 'img/muffin-grey.svg';
    //window.avatar.adPhoto.firstElementChild.remove();
  });
})();


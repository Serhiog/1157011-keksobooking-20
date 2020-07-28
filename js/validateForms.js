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
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var clearBtn = document.querySelector('.ad-form__reset');
  var address = document.querySelector('#address');
  var startPositionMainPin = '605,425';
  var form = document.querySelector('.ad-form');

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  var toClearButton = function (evt) {
    evt.preventDefault();
    document.querySelector('.ad-form-header__avatar').src = 'img/muffin-grey.svg';
    if (document.querySelector('.ad-form__selected-photo')) {
      document.querySelector('.ad-form__selected-photo').remove();
    }
    window.renderCard.card.remove();
    window.unActivePage.deactivationState();
    address.value = startPositionMainPin;
    var cardClose = document.querySelector('.popup__close');
    document.removeEventListener('keydown', window.cardClose.byKeyDown);
    if (cardClose) {
      cardClose.removeEventListener('click', window.cardClose.byClick);
    }
  };

  var sendForm = function (evt) {
    evt.preventDefault();
    window.backend.post(new FormData(form), onSuccesPost, onErrorPost);
    var cardClose = document.querySelector('.popup__close');
    if (cardClose) {
      cardClose.removeEventListener('click', window.cardClose.byClick);
      document.removeEventListener('keydown', window.cardClose.byKeyDown);
    }
  };

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
    type: type,
    form: form,
    toClearButton: toClearButton,
    clearBtn: clearBtn,
    sendForm: sendForm
  };

  window.validateForms.activeForm();
  var cloneMessage = successMessage.cloneNode(true);


  var successMessageField = cloneMessage.querySelector('.success__message');

  var closeSuccesMessageByClick = function (evt) {
    if (evt.target !== successMessageField) {
      if (cloneMessage) {
        var successField = document.querySelector('.success');
        successField.removeEventListener('click', closeSuccesMessageByClick);
        document.removeEventListener('keydown', closeSuccesMessageByKey);
        cloneMessage.remove();
      }


    }
  };

  var closeSuccesMessageByKey = function (evt) {
    if (evt.key === 'Escape') {
      if (cloneMessage) {
        var successField = document.querySelector('.success');
        successField.removeEventListener('click', closeSuccesMessageByClick);
        document.removeEventListener('keydown', closeSuccesMessageByKey);
        cloneMessage.remove();
      }
    }
  };

  var onSuccesPost = function () {
    window.unActivePage.deactivationState();


    document.querySelector('main').appendChild(cloneMessage);

    var successField = document.querySelector('.success');

    successField.addEventListener('click', closeSuccesMessageByClick);
    document.addEventListener('keydown', closeSuccesMessageByKey);

    address.value = startPositionMainPin;

    document.querySelector('.ad-form-header__avatar').src = 'img/muffin-grey.svg';
    if (document.querySelector('.ad-form__selected-photo')) {
      document.querySelector('.ad-form__selected-photo').remove();
    }
  };


  var cloneErrorMessage = errorMessage.cloneNode(true);

  var closeErrorMessageByClick = function (evt) {
    var errorMessageField = document.querySelector('.error__message');
    if (evt.target !== errorMessageField) {
      if (cloneErrorMessage) {
        var errorField = document.querySelector('.error');
        var closeErrorBtn = errorMessage.querySelector('.error__button');
        errorField.removeEventListener('click', closeErrorMessageByClick);
        closeErrorBtn.removeEventListener('click', closeErrorMessageByKey);
        document.removeEventListener('keydown', closeErrorMessageByKey);
        cloneErrorMessage.remove();
      }
    }
  };

  var closeErrorMessageByKey = function (evt) {
    if (evt.key === 'Escape') {
      if (cloneErrorMessage) {
        var errorField = document.querySelector('.error');
        var closeErrorBtn = errorMessage.querySelector('.error__button');
        cloneErrorMessage.remove();
        errorField.removeEventListener('click', closeErrorMessageByClick);
        document.removeEventListener('keydown', closeErrorMessageByKey);
        closeErrorBtn.removeEventListener('click', closeErrorMessageByKey);
      }
      cloneMessage.classList.add('hidden');

    }
  };

  var onErrorPost = function () {
    document.querySelector('main').appendChild(cloneErrorMessage);
    var errorField = document.querySelector('.error');
    var closeErrorBtn = errorMessage.querySelector('.error__button');

    errorField.addEventListener('click', closeErrorMessageByClick);
    closeErrorBtn.addEventListener('click', closeErrorMessageByClick);
    document.addEventListener('keydown', closeErrorMessageByKey);
  };
})();

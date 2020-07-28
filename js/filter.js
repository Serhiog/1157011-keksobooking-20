'use strict';

(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var ANY = 'any';
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__features .map__checkbox');

  var setPriceToString = function (price) {
    if (price < MIN_PRICE) {
      return 'low';
    }

    if (price > MAX_PRICE) {
      return 'high';
    }

    return 'middle';
  };


  var renderFiltredPins = function () {
    var cardClose = document.querySelector('.popup__close');
    if (cardClose) {
      cardClose.removeEventListener('click', window.cardClose.byClick);
      document.removeEventListener('keydown', window.cardClose.byKeyDown);
    }
    if (card) {
      card.remove();
    }
    window.data.filteredData = window.data.pins.filter(function (ad) {
      var filterType = ad.offer.type === housingType.value || housingType.value === ANY;
      var filterPrice = setPriceToString(ad.offer.price) === housingPrice.value || housingPrice.value === ANY;
      var filterRooms = ad.offer.rooms === +housingRooms.value || housingRooms.value === ANY;
      var filterGuests = ad.offer.guests === +housingGuests.value || housingGuests.value === ANY;

      var features = [];

      housingFeatures.forEach(function (input) {
        if (input.checked) {
          features.push(input.value);
        }
      });

      var filterFeatures = function () {
        for (var i = 0; i < features.length; i++) {
          if (ad.offer.features.indexOf(features[i]) === -1) {
            return false;
          }
        }
        return true;
      };

      return filterType && filterPrice && filterRooms && filterGuests && filterFeatures();
    });
    var removePins = function () {
      var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pinsCollection.forEach(function (item) {
        item.remove();
      });
    };
    removePins();
    window.renderPins.onSucces(window.data.filteredData);

  };

  window.filter = {
    housingType: housingType,
    housingPrice: housingPrice,
    housingRooms: housingRooms,
    housingGuests: housingGuests,
    housingFeatures: housingFeatures,
    renderFiltredPins: renderFiltredPins
  };
})();

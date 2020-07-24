'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__features .map__checkbox');

  var stringToPrice = function (price) {
    var correctPrice;
    if (price < 10000) {
      correctPrice = 'low';
    }
    if (price > 50000) {
      correctPrice = 'high';
    }
    if (price >= 10000 && price <= 50000) {
      correctPrice = 'middle';
    }
    return correctPrice;
  };


  var renderFiltredPins = function () {
    if (card) {
      card.remove();
    }
    window.data.filtered = window.data.pins.filter(function (ad) {
      var filterType = ad.offer.type === housingType.value || housingType.value === 'any';
      var filterPrice = stringToPrice(ad.offer.price) === housingPrice.value || housingPrice.value === 'any';
      var filterRooms = ad.offer.rooms === +housingRooms.value || housingRooms.value === 'any';
      var filterGuests = ad.offer.guests === +housingGuests.value || housingGuests.value === 'any';

      var features = [];

      housingFeatures.forEach(function (input) {
        if (input.checked) {
          features.push(input.value);
        }
      });

      var filterFeatures = function () {
        var filter = true;
        for (var i = 0; i < features.length; i++) {
          if (ad.offer.features.indexOf(features[i]) === -1) {
            filter = false;
            break;
          }
        }
        return filter;
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
    window.renderPins.onSucces(window.data.filtered);

  };

  housingFeatures.forEach(function (checkbox) {
    checkbox.addEventListener('change', renderFiltredPins);
  });

  housingType.addEventListener('change', window.debounce(renderFiltredPins));
  housingPrice.addEventListener('change', window.debounce(renderFiltredPins));
  housingRooms.addEventListener('change', window.debounce(renderFiltredPins));
  housingGuests.addEventListener('change', window.debounce(renderFiltredPins));
})();

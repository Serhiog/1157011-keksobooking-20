'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var housingType = document.querySelector('#housing-type')
  var housingPrice = document.querySelector('#housing-price')
  var unFiltredPins = [];
  var filtredPins = [];
  var change = false
  var filtredAds = []
  var checkEmptyType = false
  var emptyArray = []

  window.filterPins = {

    toFilterPins: function (response) {
      unFiltredPins = response
      if (!change) {
        window.renderPins.onSucces(unFiltredPins)
      }
      change = true
    },

    savedFiltredPins: function (filtredPins) {
      filtredAds = filtredPins;
    },

    changeType: function (evt) {

      housingPrice.value = 'any'

      filtredPins = unFiltredPins.filter(item => item.offer.type === evt.target.value);
      window.filterPins.savedFiltredPins(filtredPins)
      window.renderPins.onSucces(filtredPins)
      if (evt.target.value === 'any') {
        window.renderPins.onSucces(unFiltredPins)
        window.filterPins.savedFiltredPins(unFiltredPins)
      }

      if (evt.target.value === 'palace') {
        checkEmptyType = true
      }

      if (card) { card.remove() }


    },

    changePrice: function (evt) {
      
      var target
      if (evt.target.value === 'high') {
        if (checkEmptyType && filtredAds.length === 0) {
          window.renderPins.onSucces(emptyArray)
        }
        target = 50000
        if (!checkEmptyType && filtredAds.length === 0) {
          filtredAds = unFiltredPins
        }
        var pop = filtredAds.filter(item => item.offer.price >= target);
        window.renderPins.onSucces(pop)
      }

      if (evt.target.value === 'low') {
        if (checkEmptyType && filtredAds.length === 0) {
          window.renderPins.onSucces(emptyArray)
        }
        target = 10000
        if (!checkEmptyType && filtredAds.length === 0) {
          filtredAds = unFiltredPins
        }
        var pop = filtredAds.filter(item => item.offer.price < target);
        window.renderPins.onSucces(pop)
      }

      if (evt.target.value === 'middle') {
        if (checkEmptyType && filtredAds.length === 0) {
          window.renderPins.onSucces(emptyArray)
        }

        if (!checkEmptyType && filtredAds.length === 0) {
          filtredAds = unFiltredPins
        }
        var pop = filtredAds.filter(item => item.offer.price >= '10000' && item.offer.price < '50000');
        window.renderPins.onSucces(pop)
      }

      if (evt.target.value === 'any') {
        var pop = filtredAds;
      }

      if (card) { card.remove() }
      window.renderPins.onSucces(pop)
    }
  }

  if (card) { card.remove() }



  housingPrice.addEventListener('change', window.filterPins.changePrice)
  housingType.addEventListener('change', window.filterPins.changeType)
})();

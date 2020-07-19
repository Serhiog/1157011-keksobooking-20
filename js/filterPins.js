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

  var pinsFeatures = {
    maxPrice: '50000',
    minPrice: '10000',
    priceMaxLevel: 'high',
    priceMidLevel: 'middle',
    priceLowLevel: 'low',
    priceAnyLevel: 'any'
  }


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

      if (checkEmptyType && filtredAds.length === 0) {
        window.renderPins.onSucces(emptyArray)
      }
      if (!checkEmptyType && filtredAds.length === 0) {
        filtredAds = unFiltredPins
      }
      if (evt.target.value === pinsFeatures.priceMaxLevel) {
        window.renderPins.onSucces(filtredAds.filter(item => item.offer.price >= pinsFeatures.maxPrice))
      }
      if (evt.target.value === pinsFeatures.priceLowLevel) {
        window.renderPins.onSucces(filtredAds.filter(item => item.offer.price < pinsFeatures.minPrice))
      }
      if (evt.target.value === pinsFeatures.priceMidLevel) {
        window.renderPins.onSucces(filtredAds.filter(item => item.offer.price >= pinsFeatures.minPrice && item.offer.price < pinsFeatures.maxPrice))
      }

      if (evt.target.value === pinsFeatures.priceAnyLevel) {
        window.renderPins.onSucces(filtredAds)
      }

      if (card) { card.remove() }
    }
  }

  if (card) { card.remove() }



  housingPrice.addEventListener('change', window.filterPins.changePrice)
  housingType.addEventListener('change', window.filterPins.changeType)
})();

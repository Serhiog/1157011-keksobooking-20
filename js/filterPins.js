'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var housingType = document.querySelector('#housing-type')
  var housingPrice = document.querySelector('#housing-price')
  var housingRooms = document.querySelector('#housing-rooms')
  var unFiltredPins = [];
  var change = false
  var filtredAds = []
  var checkEmptyType = false
  var emptyArray = []
  var filtredByTypePins = [];
  var filtredByPricePins = []
  var filtredByRoomsPins = []

  var pinsFeatures = {
    maxPrice: '50000',
    minPrice: '10000',
    priceMaxLevel: 'high',
    priceMidLevel: 'middle',
    priceLowLevel: 'low',
    anySelect: 'any',
    maxRooms: '3',
    midRooms: '2',
    minRooms: '1'
  }


  window.filterPins = {

    toFilterPins: function (response) {
      unFiltredPins = response
      if (!change) {
        window.renderPins.onSucces(unFiltredPins)
      }
      change = true
    },

    savedFiltredByType: function (filtredByTypePins) {
      filtredByTypePins = filtredByTypePins;
    },
    savedFiltredByPrice: function (filtredByTypePins) {
      filtredByPricePins = filtredByTypePins;
    },
    savedFiltredByRooms: function (filtredByTypePins) {
      filtredByRoomsPins = filtredByTypePins;
    },

    changeType: function (evt) {

      housingPrice.value = pinsFeatures.anySelect
      housingRooms.value = pinsFeatures.anySelect

      filtredByTypePins = unFiltredPins.filter(item => item.offer.type === evt.target.value);
      window.filterPins.savedFiltredByType(filtredByTypePins)
      window.renderPins.onSucces(filtredByTypePins)
      if (evt.target.value === pinsFeatures.anySelect) {
        window.renderPins.onSucces(unFiltredPins)
      }

      // if (evt.target.value === 'palace') {
      //   checkEmptyType = true
      // }

      if (card) { card.remove() }

      console.log(filtredByTypePins)
      console.log(filtredByPricePins)
      console.log(filtredByRoomsPins)
    },

    changePrice: function (evt) {
      housingRooms.value = pinsFeatures.anySelect

      // if (checkEmptyType && filtredByTypePins.length === 0) {
      //   window.renderPins.onSucces(emptyArray)
      // }
      // if (!checkEmptyType && filtredByTypePins.length === 0) {
      //   filtredByTypePins = unFiltredPins
      // }
      if (evt.target.value === pinsFeatures.priceMaxLevel) {
        if (filtredByTypePins.length === 0) {
          filtredByPricePins = unFiltredPins.filter(item => item.offer.price >= pinsFeatures.maxPrice)
          window.filterPins.savedFiltredByPrice(filtredByPricePins)
          window.renderPins.onSucces(filtredByPricePins)
        } else {
          filtredByPricePins = filtredByTypePins.filter(item => item.offer.price >= pinsFeatures.maxPrice)
          window.filterPins.savedFiltredByPrice(filtredByPricePins)
          window.renderPins.onSucces(filtredByPricePins)
        }
        console.log(filtredByTypePins)
        console.log(filtredByPricePins)
        console.log(filtredByRoomsPins)
      }
      if (evt.target.value === pinsFeatures.priceLowLevel) {
        if (filtredByTypePins.length === 0) {
          filtredByPricePins = unFiltredPins.filter(item => item.offer.price < pinsFeatures.minPrice)
          window.filterPins.savedFiltredByPrice(filtredByPricePins)
          window.renderPins.onSucces(filtredByPricePins)
        }
        else {
          filtredByPricePins = filtredByTypePins.filter(item => item.offer.price < pinsFeatures.minPrice)
          window.filterPins.savedFiltredByPrice(filtredByPricePins)
          window.renderPins.onSucces(filtredByPricePins)
        }
        console.log(filtredByTypePins)
        console.log(filtredByPricePins)
        console.log(filtredByRoomsPins)
      }
      if (evt.target.value === pinsFeatures.priceMidLevel) {
        if (filtredByTypePins.length === 0) {
          filtredByPricePins = unFiltredPins.filter(item => item.offer.price >= pinsFeatures.minPrice && item.offer.price < pinsFeatures.maxPrice)
          window.filterPins.savedFiltredByPrice(filtredByPricePins)
          window.renderPins.onSucces(filtredByPricePins)
        } else {
          filtredByPricePins = filtredByTypePins.filter(item => item.offer.price >= pinsFeatures.minPrice && item.offer.price < pinsFeatures.maxPrice)
          window.filterPins.savedFiltredByPrice(filtredByPricePins)
          window.renderPins.onSucces(filtredByPricePins)
        }
        console.log(filtredByTypePins)
        console.log(filtredByPricePins)
        console.log(filtredByRoomsPins)
      }

      // if (evt.target.value === pinsFeatures.anySelect) {
      //   window.renderPins.onSucces(filtredByTypePins)
      // }

      if (card) { card.remove() }
    },

    changeRooms: function (evt) {

      // if (checkEmptyType && filtredByTypePins.length === 0) {
      //   window.renderPins.onSucces(emptyArray)
      // }
      // if (!checkEmptyType && filtredByTypePins.length === 0) {
      //   filtredByTypePins = unFiltredPins
      // }
      if (evt.target.value === pinsFeatures.maxRooms) {
        if (filtredByTypePins.length === 0 && filtredByPricePins.length === 0) {
          filtredByRoomsPins = unFiltredPins.filter(item => item.offer.rooms === parseInt(evt.target.value))
          window.filterPins.savedFiltredByRooms(filtredByRoomsPins)
          window.renderPins.onSucces(filtredByRoomsPins)
        } else {
          filtredByRoomsPins = filtredByPricePins.filter(item => item.offer.rooms === parseInt(evt.target.value))
          window.filterPins.savedFiltredByRooms(filtredByRoomsPins)
          window.renderPins.onSucces(filtredByRoomsPins)
        }
        console.log(filtredByTypePins)
        console.log(filtredByPricePins)
        console.log(filtredByRoomsPins)
      }
      if (evt.target.value === pinsFeatures.midRooms) {
        if (filtredByTypePins.length === 0 && filtredByPricePins.length === 0) {
          filtredByRoomsPins = unFiltredPins.filter(item => item.offer.rooms === parseInt(evt.target.value))
          window.filterPins.savedFiltredByRooms(filtredByRoomsPins)
          window.renderPins.onSucces(filtredByRoomsPins)
        } else {
          filtredByRoomsPins = filtredByPricePins.filter(item => item.offer.rooms === parseInt(evt.target.value))
          window.filterPins.savedFiltredByRooms(filtredByRoomsPins)
          window.renderPins.onSucces(filtredByRoomsPins)
        }
        console.log(filtredByTypePins)
        console.log(filtredByPricePins)
        console.log(filtredByRoomsPins)
      }
      if (evt.target.value === pinsFeatures.minRooms) {
        if (filtredByTypePins.length === 0 && filtredByPricePins.length === 0) {
          filtredByRoomsPins = unFiltredPins.filter(item => item.offer.rooms === parseInt(evt.target.value))
          window.filterPins.savedFiltredByRooms(filtredByRoomsPins)
          window.renderPins.onSucces(filtredByRoomsPins)
        } else {
          filtredByRoomsPins = filtredByPricePins.filter(item => item.offer.rooms === parseInt(evt.target.value))
          window.filterPins.savedFiltredByRooms(filtredByRoomsPins)
          window.renderPins.onSucces(filtredByRoomsPins)
        }
        console.log(filtredByTypePins)
        console.log(filtredByPricePins)
        console.log(filtredByRoomsPins)
      }
      // if (evt.target.value === pinsFeatures.anySelect) {
      //   window.renderPins.onSucces(filtredByTypePins.filter(item => item.offer.rooms > pinsFeatures.maxRooms))
      // }
      // if (evt.target.value === pinsFeatures.priceLowLevel) {
      //   window.renderPins.onSucces(filtredByTypePins.filter(item => item.offer.price < pinsFeatures.minPrice))
      // }
      // if (evt.target.value === pinsFeatures.priceMidLevel) {
      //   window.renderPins.onSucces(filtredByTypePins.filter(item => item.offer.price >= pinsFeatures.minPrice && item.offer.price < pinsFeatures.maxPrice))
      // }

      // if (evt.target.value === pinsFeatures.priceAnyLevel) {
      //   window.renderPins.onSucces(filtredByTypePins)
      // }

      if (card) { card.remove() }
    }
  }

  if (card) { card.remove() }

  housingType.addEventListener('change', window.filterPins.changeType)
  housingPrice.addEventListener('change', window.filterPins.changePrice)
  housingRooms.addEventListener('change', window.filterPins.changeRooms)


})();

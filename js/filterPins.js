'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var housingType = document.querySelector('#housing-type')
  var housingPrice = document.querySelector('#housing-price')
  var housingRooms = document.querySelector('#housing-rooms')
  var housingGuests = document.querySelector('#housing-guests')
  var unFiltredPins = [];
  var change = false
  var filtredAds = []
  var checkEmptyType = false
  var emptyArray = []
  var filtredByTypePins = [];
  var filtredByPricePins = []
  var filtredByRoomsPins = []
  var filtredByGuestsPins = []

  var pinsFeatures = {
    maxPrice: '50000',
    minPrice: '10000',
    priceMaxLevel: 'high',
    priceMidLevel: 'middle',
    priceLowLevel: 'low',
    anySelect: 'any',
    maxRooms: '3',
    midRooms: '2',
    minRooms: '1',
    maxGuests: '2',
    midGuests: '1',
    minGuests: '0'
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
    savedFiltredByGuests: function (filtredByTypePins) {
      filtredByGuestsPins = filtredByTypePins;
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

      if (evt.target.value === 'palace') {
        checkEmptyType = true
      }

      if (card) { card.remove() }

    },

    changePrice: function (evt) {
      housingRooms.value = pinsFeatures.anySelect

      if (checkEmptyType && filtredByTypePins.length === 0) {
        window.renderPins.onSucces(emptyArray)

      }
      else {

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
        }
      }

      if (card) { card.remove() }
    },

    changeRooms: function (evt) {

      housingGuests.value = pinsFeatures.anySelect

      if (checkEmptyType && filtredByTypePins.length === 0) {
        window.renderPins.onSucces(emptyArray)

      }
      else {
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
        }
        if (evt.target.value === pinsFeatures.anySelect) {
          if (filtredByTypePins.length === 0 && filtredByPricePins.length === 0) {
            filtredByRoomsPins = unFiltredPins
            window.filterPins.savedFiltredByRooms(filtredByRoomsPins)
            window.renderPins.onSucces(filtredByRoomsPins)
          } else {
            filtredByRoomsPins = unFiltredPins
            window.filterPins.savedFiltredByRooms(filtredByRoomsPins)
            window.renderPins.onSucces(filtredByRoomsPins)
          }
        }

        if (card) { card.remove() }
      }
    },
    changeGuests: function (evt) {

      if (checkEmptyType && filtredByTypePins.length === 0) {
        window.renderPins.onSucces(emptyArray)
      }
      else {
        if (evt.target.value === pinsFeatures.maxGuests) {
          if (filtredByTypePins.length === 0 && filtredByPricePins.length === 0 && filtredByRoomsPins.length === 0) {
            filtredByGuestsPins = unFiltredPins.filter(item => item.offer.guests === parseInt(evt.target.value))
            window.filterPins.savedFiltredByGuests(filtredByGuestsPins)
            window.renderPins.onSucces(filtredByGuestsPins)
          } else {
            filtredByGuestsPins = filtredByRoomsPins.filter(item => item.offer.guests === parseInt(evt.target.value))
            window.filterPins.savedFiltredByGuests(filtredByGuestsPins)
            window.renderPins.onSucces(filtredByGuestsPins)
          }
        }
        if (evt.target.value === pinsFeatures.midGuests) {
          if (filtredByTypePins.length === 0 && filtredByPricePins.length === 0 && filtredByRoomsPins.length === 0) {
            filtredByGuestsPins = unFiltredPins.filter(item => item.offer.guests === parseInt(evt.target.value))
            window.filterPins.savedFiltredByGuests(filtredByGuestsPins)
            window.renderPins.onSucces(filtredByGuestsPins)
          } else {
            filtredByGuestsPins = filtredByRoomsPins.filter(item => item.offer.guests === parseInt(evt.target.value))
            window.filterPins.savedFiltredByGuests(filtredByGuestsPins)
            window.renderPins.onSucces(filtredByGuestsPins)
          }
        }
        if (evt.target.value === pinsFeatures.minGuests) {
          if (filtredByTypePins.length === 0 && filtredByPricePins.length === 0 && filtredByRoomsPins.length === 0) {
            filtredByGuestsPins = unFiltredPins.filter(item => item.offer.guests < pinsFeatures.midGuests)
            window.filterPins.savedFiltredByGuests(filtredByGuestsPins)
            window.renderPins.onSucces(filtredByGuestsPins)
          } else {
            filtredByGuestsPins = filtredByRoomsPins.filter(item => item.offer.guests < pinsFeatures.midGuests)
            window.filterPins.savedFiltredByGuests(filtredByGuestsPins)
            window.renderPins.onSucces(filtredByGuestsPins)
          }

        }
        if (evt.target.value === pinsFeatures.anySelect) {
          if (filtredByTypePins.length === 0 && filtredByPricePins.length === 0 && filtredByRoomsPins.length === 0) {
            filtredByGuestsPins = unFiltredPins
            window.filterPins.savedFiltredByGuests(filtredByGuestsPins)
            window.renderPins.onSucces(filtredByGuestsPins)
          } else {
            filtredByGuestsPins = filtredByRoomsPins.filter(item => item.offer.guests > pinsFeatures.maxGuests)
            window.filterPins.savedFiltredByGuests(filtredByGuestsPins)
            window.renderPins.onSucces(filtredByGuestsPins)
          }
        }

        if (card) { card.remove() }
      }
    }
  }

  if (card) { card.remove() }

  housingType.addEventListener('change', window.filterPins.changeType)
  housingPrice.addEventListener('change', window.filterPins.changePrice)
  housingRooms.addEventListener('change', window.filterPins.changeRooms)
  housingGuests.addEventListener('change', window.filterPins.changeGuests)


})();

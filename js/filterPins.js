'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var housingType = document.querySelector('#housing-type')
  var unFiltredPins = [];
  var filtredPins = [];
  var change = false

  window.filterPins = {

    toFilterPins: function (response) {
      unFiltredPins = response

      change ? console.log() : window.renderPins.onSucces(unFiltredPins.slice(0, 5))

      change = true

      housingType.addEventListener('change', function (evt) {

        filtredPins = unFiltredPins.filter(item => item.offer.type === evt.target.value);
        window.renderPins.onSucces(filtredPins.slice(0, 5))

        card ? card.remove() : console.log()
      })
    },
  }
})();

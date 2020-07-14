'use strict';

(function () {
  var unFiltredPins = [];
  var filtredPins = [];

  window.renderPins = {

    mapPins: document.querySelector('.map__pins'),

    onSucces: function (response) {

      unFiltredPins = response

      var mapPins = document.querySelector('.map__pins');
      var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
      var fragment = new DocumentFragment();

      for (var i = 0; i < response.length; i++) {
        var clonePin = pinElement.cloneNode(true);
        clonePin.style.left = response[i].location.x - window.mainPin.PINWIDTH / 2 + 'px';
        clonePin.style.top = response[i].location.y - window.mainPin.PINHEIGHT + 'px';
        clonePin.querySelector('img').src = response[i].author.avatar;
        clonePin.querySelector('img').alt = response[i].offer.title;

        fragment.appendChild(clonePin);
      }

      mapPins.appendChild(fragment);

      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)')

      pins.forEach(element => {
        element.addEventListener('click', function (evt) {
          evt.preventDefault()
          if (element.classList.contains('map__pin--active')) {
            element.classList.remove('map__pin--active')
          } else {
            element.classList.add('map__pin--active')
          }
          var indexPin = [].slice.call(pins).indexOf(element);
          window.renderCard.renderCard((response[indexPin]));
        })
      })

      window.renderPins.filtredPins()
    },
    onError: function (errortext) {
      console.log(errortext)
    },

    filtredPins: function (evt) {
      var housingType = document.querySelector('#housing-type')

      housingType.addEventListener('change', function (evt) {
        filtredPins = unFiltredPins.filter(item => item.offer.type === evt.target.value)
        return filtredPins
      })


      console.log(filtredPins)
    }
  };
})();

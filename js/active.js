'use strict';

(function () {

  window.active = {
    activePage: function () {

      window.mainPin.map.classList.remove('map--faded');
      window.backend.get(window.renderPins.onSucces);
      window.validateForms.turnOnControls();
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.validateForms.activeForm();
      window.validateForms.numberOfRooms.addEventListener('change', window.validateForms.capacityCheck);
      window.validateForms.numberOfGuests.addEventListener('change', window.validateForms.capacityCheck);
      window.validateForms.capacityCheck();





      var onSucces = function (response) {
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

        console.log(response[i])
        var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)')

        pins.forEach(element => {
          element.addEventListener('click', function () {
            console.log('testClick')
            var indexPin = [].slice.call(pins).indexOf(element);
            console.log(response[indexPin])
            window.renderCard.renderCard(window.renderCard.renderCard(response[indexPin]));

          })

        })
        if (response[i].offer.photos.length = 0) {
          card.classList.add('hidden');
          console.log('errortext')
        }
      };

      var onError = function (errortext) {
        console.log(errortext)
      }

      window.backend.get(onSucces, onError)
    }
  };
})();

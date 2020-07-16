'use strict';

(function () {


  window.renderPins = {

    mapPins: document.querySelector('.map__pins'),

    onSucces: function (actualPins) {

      Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(element => {
        element.remove()
      })

      var mapPins = document.querySelector('.map__pins');
      var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
      var fragment = new DocumentFragment();


      for (var i = 0; i < actualPins.length; i++) {
        var clonePin = pinElement.cloneNode(true);
        clonePin.style.left = actualPins[i].location.x - window.mainPin.PINWIDTH / 2 + 'px';
        clonePin.style.top = actualPins[i].location.y - window.mainPin.PINHEIGHT + 'px';
        clonePin.querySelector('img').src = actualPins[i].author.avatar;
        clonePin.querySelector('img').alt = actualPins[i].offer.title;

        fragment.appendChild(clonePin);
      }

      mapPins.appendChild(fragment);

      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)')

      pins.forEach(element => {
        element.addEventListener('click', function (evt) {
          evt.preventDefault()

          pins.forEach(element => {
            element.classList.remove('map__pin--active')
          })
          element.classList.add('map__pin--active')

          var indexPin = [].slice.call(pins).indexOf(element);

          window.renderCard.renderCard((actualPins[indexPin]));
          
        })
      })


    },
    onError: function (errortext) {
      console.log(errortext)
    }

  };

}
)();

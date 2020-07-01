'use strict';

(function () {
  window.renderPins = {

    createAds: function () {
      var ADSCOUNT = 8;
      var ads = [];
      for (var i = 1; i <= ADSCOUNT; i++) {
        ads.push(window.createAd.createAd(i));
      }
      return ads
    },

    renderPins: function () {
      var mapPins = document.querySelector('.map__pins');
      var ads = window.renderPins.createAds();
      var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
      var fragment = new DocumentFragment();

      for (var i = 0; i < window.renderPins.createAds().length; i++) {
        var clonePin = pinElement.cloneNode(true);
        clonePin.style.left = ads[i].location.x - window.mainPin.PINWIDTH / 2 + 'px';
        clonePin.style.top = ads[i].location.y - window.mainPin.PINHEIGHT + 'px';
        clonePin.querySelector('img').src = ads[i].author.avatar;
        clonePin.querySelector('img').alt = ads[i].author.title;
        fragment.appendChild(clonePin);
      }
      mapPins.appendChild(fragment);
    },
    mapPins: document.querySelector('.map__pins')
  };
})();

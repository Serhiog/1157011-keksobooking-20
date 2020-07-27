'use strict';

(function () {
  var HOME_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var card = document.querySelector('#card').content.querySelector('.map__card');
  var photosList = card.querySelector('.popup__photos');
  var placeCard = document.querySelector('.map__pins');
  var listFeatures = card.querySelector('.popup__features');
  var avatar = card.querySelector('.popup__avatar');
  var type = card.querySelector('.popup__type');

  window.renderCard = {

    showAd: function (ad) {

      card.querySelector('.popup__title').textContent = ad.offer.title;
      card.querySelector('.popup__text--address').textContent = ad.location.x + ',' + ad.location.y;
      card.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
      card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ',' + 'выезд до ' + ad.offer.checkout;
      card.querySelector('.popup__description').textContent = ad.offer.description;

      if (!photosList.hasChildNodes()) {
        var newPhoto = document.createElement('img');
        newPhoto.classList.add('popup__photo');
        newPhoto.setAttribute('width', '45');
        newPhoto.setAttribute('height', '40');
        newPhoto.setAttribute('alt', 'Фотография жилья');
        photosList.appendChild(newPhoto);
      }

      var photosFragment = new DocumentFragment();
      var standartPhoto = photosList.querySelector('.popup__photo');

      for (var i = 0; i < ad.offer.photos.length; i++) {
        var clonePhoto = standartPhoto.cloneNode(true);
        clonePhoto.src = ad.offer.photos[i];
        photosFragment.appendChild(clonePhoto);
      }

      while (photosList.firstChild) {
        photosList.removeChild(photosList.firstChild);
      }

      photosList.appendChild(photosFragment);

      while (listFeatures.firstChild) {
        listFeatures.removeChild(listFeatures.firstChild);
      }

      var featuresFragment = new DocumentFragment();
      for (var j = 0; j < ad.offer.features.length; j++) {
        var item = document.createElement('li');
        item.className = 'popup__feature';
        item.classList.add('popup__feature--' + ad.offer.features[j]);
        featuresFragment.appendChild(item);
      }

      listFeatures.appendChild(featuresFragment);

      type.textContent = HOME_TYPES[ad.offer.type];

      avatar.src = ad.author.avatar;

      if (ad.offer) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }

      if (!ad.offer.features.length) {
        card.querySelector('.popup__features').style.display = 'none';
      } else {
        card.querySelector('.popup__features').style.display = 'block';
      }
      if (!ad.offer.photos.length) {
        card.querySelector('.popup__photos').style.display = 'none';
      } else {
        card.querySelector('.popup__photos').style.display = 'flex';
      }

      placeCard.after(card);
      card.classList.remove('hidden');


      var cardClose = document.querySelector('.popup__close');

      cardClose.addEventListener('click', window.cardClose.byClick);
      document.addEventListener('keydown', window.cardClose.byKeyDown);


    },
    card: card,
  };

})();

'use strict';

(function () {

  var card = document.querySelector('#card').content.querySelector('.map__card');
  var photosList = card.querySelector('.popup__photos');
  var placeCard = document.querySelector('.map__pins');
  var listFeatures = card.querySelector('.popup__features');
  var avatar = card.querySelector('.popup__avatar');
  var type = card.querySelector('.popup__type');

  window.renderCard = {

    card: document.querySelector('#card').content.querySelector('.map__card'),

    renderCard: function (ad) {

      card.querySelector('.popup__title').textContent = ad.offer.title;
      card.querySelector('.popup__text--address').textContent = ad.location.x + ',' + ad.location.y;
      card.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
      card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ',' + 'выезд до ' + ad.offer.checkout;
      card.querySelector('.popup__description').textContent = ad.offer.description;

      // Рендерим фотографии объявления
      var photosFragment = new DocumentFragment();
      for (var i = 0; i < ad.offer.photos.length; i++) {
        var clonePhoto = photosList.querySelector('.popup__photo').cloneNode(true);
        clonePhoto.src = ad.offer.photos[i];

        photosFragment.appendChild(clonePhoto);
      };
      while (photosList.firstChild) {
        photosList.removeChild(photosList.firstChild)
      };

      photosList.appendChild(photosFragment);


      // Фильтруем features
      //Удаляем элементы по умолчанию из разметки
      while (listFeatures.firstChild) {
        listFeatures.removeChild(listFeatures.firstChild);
      };

      //Рендерим актуальные features
      var featuresFragmnet = new DocumentFragment();
      for (var i = 0; i < ad.offer.features.length; i++) {
        var item = document.createElement('li');
        item.className = 'popup__feature';
        item.classList.add('popup__feature--' + ad.offer.features[i]);
        featuresFragmnet.appendChild(item);
      };

      listFeatures.appendChild(featuresFragmnet);

      //Рендеринг types
      if (ad.offer.type === 'flat') {
        type.textContent = 'Квартира'
      };
      if (ad.offer.type === 'bungalo') {
        type.textContent = 'Бунгало'
      };
      if (ad.offer.type === 'house') {
        type.textContent = 'Дом'
      };
      if (ad.offer.type === 'palace') {
        type.textContent = 'Дворец'
      };

      //Рендерим аватар
      avatar.src = ad.author.avatar;

      // Скрытие блоков при отсутствии контента
      for (var i = 0; i <= ad.length - 1; i++) {
        if (ad.offer.title) {
          card.querySelector('.popup__title').style.display = 'none'
        };
        if (ad.offer.price) {
          card.querySelector('.popup__text--price').style.display = 'none'
        };
        if (ad.offer.rooms) {
          card.querySelector('.popup__text--capacity').style.display = 'none'
        };
        if (ad.offer.checkin || !ad.offer.checkout) {
          card.querySelector('.popup__text--time').style.display = 'none'
        };
        if (ad.offer.description) {
          card.querySelector('.popup__description').style.display = 'none'
        };
        if (ad.location) {
          card.querySelector('.popup__text--address').style.display = 'none'
        };
        if (ad.offer.type) {
          card.querySelector('.popup__type').style.display = 'none'
        };
        if (ad.offer.rooms || ad.offer.guests) {
          card.querySelector('.popup__text--capacity').style.display = 'none'
        };
        if (ad.offer.features) {
          card.querySelector('.popup__features').style.display = 'none'
        };
        if (ad.offer.photos) {
          card.querySelector('.popup__photos').style.display = 'none'
        };
        if (ad.author.avatar) {
          card.querySelector('.popup__avatar').style.display = 'none'
        };
      };
      placeCard.after(card);
      card.classList.remove('hidden');
    }

  };
})();

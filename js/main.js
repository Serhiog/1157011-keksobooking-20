'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TIMES = ['12:00', '13:00', '14:00'];

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
var pinHeight = 50;
var pinWidth = 70;

// случайное число от min до (max+1)
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

//Случайная длина массива
var randomArray = function (array) {
  return array.slice(0, randomInteger(1, array.length - 1));
};

// Функция добавления объекта
var createAd = function (n) {
  var rect = map.getBoundingClientRect();
  var location = {
    x: randomInteger(rect.left - pinHeight, rect.width - pinWidth / 2),
    y: randomInteger(130, 630),
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + n + '.png',
    },
    offer: {
      title: 'Some title',
      adress: location.x + ', ' + location.y,
      price: randomInteger(1200, 12000),
      type: TYPES[randomInteger(0, TYPES.length - 1)],
      rooms: randomInteger(1, 5),
      guests: randomInteger(1, 6),
      checkin: TIMES[randomInteger(0, TIMES.length - 1)],
      checkout: TIMES[randomInteger(0, TIMES.length - 1)],
      features: randomArray(FEATURES),
      description: 'Some description',
      photos: randomArray(PHOTOS),
    },
    location: location
  }
}

var createAds = function () {
  var ads = [];
  for (var i = 1; i <= 8; i++) {
    ads.push(createAd(i));
  }
  return ads
};
var ads = createAds();

var renderPins = function () {
  var fragment = new DocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    var clonePin = pinElement.cloneNode(true);
    clonePin.style.left = ads[i].location.x + 'px';
    clonePin.style.top = ads[i].location.y + 'px';
    clonePin.querySelector('img').src = ads[i].author.avatar;
    clonePin.querySelector('img').alt = ads[i].author.title;
    fragment.appendChild(clonePin);
  }
  mapPins.appendChild(fragment);
};

renderPins();

map.classList.remove('map--faded');

//Создание карточки предложения
//Переменные:
var placeCard = document.querySelector('.map__pins');
var cardElement = document.querySelector('#card').content.querySelector('.map__card');

//Поиск необходимого класса в шаблоне и внесении данных
var renderCard = function (ad) {
  cardElement.querySelector('.popup__title').textContent = ads[ad].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ads[ad].location.x + ',' + ads[ad].location.y;
  cardElement.querySelector('.popup__text--price').textContent = ads[ad].offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__text--capacity').textContent = ads[ad].offer.rooms + ' комнаты для ' + ads[ad].offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[ad].offer.checkin + ',' + 'выезд до ' + ads[ad].offer.checkout;
  cardElement.querySelector('.popup__description').textContent = ads[ad].offer.description;

  //Функция рендеринга фотографий карточки из массива
  var renderPhotos = function () {
    var photosList = cardElement.querySelector('.popup__photos')
    var photoItem = cardElement.querySelector('.popup__photo')

    for (var i = 0; i <= PHOTOS.length - 1; i++) {
      photoItem.src = PHOTOS[i]
      var copyPhoto = photoItem.cloneNode(true)
      photosList.appendChild(copyPhoto)
    }
  };
  renderPhotos()

  //Функция фильтрации features
  var filterFeatures = function (ad) {
    var listFeatures = cardElement.querySelector('.popup__features');
    var actualFeatures = ads[ad].offer.features;
    while (listFeatures.firstChild) {
      listFeatures.removeChild(listFeatures.firstChild);
  }
    for (var i = 0; i <= actualFeatures.length - 1; i++) {
      var item = document.createElement('li');
      item.className = 'popup__feature';
      item.classList.add('popup__feature--' + actualFeatures[i]);
      listFeatures.appendChild(item)
     }

  };
  filterFeatures(0)

  //Функция рендеринга types
  var renderTypes = function (ad) {
    // var typeBox = {
    var type = cardElement.querySelector('.popup__type');
    if (ads[ad].offer.type === 'flat') {
      type.textContent = 'Квартира'
    }
    if (ads[ad].offer.type === 'bungalo') {
      type.textContent = 'Бунгало'
    }
    if (ads[ad].offer.type === 'house') {
      type.textContent = 'Дом'
    }
    if (ads[ad].offer.type === 'palace') {
      type.textContent = 'Дворец'
    }

  };
  renderTypes(0)
}

renderCard(0)

placeCard.after(cardElement);



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
      description: 'description',
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
var cardsFixQuantity = 1;
var cardElement = document.querySelector('#card').content.querySelector('.map__card');
var placeCards = document.querySelector('.map__filters-container');

//Поиск необходимого класса в шаблоне и создание копии
var copyCards = function () {
  var fragment = new DocumentFragment();
  var fillCard = function (cardClass, content) {
    item.querySelector(cardClass).textContent = content;
  }
  for (var i = 0; i < cardsFixQuantity; i++) {
    var item = cardElement.cloneNode(true);
    fillCard('.popup__title', ads[i].offer.title);
    fillCard('.popup__text--price', ads[i].offer.price + ' ₽/ночь');
    fillCard('.popup__type', ads[i].offer.type);
    fillCard('.popup__text--capacity', ads[i].offer.rooms + ' комнаты для ' + ads[i].offer.guests + ' гостей');
    fragment.appendChild(item);
  }
  // placeCards.insertAdjacentHTML('beforebegin', fragment); - не работает
  placeCards.appendChild(fragment);
};

copyCards();

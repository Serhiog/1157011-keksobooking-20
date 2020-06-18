'use strict';

//Создание объета
//Константы объекта
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TIMES = ['12:00', '13:00', '14:00'];
var ADSCOUNT = 8;

//Переменные
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
var pinHeight = 50;
var pinWidth = 70;

//Функция случайного числа от min до (max+1)
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

//Функция случайной длины массива
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
  };
};

//Генерация нужного количества объектов
var createAds = function () {
  var ads = [];
  for (var i = 1; i <= ADSCOUNT; i++) {
    ads.push(createAd(i));
  }
  return ads
};
var ads = createAds();

//Рендеринг пинов
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

//Создание карточки предложения
//Переменные:
var placeCard = document.querySelector('.map__pins');
var cardElement = document.querySelector('#card').content.querySelector('.map__card');
var type = cardElement.querySelector('.popup__type');
var photosList = cardElement.querySelector('.popup__photos');
var photoItem = cardElement.querySelector('.popup__photo');
var listFeatures = cardElement.querySelector('.popup__features');
var avatar = cardElement.querySelector('.popup__avatar');

//Функция поиска необходимого класса в шаблоне и внесении данных
var renderCard = function (ad) {
  cardElement.querySelector('.popup__title').textContent = ads[ad].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ads[ad].location.x + ',' + ads[ad].location.y;
  cardElement.querySelector('.popup__text--price').textContent = ads[ad].offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__text--capacity').textContent = ads[ad].offer.rooms + ' комнаты для ' + ads[ad].offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[ad].offer.checkin + ',' + 'выезд до ' + ads[ad].offer.checkout;
  cardElement.querySelector('.popup__description').textContent = ads[ad].offer.description;

  // Рендерим фотографии объявления
  for (var i = 0; i <= PHOTOS.length - 1; i++) {
    photoItem.src = PHOTOS[i];
    var copyPhoto = photoItem.cloneNode(true);
    photosList.appendChild(copyPhoto);
  };

  // Фильтруем features
  //Удаляем элементы по умолчанию из разметки
  while (listFeatures.firstChild) {
    listFeatures.removeChild(listFeatures.firstChild);
  };

  //Рендерим актуальные features
  for (var i = 0; i <= ads[ad].offer.features.length - 1; i++) {
    var item = document.createElement('li');
    item.className = 'popup__feature';
    item.classList.add('popup__feature--' + ads[ad].offer.features[i]);
    listFeatures.appendChild(item);
  };

  //Рендеринг types
  if (ads[ad].offer.type === 'flat') {
    type.textContent = 'Квартира'
  };
  if (ads[ad].offer.type === 'bungalo') {
    type.textContent = 'Бунгало'
  };
  if (ads[ad].offer.type === 'house') {
    type.textContent = 'Дом'
  };
  if (ads[ad].offer.type === 'palace') {
    type.textContent = 'Дворец'
  };

  //Рендерим аватар
  avatar.src = ads[ad].author.avatar;

  // Скрытие блоков при отсутствии контента
  for (var i = 0; i <= ads.length - 1; i++) {
    if (!ads[i].offer.title) {
      cardElement.querySelector('.popup__title').style.display = 'none'
    };
    if (!ads[i].offer.price) {
      cardElement.querySelector('.popup__text--price').style.display = 'none'
    };
    if (!ads[i].offer.rooms) {
      cardElement.querySelector('.popup__text--capacity').style.display = 'none'
    };
    if (!ads[i].offer.checkin || !ads[ad].offer.checkout) {
      cardElement.querySelector('.popup__text--time').style.display = 'none'
    };
    if (!ads[i].offer.description) {
      cardElement.querySelector('.popup__description').style.display = 'none'
    };
    if (!ads[i].location) {
      cardElement.querySelector('.popup__text--address').style.display = 'none'
    };
    if (!ads[i].offer.type) {
      cardElement.querySelector('.popup__type').style.display = 'none'
    };
    if (!ads[i].offer.rooms || !ads[i].offer.guests) {
      cardElement.querySelector('.popup__text--capacity').style.display = 'none'
    };
    if (!ads[i].offer.features) {
      cardElement.querySelector('.popup__features').style.display = 'none'
    };
    if (!ads[i].offer.photos) {
      cardElement.querySelector('.popup__photos').style.display = 'none'
    };
    if (!ads[i].author.avatar) {
      cardElement.querySelector('.popup__avatar').style.display = 'none'
    };
  };
};

//Запускаем функцию с указанием в качестве аргумента необходимой карточки
renderCard(0);

//Рендерим карточку в необходимом месте в разметке
// placeCard.after(cardElement); ----ВРЕМЕННО ОТКЛЮЧИЛИ СОГЛАСНО ЗАДАНИЮ

// Добавляем события
// Отключаем инпуты и фиелдсеты
var selects = document.querySelectorAll('select');
var inputs = document.querySelectorAll('input');
var fieldsets = document.querySelectorAll('fieldset');

// Функции для неативного состояния
var disableInput = function (control) {
  for (var i = 0; i <= control.length - 1; i++) {
    control[i].setAttribute('disabled', 'disabled');
  }
};

var pinMouseDown = function () {

}

// Обработчик клика и нажатия клавиши на главный пин в неактивном состоянии
var pinMap = map.querySelector('.map__pin--main');

pinMap.addEventListener('mousedown', function (evt) {
  if (evt.button == 0) {
    activePage()
  }
});

pinMap.addEventListener('keydown', function (evt) {
  if (evt.key == 'Enter') {
    activePage()
  }
});

// Сценарий неактивный
var unActivePage = function () {
  map.classList.add('map--faded');
  map.querySelector('.map__filters').classList.add('ad-form--disabled');
  disableInput(selects);
  disableInput(inputs);
  disableInput(fieldsets);
};

// Сценарий активный
var activePage = function () {
  map.classList.remove('map--faded');
  renderPins();
}

// Отображение координат в поле адреса
var address = document.querySelector('#address');
pinMap.getBoundingClientRect();
var pinX = pinMap.getBoundingClientRect().x
console.log(address);

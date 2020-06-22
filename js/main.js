'use strict';

//Создание объета
//Константы объекта
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TIMES = ['12:00', '13:00', '14:00'];
var ADSCOUNT = 8;
var PINHEIGHT = 50;
var PINWIDTH = 70;

//Переменные
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');

//Функция случайного числа от min до (max+1)
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

//Функция случайной длины массива
var randomArray = function (array) {
  return array.slice(0, randomInteger(1, array.length));
};

// Функция добавления объекта
var createAd = function (n) {
  var rect = map.getBoundingClientRect();
  var location = {
    x: randomInteger(rect.left - PINHEIGHT, rect.width - PINWIDTH / 2),
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
    clonePin.style.left = ads[i].location.x - PINWIDTH / 2 + 'px';
    clonePin.style.top = ads[i].location.y - PINHEIGHT + 'px';
    clonePin.querySelector('img').src = ads[i].author.avatar;
    clonePin.querySelector('img').alt = ads[i].author.title;
    fragment.appendChild(clonePin);
  }
  mapPins.appendChild(fragment);
};

//Создание карточки предложения
//Переменные:
var placeCard = document.querySelector('.map__pins');
var card = document.querySelector('#card').content.querySelector('.map__card');
var type = card.querySelector('.popup__type');
var photosList = card.querySelector('.popup__photos');
var photoItem = card.querySelector('.popup__photo');
var listFeatures = card.querySelector('.popup__features');
var avatar = card.querySelector('.popup__avatar');

//Функция поиска необходимого класса в шаблоне и внесении данных
var renderCard = function (ad) {

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
  photosList.firstElementChild.remove();
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
  for (var i = 0; i <= ads.length - 1; i++) {
    if (!ads[i].offer.title) {
      card.querySelector('.popup__title').style.display = 'none'
    };
    if (!ads[i].offer.price) {
      card.querySelector('.popup__text--price').style.display = 'none'
    };
    if (!ads[i].offer.rooms) {
      card.querySelector('.popup__text--capacity').style.display = 'none'
    };
    if (!ads[i].offer.checkin || !ad.offer.checkout) {
      card.querySelector('.popup__text--time').style.display = 'none'
    };
    if (!ads[i].offer.description) {
      card.querySelector('.popup__description').style.display = 'none'
    };
    if (!ads[i].location) {
      card.querySelector('.popup__text--address').style.display = 'none'
    };
    if (!ads[i].offer.type) {
      card.querySelector('.popup__type').style.display = 'none'
    };
    if (!ads[i].offer.rooms || !ads[i].offer.guests) {
      card.querySelector('.popup__text--capacity').style.display = 'none'
    };
    if (!ads[i].offer.features) {
      card.querySelector('.popup__features').style.display = 'none'
    };
    if (!ads[i].offer.photos) {
      card.querySelector('.popup__photos').style.display = 'none'
    };
    if (!ads[i].author.avatar) {
      card.querySelector('.popup__avatar').style.display = 'none'
    };
  };
};

//Запускаем функцию с указанием в качестве аргумента необходимой карточки
renderCard(ads[0]);

//Рендерим карточку в необходимом месте в разметке
// placeCard.after(card) ---- ВРЕМЕННО ОТКЛЮЧАЕМ ПОКАЗ КАРТОЧКИ

// Добавляем события

// Переменные
var selects = document.querySelectorAll('select');
var inputs = document.querySelectorAll('input');
var fieldSets = document.querySelectorAll('fieldset');
var pinMap = map.querySelector('.map__pin--main');
var address = document.querySelector('#address');
var pinX = parseInt(pinMap.style.left);
var pinY = parseInt(pinMap.style.top);
var numberOfRooms = document.querySelector('#room_number');
var rooms = numberOfRooms.querySelectorAll('option');
var numberOfGuests = document.querySelector('#capacity');
var guests = numberOfGuests.querySelectorAll('option');

// Функция отключения инпутов и фиелдсетов по умолчанию в неактивном состоянии страницы
var turnOfControls = function () {
  for (var i = 0; i < selects.length; i++) {
    selects[i].setAttribute('disabled', 'disabled');
  };
  for (var j = 0; j < inputs.length; j++) {
    inputs[j].setAttribute('disabled', 'disabled');
  };
  for (var n = 0; n < fieldSets.length; n++) {
    fieldSets[n].setAttribute('disabled', 'disabled');
  };
};

// Функция включения контролов для активного состояния траницы
var turnOnControls = function () {
  for (var i = 0; i < selects.length; i++) {
    selects[i].removeAttribute('disabled');
  };
  for (var j = 0; j < inputs.length; j++) {
    inputs[j].removeAttribute('disabled');
  };
  for (var n = 0; n < fieldSets.length; n++) {
    fieldSets[n].removeAttribute('disabled');
  };
};

// Обработчик клика и нажатия клавиши Enter на главный пин в неактивном состоянии
pinMap.addEventListener('mousedown', function (evt) {
  if (evt.button == 0) {
    activePage()
  };
});

pinMap.addEventListener('keydown', function (evt) {
  if (evt.key == 'Enter') {
    activePage();
  };
});


// Функция определения main pin на карте и указание координат в поле адреса
var locatePin = function (top) {
  address.value = Math.round(pinX + (PINWIDTH / 2)) + ',' + Math.round(pinY + top);
}

// Внесение в адрес координат метки для обоих состояний
locatePin((PINHEIGHT / 2));

// Отключение контролов для неактивного состояния
turnOfControls();

// Сценарий неактивный
var unActivePage = function () {
  map.classList.add('map--faded');
  map.querySelector('.map__filters').classList.add('ad-form--disabled');
  turnOfControls('disabled', 'disabled');
};

// Сценарий активный
var activePage = function () {
  map.classList.remove('map--faded');
  renderPins();
  locatePin((PINHEIGHT));
  turnOnControls();
};

// Валидация числа комнат и количества гостей
// Отключаем выбор количества гостей до выбора количества комнат для логичного сценария
for (var i = 0; i < guests.length; i++) {
  guests[i].setAttribute('disabled', 'disabled');
};

// Функция для сброса заблокированных значений количества гостей
var clearGuests = function () {
  for (var i = 0; i < guests.length; i++) {
    guests[i].removeAttribute('disabled')
  };
};

// Функция блокировки выбора количества гостей
var deactiveGuests = function (number) {
  guests[number].setAttribute('disabled', 'disabled');
};

// Обработчик для контролов гостей-комнат
numberOfRooms.addEventListener('input', function () {
  if (numberOfRooms.value === '1') {
    clearGuests();
    deactiveGuests(0)
    deactiveGuests(1)
    deactiveGuests(3)
  };
  if (numberOfRooms.value === '2') {
    clearGuests();
    deactiveGuests(0)
    deactiveGuests(3)
  };
  if (numberOfRooms.value === '3') {
    clearGuests();
    deactiveGuests(3)
  };
  if (numberOfRooms.value === '100') {
    clearGuests();
    deactiveGuests(0)
    deactiveGuests(1)
    deactiveGuests(2)
  }
});





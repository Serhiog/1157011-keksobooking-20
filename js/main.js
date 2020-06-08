'use strict';
//Константы
var ARRAYOPTIONS = [];


// Функция создания массива
var createArrayOptions = function (title, locationX, locationY) {
  for (var i = 0; i < 8; i++) {
    var metaArray = {
      author: {
        "avatar": img / avatars / user + " 0" + [i].png
      },
      offer: {
        "title": title,
        "address": locationX, locationY,
        "price": number, price,
        "type": palace, flat, house или bungalo,
        "rooms": rooms,
        "guests": guests,
        "checkin": 12: 00, 13: 00 или 14: 00,
        "checkout": 12: 00, 13: 00 или 14: 00,
        "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]
        "description": 'description',
        "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
      },
      location: {
        "x": случайное число, координата x метки на карте.Значение ограничено размерами блока, в котором перетаскивается метка,
        "y": случайное число, координата y метки на карте от 130 до 630,
      }
    }
    arrayOptions.push(metaArray[i]);
  };
};

var map = document.querySelector('.map');
map.classlist.remove('.map--faded');


// Функция случайных чисел
var randomNumbers = function () { };

// Функция наполнения DOM элементов
var renderElements = function () { };

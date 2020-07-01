'use strict';

(function () {

  window.mainPin = {
    map: document.querySelector('.map'),
    PINHEIGHT: 50,
    PINWIDTH: 70,
    address: document.querySelector('#address'),
    locatePin: function (top) {
      window.mainPin.address.value = Math.round(pinX + (window.mainPin.PINWIDTH / 2)) + ',' + Math.round(pinY + top);
    }
  };

  var pinMap = window.mainPin.map.querySelector('.map__pin--main');
  var pinX = parseInt(pinMap.style.left);
  var pinY = parseInt(pinMap.style.top);

  // Обработчик клика и нажатия клавиши Enter на главный пин в неактивном состоянии
  pinMap.addEventListener('click', function (evt) {
    if (evt.button === 0) {
      window.active.activePage();
    };
  });

  pinMap.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.active.activePage();
    };
  });

  // Функция определения main pin на карте и указание координат в поле адреса


  // Внесение в адрес координат метки для обоих состояний
  window.mainPin.locatePin((window.mainPin.PINHEIGHT / 2));
})();

'use strict';

(function () {
  var GETURL = 'https://javascript.pages.academy/keksobooking/data';
  var SUCCESSSTATUS = 200;

  window.backend = {

    get: function (onSucces, onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESSSTATUS) {
          onSucces(xhr.response)
        } else {
          onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText)
        }
      });

      xhr.responseType = 'json'
      xhr.open('GET', GETURL);


      xhr.setTimeOut = 10000;

      xhr.addEventListener('error', function () {
        'Ошибка соединения'
      })

      xhr.addEventListener('timeout', function () {
        'Не удалось загрузить данные за ' + xhr.timeout + ' секунд'
      })

      xhr.send();
    }
  };
})();

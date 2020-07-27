'use strict';

(function () {
  var GET_URL = 'https://javascript.pages.academy/keksobooking/data';
  var POST_URL = 'https://javascript.pages.academy/keksobooking';
  var SUCCESS_CODE = 200;
  var TIME_OUT = 10000;

  window.backend = {

    load: function (onSucces, onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          onSucces(xhr.response);
          window.data.filteredData = window.data.pins = xhr.response;
        } else {
          onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.responseType = 'json';

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Не удалось загрузить данные за ' + xhr.timeout + ' секунд');
      });

      xhr.setTimeOut = TIME_OUT;
      xhr.open('GET', GET_URL);
      xhr.send();
    },

    post: function (data, onSuccesPost, onErrorPost) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          onSuccesPost();
        } else {
          onErrorPost();
        }
      });

      xhr.responseType = 'json';

      xhr.addEventListener('error', function () {
        onErrorPost('Ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onErrorPost('Не удалось загрузить данные за ' + xhr.timeout + ' секунд');
      });

      xhr.setTimeOut = TIME_OUT;
      xhr.open('POST', POST_URL);
      xhr.send(data);
    }
  };
})();

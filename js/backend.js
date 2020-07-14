'use strict';

(function () {
  var GETURL = 'https://javascript.pages.academy/keksobooking/data';
  var POSTURL = 'https://javascript.pages.academy/keksobooking';
  var successCode = 200;

  window.backend = {

    get: function (onSucces, onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === successCode) {
          onSucces(xhr.response);
        } else {

          onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText)
          window.validateForms.filterForm.forEach(element => {
            element.setAttribute('disabled', 'disabled')
          });

        }
      });

      xhr.responseType = 'json'

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения')
      })

      xhr.addEventListener('timeout', function () {
        onError('Не удалось загрузить данные за ' + xhr.timeout + ' секунд')
      })

      xhr.setTimeOut = 10000;
      xhr.open('GET', GETURL);
      xhr.send();
    },

    post: function (data, onSuccesPost, onErrorPost) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === successCode) {
          onSuccesPost();
        } else {
          onErrorPost()
        }
      });

      xhr.responseType = 'json';

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения')
      })

      xhr.addEventListener('timeout', function () {
        onError('Не удалось загрузить данные за ' + xhr.timeout + ' секунд')
      })

      xhr.setTimeOut = 10000;
      xhr.open('POST', POSTURL)
      xhr.send(data);
    }
  };
})();

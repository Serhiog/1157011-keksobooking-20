'use strict';

(function () {

  window.util = {
    randomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    randomArray: function (array) {
      return array.slice(0, window.util.randomInteger(1, array.length));
    }
  };

})();

// 'use strict';

// (function () {
//   var TYPES = ['palace', 'flat', 'house', 'bungalo'];
//   var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//   var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
//   var TIMES = ['12:00', '13:00', '14:00'];

//   window.createAd = {

//     createAd: function (n) {
//       var rect = window.mainPin.map.getBoundingClientRect();
//       var location = {
//         x: window.util.randomInteger(rect.left - window.mainPin.PINHEIGHT, rect.width - window.mainPin.PINWIDTH / 2),
//         y: window.util.randomInteger(130, 630),
//       };
//       return {
//         author: {
//           avatar: 'img/avatars/user0' + n + '.png',
//         },
//         offer: {
//           title: 'Some title',
//           adress: location.x + ', ' + location.y,
//           price: window.util.randomInteger(1200, 12000),
//           type: TYPES[window.util.randomInteger(0, TYPES.length - 1)],
//           rooms: window.util.randomInteger(1, 5),
//           guests: window.util.randomInteger(1, 6),
//           checkin: TIMES[window.util.randomInteger(0, TIMES.length - 1)],
//           checkout: TIMES[window.util.randomInteger(0, TIMES.length - 1)],
//           features: window.util.randomArray(FEATURES),
//           description: 'Some description',
//           photos: window.util.randomArray(PHOTOS),
//         },
//         location: location
//       };
//     }

//   };
// })();

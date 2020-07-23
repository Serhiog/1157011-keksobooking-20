'use strict';

(function () {

  var ALLOWED_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var userPicAvatar = document.querySelector('.ad-form-header__avatar');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = ALLOWED_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {

      var reader = new FileReader();
      reader.addEventListener('load', function () {
        userPicAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();

'use strict';

(function () {

  var ALLOWED_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var userPicAvatar = document.querySelector('.ad-form-header__avatar');

  var adPhotoChooser = document.querySelector('.ad-form__input');
  var adPhoto = document.querySelector('.ad-form__photo');

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

  adPhotoChooser.addEventListener('change', function () {
    var adFile = adPhotoChooser.files[0];
    var adFileName = adFile.name.toLowerCase();

    var adMatches = ALLOWED_TYPES.some(function (item) {
      return adFileName.endsWith(item);
    });

    if (adMatches) {

      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var newPhoto = document.createElement('img');
        newPhoto.style = 'width: inherit; height: inherit;';
        newPhoto.src = reader.result;
        adPhoto.appendChild(newPhoto);
      });
      reader.readAsDataURL(adFile);
    }
  });
})();

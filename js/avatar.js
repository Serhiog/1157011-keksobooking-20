'use strict';

(function () {

  var ALLOWED_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var userPic = document.querySelector('.ad-form-header__avatar');


  var adPhotoChooser = document.querySelector('.ad-form__input');
  var adPhoto = document.querySelector('.ad-form__photo');

  var toSelectUserPhoto = function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = ALLOWED_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {

      var reader = new FileReader();
      reader.addEventListener('load', function () {
        userPic.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var toSelectAdPhoto = function () {
    var adFile = adPhotoChooser.files[0];
    var adFileName = adFile.name.toLowerCase();

    var adMatches = ALLOWED_TYPES.some(function (item) {
      return adFileName.endsWith(item);
    });

    if (adMatches) {

      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var newPhoto = document.createElement('img');
        newPhoto.classList.add('ad-form__selected-photo');
        newPhoto.style = 'width: inherit; height: inherit;';
        newPhoto.src = reader.result;
        adPhoto.appendChild(newPhoto);
        window.avatar = {
          newPhoto: newPhoto
        };
      });
      reader.readAsDataURL(adFile);
    }
  };


  window.avatar = {
    userPic: userPic,
    adPhoto: adPhoto,
    avatarChooser: avatarChooser,
    adPhotoChooser: adPhotoChooser,
    toSelectUserPhoto: toSelectUserPhoto,
    toSelectAdPhoto: toSelectAdPhoto
  };

  avatarChooser.addEventListener('change', toSelectUserPhoto);
  adPhotoChooser.addEventListener('change', toSelectAdPhoto);

})();

'use strict';
window.files = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR_IMG = 'img/muffin-grey.svg';
  var fileAvatar = document.querySelector('.ad-form-header__input');
  var filePhoto = document.querySelector('.ad-form__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var PhotoPreview = document.querySelector('.ad-form__photo');
  var imgTemplate = document.createElement('img');

  function uploadImage(file, isPhotoes) {
    if (isPhotoes) {
      PhotoPreview.classList.add('hidden');
    }
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (isPhotoes) {
          var image = imgTemplate.cloneNode(true);
          image.src = reader.result;
          image.classList.add('ad-form__photo');
          PhotoPreview.after(image);
        } else {
          avatarPreview.src = reader.result;
        }
      });
      reader.readAsDataURL(file);
    }
  }

  function clearFiles() {
    var test = document.querySelectorAll('img.ad-form__photo');
    test.forEach(function (element) {
      element.parentElement.removeChild(element);
    });
    avatarPreview.src = DEFAULT_AVATAR_IMG;
    PhotoPreview.classList.remove('hidden');
  }

  filePhoto.addEventListener('change', function () {
    var files = Array.from(filePhoto.files);
    files.forEach(function (file) {
      uploadImage(file, true);
    });
  });
  fileAvatar.addEventListener('change', function () {
    var file = fileAvatar.files[0];
    uploadImage(file, false);
  });

  return {
    clear: clearFiles,
  };
})();

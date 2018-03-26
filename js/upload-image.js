// файл backend.js
'use strict';

(function () {

  var FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];
  var MAX_FILES_SIZE = 2000000; // максимальный размер файла - 1 мб.

  var preview = document.querySelector('.effect-image-preview');

  window.upload = {
    addEventsImage: function (el1, el2, openOverlay, onError) {
      el1.addEventListener('change', function () {
        loadImage(openOverlay, onError, el1);
      });

      el2.addEventListener('dragover', function (evt) {
        evt.preventDefault();
      });

      el2.addEventListener('dragenter', function () {
        el2.classList.add('upload-control-transform');
      });

      el2.addEventListener('dragleave', function () {
        el2.classList.remove('upload-control-transform');
      });

      el2.addEventListener('drop', function (evt) {
        evt.preventDefault();
        loadImage(openOverlay, onError, evt.dataTransfer);
      });
    },

    removeEventsImage: function (el1, el2, openOverlay, onError) {
      el1.removeEventListener('change', function () {
        loadImage(openOverlay, onError, el1);
      });

      el2.removeEventListener('dragover', function (evt) {
        evt.preventDefault();
      });

      el2.removeEventListener('dragenter', function () {
        el2.classList.add('upload-control-transform');
      });

      el2.removeEventListener('dragleave', function () {
        el2.classList.remove('upload-control-transform');
      });

      el2.removeEventListener('drop', function (evt) {
        evt.preventDefault();
        loadImage(openOverlay, onError, evt.dataTransfer);
      });
    }

  };

  function loadImage(callbackFunction, onError, element) {
    var file = element.files[0];
    if (typeof file !== 'undefined' && file.size <= MAX_FILES_SIZE) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
          callbackFunction();
        });

        reader.readAsDataURL(file);
      } else {
        callbackFunction();
        onError('Допустимый формат изображений .gif, .jpg, .jpeg, .png');
      }
    } else {
      callbackFunction();
      onError('Максимальный размер файла - ' + (MAX_FILES_SIZE / 1000000) + ' мб');
    }
  }

})();

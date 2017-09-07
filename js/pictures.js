// файл pictures.js
'use strict';

(function () {

  window.uploadSelectImage = document.querySelector('#upload-select-image');
  window.similarListElement = document.querySelector('.pictures');
  window.uploadOverlay = document.querySelector('.upload-overlay');
  window.uploadImage = window.uploadSelectImage.querySelector('.upload-image');
  var similarFotoTemplate = document.querySelector('#picture-template').content;
  window.errorMssage = document.querySelector('.error-message');

  window.backend.load(printFoto, errorHandler);

  function errorHandler(errorMessage) {
    window.errorMssage.textContent = errorMessage;
    window.errorMssage.classList.remove('hidden');
  }

  window.uploadSelectImage.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.uploadSelectImage), function () {
      window.uploadOverlay.classList.add('hidden');
      window.uploadImage.classList.remove('hidden');
    }, errorHandler);
  });

  function getFotos(picturesData) {
    var fotoElement = similarFotoTemplate.cloneNode(true);
    fotoElement.querySelector('img').setAttribute('src', picturesData.url);
    fotoElement.querySelector('.picture-likes').textContent = picturesData.likes;
    fotoElement.querySelector('.picture-comments').textContent = picturesData.comments.length;
    return fotoElement;
  }

  function printFoto(picturesData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 25; i++) {
      fragment.appendChild(getFotos(picturesData[i]));
    }
    window.similarListElement.appendChild(fragment);
  }

})();

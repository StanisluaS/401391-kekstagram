'use strict';

(function () {

  window.uploadSelectImage = document.querySelector('#upload-select-image');
  window.similarListElement = document.querySelector('.pictures');
  window.uploadOverlay = document.querySelector('.upload-overlay');
  window.uploadImage = window.uploadSelectImage.querySelector('.upload-image');
  var similarFotoTemplate = document.querySelector('#picture-template').content;

  window.render = {
    printFoto: function (picturesData) {
      document.querySelector('.pictures').innerHTML = '';
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < 25; i++) {
        fragment.appendChild(getFotos(picturesData[i]));
      }
      window.similarListElement.appendChild(fragment);
    }
  };

  function getFotos(picturesData) {
    var fotoElement = similarFotoTemplate.cloneNode(true);
    fotoElement.querySelector('img').setAttribute('src', picturesData.url);
    fotoElement.querySelector('.picture-likes').textContent = picturesData.likes;
    fotoElement.querySelector('.picture-comments').textContent = picturesData.comments.length;
    return fotoElement;
  }

})();

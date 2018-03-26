// файл pictures.js
'use strict';

(function () {

  var TIME_OUTPUT = 3000; // мс время показа сообщения ошибки

  window.uploadSelectImage = document.querySelector('#upload-select-image');
  window.similarListElement = document.querySelector('.pictures');
  window.uploadOverlay = document.querySelector('.upload-overlay');
  window.uploadImage = window.uploadSelectImage.querySelector('.upload-image');
  var similarFotoTemplate = document.querySelector('#picture-template').content;
  window.errorMessage = document.querySelector('.error-message');
  var filters = document.querySelector('.filters');
  var data = [];

  window.pictures = {
    errorHandler: function (errorMessage) {
      window.errorMessage.textContent = errorMessage;
      window.errorMessage.classList.remove('hidden');
      setTimeout(function () {
        window.errorMessage.classList.add('hidden');
        window.errorMessage.textContent = '';
      }, TIME_OUTPUT);
    }
  };

  window.backend.load(getArrayFotos, window.pictures.errorHandler);

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

  function removeFoto() {
    var fotosElement = document.querySelectorAll('.picture');
    for (var i = 0; i < fotosElement.length; i++) {
      window.similarListElement.removeChild(fotosElement[i]);
    }
  }

  function getArrayFotos(loadData) {
    data = loadData;
    printFoto(data);
    filters.classList.remove('hidden');
    filters.addEventListener('click', onFilterClick);
  }

  function onFilterClick(evt) {
    var target = evt.target;
    if (target === evt.currentTarget) {
      return;
    } else {
      var element;
      switch (evt.target.id) {
        case 'filter-recommend':
          element = data;
          break;
        case 'filter-popular':
          element = window.method.getPopularFoto(data);
          break;
        case 'filter-discussed':
          element = window.method.getDiscussFoto(data);
          break;
        case 'filter-random':
          element = window.method.getRandomFoto(data);
          break;
      }
      window.debounce.debounce(function () {
        removeFoto();
        printFoto(element);
      });
    }
  }
})();

// файл pictures.js
'use strict';

(function () {

  window.uploadSelectImage = document.querySelector('#upload-select-image');
  window.similarListElement = document.querySelector('.pictures');
  window.uploadOverlay = document.querySelector('.upload-overlay');
  window.uploadImage = window.uploadSelectImage.querySelector('.upload-image');
  var similarFotoTemplate = document.querySelector('#picture-template').content;
  window.errorMessage = document.querySelector('.error-message');
  var filters = document.querySelector('.filters');
  window.pagesNext = document.querySelector('.pages-next');
  window.pagesPrev = document.querySelector('.pages-prev');
  var spanPagesNext = window.pagesNext.querySelector('span');
  var spanPagesPrev = window.pagesPrev.querySelector('span');
  var data = [];
  var array = [];
  var imgElement;
  var flag = true;
  var index = 0;

  window.pictures = {
    errorHandler: function (errorMessage) {
      window.errorMessage.textContent = errorMessage;
      window.errorMessage.classList.remove('hidden');
    },

    leafImge: function (evt) {
      window.preview.printFotoInGallery(makeElement(evt));
    },

    setZero: function () {
      flag = true;
      index = 0;
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
      array[i] = picturesData[i];
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
    var element;
    if (target === evt.currentTarget) {
      return;
    } else {
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

  function makeElement(evt) {
    var target = evt.target;
    var targetImg = window.galleryOverlay.querySelector('img').getAttribute('src');
    if (flag) {
      for (var i = 0; i < 25; i++) {
        var img = array[i].url;
        index = i;
        if (img === targetImg) {
          break;
        }
      }
    }
    if (index < 25 && (target === window.pagesNext || target === spanPagesNext)) {
      if (index === 24) {
        index = -1;
      }
      imgElement = array[index + 1];
      flag = false;
      index += 1;
    }
    if (index >= 0 && (target === window.pagesPrev || target === spanPagesPrev)) {
      if (index === 0) {
        index = 25;
      }
      imgElement = array[index - 1];
      flag = false;
      index -= 1;
    }
    return imgElement;
  }
})();

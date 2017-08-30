// файл pictures.js
'use strict';

(function () {

  window.similarListElement = document.querySelector('.pictures');
  var similarFotoTemplate = document.querySelector('#picture-template').content;

  printFoto(arrayFotos);

  function getFotos(foto) {
    var fotoElement = similarFotoTemplate.cloneNode(true);
    fotoElement.querySelector('img').setAttribute('src', foto.url);
    fotoElement.querySelector('.picture-likes').textContent = foto.likes;
    fotoElement.querySelector('.picture-comments').textContent = foto.comments.length;
    return fotoElement;
  }

  function printFoto(fotos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < fotos.length; i++) {
      fragment.appendChild(getFotos(fotos[i]));
    }
    similarListElement.appendChild(fragment);
  }

})();
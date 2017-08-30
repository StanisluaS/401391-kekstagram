// файл form.js
'use strict';

(function () {

  var MAX_LENGTH_HASHTAGS = 20;
  var MAX_HASHTAGS = 5;

// волидация поля коментариев
  window.validationForm = {
    looksFormDescription: function (evt) {
      evt.target.style.borderColor = '';
    },


// волидация поля хештегов
    looksHashtags: function (evt) {
      var arrayHastags = evt.target.value.split(' ');
      if (arrayHastags.length > MAX_HASHTAGS) {
        evt.target.setCustomValidity('Максимум можно использовать' + MAX_HASHTAGS + 'хеш-тегов');
      } else if (hasLongElements(arrayHastags, MAX_LENGTH_HASHTAGS)) {
        evt.target.setCustomValidity('Максимальная длина одного хэш-тега' + MAX_LENGTH_HASHTAGS + 'символов');
      } else if (hasElementsLattice(arrayHastags) && arrayHastags.toString()) {
        evt.target.setCustomValidity('Хэш-тег начинается с символа `#` и должен включать одно слово');
      } else if (hasElementsWithSpace(arrayHastags)) {
        evt.target.setCustomValidity('Хэш-теги разделяются пробелами');
      } else if (hasDuplicateElement(arrayHastags)) {
        evt.target.setCustomValidity('Хэш-теги не должны повторяться');
      } else {
        evt.target.setCustomValidity('');
        evt.target.style.borderColor = '';
      }
    },

    addRedFrame: function (evt) {
      if (!evt.target.validity.valid) {
        evt.target.style.borderColor = 'red';
      }
    }
  };

// Доп функции для хештегов
  function hasLongElements(array, maxLength) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].length > maxLength) {
        return true;
      }
    }
    return false;
  }

  function hasElementsLattice(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].slice(0, 1) !== '#') {
        return true;
      }
    }
    return false;
  }

  function hasElementsWithSpace(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].indexOf('#', 1) !== -1) {
        return true;
      }
    }
    return false;
  }

  function hasDuplicateElement(array) {
    var obj = {};
    for (var i = 0; i < array.length; i++) {
      if (obj[array[i]]) {
        return true;
      }
      obj[array[i]] = true;
    }
    return false;
  }

})();

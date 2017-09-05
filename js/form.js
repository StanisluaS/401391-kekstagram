// файл form.js
'use strict';

(function () {

  var MAX_LENGTH_HASHTAGS = 20;
  var MAX_HASHTAGS = 5;
  var WIDTH = 455;
  var SLIDER = 91;
  var effectImage = window.uploadOverlay.querySelector('.effect-image-preview');

  window.initializeFilters.makeFilters(setPhotoFilter, moveSlider);
  window.initializeScale.makeScale(getResizeInc, getResizeDec);

  // волидация поля коментариев
  window.validationForm = {
    looksFormDescription: function (evt) {
      var value = evt.target.value.trim();
      if (value === '') {
        evt.target.setCustomValidity('Комментарий не должен быть пустым');
      } else {
        evt.target.setCustomValidity('');
      }
    },


// волидация поля хештегов
    looksHashtags: function (evt) {
      var str = evt.target.value;
      makeArrayHashtags(evt, str, MAX_HASHTAGS, MAX_LENGTH_HASHTAGS);
    }
  };

    // Наложение фильтров на фотографию
  function setPhotoFilter(element) {
    var elementTarget = element;
    var index = SLIDER / WIDTH;
    if (elementTarget.hasAttribute('id')) {
      window.effectLevel.classList.remove('hidden');
      var classTarget = elementTarget.getAttribute('id');
      var newClass = classTarget.replace('upload-', '');
      window.uploadSelectImage.querySelector('img').setAttribute('class', 'effect-image-preview ' + newClass);
      moveSlider(newClass, index);
      window.effectVal.style.width = SLIDER + 'px';
      window.effectPin.style.left = SLIDER + 'px';
    }
  }

    // изминение маштаба на табло
  function getResizeInc(resizeValue) {
    var value = parseInt(resizeValue.getAttribute('value'), 10);
    if (value < 100) {
      var newValue = value + 25;
      resizeValue.setAttribute('value', newValue + '%');
    }
    resizeImage(newValue);
  }

  function getResizeDec(resizeValue) {
    var value = parseInt(resizeValue.getAttribute('value'), 10);
    if (value > 25) {
      var newValue = value - 25;
      resizeValue.setAttribute('value', newValue + '%');
    }
    resizeImage(newValue);
  }

    // маштаб картинки
  function resizeImage(valueImg) {
    window.uploadOverlay.querySelector('img').style.transform = 'scale(' + valueImg / 100 + ')';
  }

// Изминение фильтов
  function moveSlider(typeClass, index) {
    if (typeClass === 'effect-none') {
      window.effectLevel.classList.add('hidden');
      effectImage.style.filter = '';
    }

    if (typeClass === 'effect-chrome') {
      effectImage.style.filter = 'grayscale(' + index + ')';
    }

    if (typeClass === 'effect-sepia') {
      effectImage.style.filter = 'sepia(' + index + ')';
    }

    if (typeClass === 'effect-marvin') {
      effectImage.style.filter = 'invert(' + (100 * index) + '%)';
    }

    if (typeClass === 'effect-phobos') {
      effectImage.style.filter = 'blur(' + (5 * index) + 'px)';
    }

    if (typeClass === 'effect-heat') {
      effectImage.style.filter = 'brightness(' + (3 * index) + ')';
    }
  }


// Доп функция для хештегов
  function makeArrayHashtags(element, value, maxHashtags, maxLength) {
    if (value.trim() === '' && value !== '') {
      element.target.setCustomValidity('Хэш-тег не должен быть пустым');
      element.target.style.borderColor = 'red';
    } else {
      var array = value.split(' ');
      var j = 0;
      var arrayHastags = [];
      for (var i = 0; i < array.length; i++) {
        if (array[i] !== '') {
          arrayHastags[j] = array[i];
          if (arrayHastags[j].length > maxLength) {
            element.target.setCustomValidity('Максимальная длина одного хэш-тега ' + maxLength + ' символов');
          } else if (arrayHastags[j].substring(0, 1) !== '#') {
            element.target.style.borderColor = 'red';
            element.target.setCustomValidity('Хэш-тег начинается с символа `#` и должен включать одно слово');
          } else if (arrayHastags[j].indexOf('#', 1) !== -1) {
            element.target.style.borderColor = 'red';
            element.target.setCustomValidity('Хэш-теги разделяются пробелами');
          } else if ((value.match(new RegExp(arrayHastags[j], 'g'))).length > 1) {
            element.target.style.borderColor = 'red';
            element.target.setCustomValidity('Хэш-теги не должны повторяться');
          } else if ((j + 1) > maxHashtags) {
            element.target.style.borderColor = 'red';
            element.target.setCustomValidity('Максимум можно использовать ' + maxHashtags + ' хеш-тегов');
          } else {
            element.target.setCustomValidity('');
            element.target.style.borderColor = '';
          }
          ++j;
        } else {
          element.target.setCustomValidity('');
          element.target.style.borderColor = '';
        }
      }
    }
  }

})();

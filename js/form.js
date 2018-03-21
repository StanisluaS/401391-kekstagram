// файл form.js
'use strict';

(function () {

  var MAX_LENGTH_HASHTAGS = 20;
  var MAX_HASHTAGS = 5;
  var WIDTH = 455;
  var SLIDER = 91;

  window.initializeFilters.makeFilters(setPhotoFilter, moveSlider);
  window.initializeScale.makeScale(getResizeInc, getResizeDec);

  // валидация поля комментариев
  window.validationForm = {
    looksFormDescription: function (evt) {
      var value = evt.target.value.trim();
      if (value === '') {
        evt.target.setCustomValidity('Комментарий не должен быть пустым');
      } else {
        evt.target.setCustomValidity('');
      }
    },

// валидация поля хэштегов
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

    // изменение масштаба на табло
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

    // масштаб картинки
  function resizeImage(valueImg) {
    window.uploadOverlay.querySelector('img').style.transform = 'scale(' + valueImg / 100 + ')';
  }

// Изменение фильтров
  function moveSlider(typeClass, index) {
    if (typeClass === 'effect-none') {
      window.effectLevel.classList.add('hidden');
      window.effectImage.style.filter = '';
    }

    if (typeClass === 'effect-chrome') {
      window.effectImage.style.filter = 'grayscale(' + index + ')';
    }

    if (typeClass === 'effect-sepia') {
      window.effectImage.style.filter = 'sepia(' + index + ')';
    }

    if (typeClass === 'effect-marvin') {
      window.effectImage.style.filter = 'invert(' + (100 * index) + '%)';
    }

    if (typeClass === 'effect-phobos') {
      window.effectImage.style.filter = 'blur(' + (5 * index) + 'px)';
    }

    if (typeClass === 'effect-heat') {
      window.effectImage.style.filter = 'brightness(' + (3 * index) + ')';
    }
  }


// Доп функция для хэштегов
  function makeArrayHashtags(element, value, maxHashtags, maxLength) {
    var regex = new RegExp(/([^$A-Za-z0-9А-Яа-я_# ]+)/);
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
            return;
          } else if (arrayHastags[j].substring(0, 1) !== '#') {
            element.target.style.borderColor = 'red';
            element.target.setCustomValidity('Хэш-тег начинается с символа `#` и должен включать одно слово');
            return;
          } else if (arrayHastags[j].indexOf('#', 1) !== -1) {
            element.target.style.borderColor = 'red';
            element.target.setCustomValidity('Хэш-теги разделяются пробелами');
            return;
          } else if (array.indexOf(arrayHastags[j], (i + 1)) !== -1) {
            element.target.style.borderColor = 'red';
            element.target.setCustomValidity('Хэш-теги не должны повторяться');
            return;
          } else if ((j + 1) > maxHashtags) {
            element.target.style.borderColor = 'red';
            element.target.setCustomValidity('Максимум можно использовать ' + maxHashtags + ' хеш-тегов');
            return;
          } else if (arrayHastags[j] === '#') {
            element.target.style.borderColor = 'red';
            element.target.setCustomValidity('Хэш-тег не должен быть пустым');
            return;
          } else if (regex.test(arrayHastags[j])) {
            element.target.style.borderColor = 'red';
            element.target.setCustomValidity('Хэш-тег должен содержать только буквы или цифры');
            return;
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

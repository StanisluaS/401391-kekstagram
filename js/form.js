// файл form.js
'use strict';

(function () {

  var MAX_LENGTH_HASHTAGS = 20;
  var MAX_HASHTAGS = 5;
  var WIDTH = 455;
  var SLIDER = 91;
  window.uploadOverlay = document.querySelector('.upload-overlay');
  window.effectLevel = window.uploadOverlay.querySelector('.upload-effect-level');
  window.effectPin = window.effectLevel.querySelector('.upload-effect-level-pin');
  window.buttonDec = window.uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  window.buttonInc = window.uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var effectImage = window.uploadOverlay.querySelector('.effect-image-preview');
  var effectLine = window.effectLevel.querySelector('.upload-effect-level-line');
  var effectVal = window.effectLevel.querySelector('.upload-effect-level-val');
  var resizeValue = window.uploadOverlay.querySelector('.upload-resize-controls-value');

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
    },

    onClickPin: function (evt) {
      evt.preventDefault();
      var width = effectLine.offsetWidth;
      var slider = window.effectPin.offsetLeft;
      var classImage = window.uploadSelectImage.querySelector('img').getAttribute('class');
      var classEffect = classImage.replace('effect-image-preview ', '');

      var startCoords = {
        x: evt.clientX,
      };
      var shift = {
        x: 0,
      };

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        shift = {
          x: startCoords.x - moveEvt.clientX,
        };

        startCoords = {
          x: moveEvt.clientX,
        };

        slider -= shift.x;

        if (slider < 0) {
          slider = 0;
        }
        if (slider > width) {
          slider = 455;
        }
        effectVal.style.width = slider + 'px';
        window.effectPin.style.left = slider + 'px';

        moveSlider(classEffect, effectImage, getIndex(slider, width));

      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        window.effectLevel.removeEventListener('mousemove', onMouseMove);
        window.uploadOverlay.removeEventListener('mouseup', onMouseUp);
      }

      window.effectLevel.addEventListener('mousemove', onMouseMove);
      window.uploadOverlay.addEventListener('mouseup', onMouseUp);
    },

    // Наложение фильтров на фотографию
    setPhotoFilter: function (evt) {
      var elementTarget = evt.target;

      if (elementTarget.hasAttribute('id')) {
        window.effectLevel.classList.remove('hidden');
        var classTarget = elementTarget.getAttribute('id');
        var newClass = classTarget.replace('upload-', '');
        window.uploadSelectImage.querySelector('img').setAttribute('class', 'effect-image-preview ' + newClass);
        moveSlider(newClass, effectImage, getIndex(SLIDER, WIDTH));
        effectVal.style.width = SLIDER + 'px';
        window.effectPin.style.left = SLIDER + 'px';
      }
    },

    // изминение маштаба на табло
    getResize: function (evt) {
      var value = parseInt(resizeValue.getAttribute('value'), 10);
      if (value >= 25 && value <= 100) {
        if (evt.target === window.buttonDec) {
          resizeValue.setAttribute('value', value - 25 + '%');
          value = parseInt(resizeValue.getAttribute('value'), 10);
          if (value < 25) {
            value = 25;
            resizeValue.setAttribute('value', '25%');
          }
        }
        if (evt.target === window.buttonInc) {
          resizeValue.setAttribute('value', value + 25 + '%');
          value = parseInt(resizeValue.getAttribute('value'), 10);
          if (value > 100) {
            value = 100;
            resizeValue.setAttribute('value', '100%');
          }
        }
      }
      resizeImage(value);
    }
  };

  // маштаб картинки
  function resizeImage(valueImg) {
    window.uploadOverlay.querySelector('img').style.transform = 'scale(' + valueImg / 100 + ')';
  }

// Изминение фильтов
  function moveSlider(typeClass, element, factor) {
    if (typeClass === 'effect-none') {
      window.effectLevel.classList.add('hidden');
      element.style.filter = '';
    }

    if (typeClass === 'effect-chrome') {
      element.style.filter = 'grayscale(' + factor + ')';
    }

    if (typeClass === 'effect-sepia') {
      element.style.filter = 'sepia(' + factor + ')';
    }

    if (typeClass === 'effect-marvin') {
      element.style.filter = 'invert(' + (100 * factor) + '%)';
    }

    if (typeClass === 'effect-phobos') {
      element.style.filter = 'blur(' + (5 * factor) + 'px)';
    }

    if (typeClass === 'effect-heat') {
      element.style.filter = 'brightness(' + (3 * factor) + ')';
    }
  }

  function getIndex(sliderPozition, widthLine) {
    var index = sliderPozition / widthLine;
    return index;
  }

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

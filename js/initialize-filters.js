'use strict';

(function () {

  window.effectLevel = window.uploadOverlay.querySelector('.upload-effect-level');
  window.effectPin = window.effectLevel.querySelector('.upload-effect-level-pin');
  var uploadEffect = window.uploadOverlay.querySelector('.upload-effect-controls');
  var effectLine = window.effectLevel.querySelector('.upload-effect-level-line');
  window.effectVal = window.effectLevel.querySelector('.upload-effect-level-val');

  window.initializeFilters = function (setPhotoFilterCallback, moveSliderCallback) {
    uploadEffect.addEventListener('click', function (evt) {
      setPhotoFilterCallback(evt.target);
    });

    window.effectPin.addEventListener('mousedown', function (evt) {
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
        window.effectVal.style.width = slider + 'px';
        window.effectPin.style.left = slider + 'px';

        var index = slider / width;

        moveSliderCallback(classEffect, index);
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        window.effectLevel.removeEventListener('mousemove', onMouseMove);
        window.uploadOverlay.removeEventListener('mouseup', onMouseUp);
      }

      window.effectLevel.addEventListener('mousemove', onMouseMove);
      window.uploadOverlay.addEventListener('mouseup', onMouseUp);
    });
  };
})();

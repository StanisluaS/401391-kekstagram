'use strict';

(function () {
  var resizeValue = window.uploadOverlay.querySelector('.upload-resize-controls-value');
  var buttonDec = window.uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var buttonInc = window.uploadOverlay.querySelector('.upload-resize-controls-button-inc');

  window.initializeScale = {
    makeScale: function (resizeCallbackInc, resizeCallbackDec) {
      buttonInc.addEventListener('click', function () {
        resizeCallbackInc(resizeValue);
      });

      buttonDec.addEventListener('click', function () {
        resizeCallbackDec(resizeValue);
      });
    }
  };
})();

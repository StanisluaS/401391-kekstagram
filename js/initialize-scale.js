'use strict';

(function () {
  var buttonDec = window.uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var buttonInc = window.uploadOverlay.querySelector('.upload-resize-controls-button-inc');

  window.initializeScale = {
    makeScale: function (resizeCallbackInc, resizeCallbackDec) {
      buttonInc.addEventListener('click', function () {
        resizeCallbackInc(window.resizeValue);
      });

      buttonDec.addEventListener('click', function () {
        resizeCallbackDec(window.resizeValue);
      });
    }
  };
})();

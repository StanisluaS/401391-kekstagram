'use strict';

(function () {

  window.filter = {
    elements: function (element, printFoto, data) {
      element.addEventListener('click', function () {
        printFoto(data);
      });
    }
  };
})();

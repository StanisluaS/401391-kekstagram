'use strict';

(function () {

  var filters = document.querySelector('.filters');
  var TIME_OUTPUT = 3000; // мс время показа сообщения ошибки
  window.errorMessage = document.querySelector('.error-message');

  window.util = {
    errorHandler: function (errorMessage) {
      window.errorMessage.textContent = errorMessage;
      window.errorMessage.classList.remove('hidden');
      setTimeout(function () {
        window.errorMessage.classList.add('hidden');
        window.errorMessage.textContent = '';
      }, TIME_OUTPUT);
    },

    addHandler: function (callbackFunction) {
      filters.classList.toggle('hidden');
      filters.addEventListener('click', callbackFunction);
    }
  };
})();

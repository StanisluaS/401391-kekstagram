// файл pictures.js
'use strict';

(function () {

  var data = [];

  window.backend.load(getArrayFotos, window.util.errorHandler);

  function getArrayFotos(loadData) {
    data = loadData.map(function (it) {
      return new window.Photo(it);
    });
    window.render.printFoto(data);
    window.util.addHandler(onFilterClick);
  }

  function onFilterClick(evt) {
    // debugger;
    var target = evt.target;
    if (target === evt.currentTarget) {
      return;
    } else {
      var element;
      switch (evt.target.id) {
        case 'filter-recommend':
          element = data;
          break;
        case 'filter-popular':
          element = window.method.getPopularFoto(data);
          break;
        case 'filter-discussed':
          element = window.method.getDiscussFoto(data);
          break;
        case 'filter-random':
          element = window.method.getRandomFoto(data);
          break;
      }
      window.debounce.debounce(function () {
        window.render.printFoto(element);
      });
    }
  }

})();

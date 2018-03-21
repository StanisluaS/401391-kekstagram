'use strict';

(function () {
  window.method = {

    getPopularFoto: function (dataPopular) {
      return dataPopular.slice().sort(function (first, second) {
        if (first.likes < second.likes) {
          return 1;
        } else if (first.likes > second.likes) {
          return -1;
        } else {
          return 0;
        }
      });
    },

    getDiscussFoto: function (dataDiscuss) {
      return dataDiscuss.slice().sort(function (first, second) {
        if (first.comments.length < second.comments.length) {
          return 1;
        } else if (first.comments.length > second.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
    },

    getRandomFoto: function (dataRandom) {
      return dataRandom.slice().sort(function (first, second) {
        return Math.random() - 0.5;
      });
    }
  };
})();

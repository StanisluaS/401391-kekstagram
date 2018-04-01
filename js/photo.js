'use strict';
(function () {

  function Photo(data) {
    this.url = data.url;
    this.likes = data.likes;
    this.comments = data.comments;
  }

  window.Photo = Photo;
})();

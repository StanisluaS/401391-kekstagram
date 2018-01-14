// файл preview.js
'use strict';

(function () {

  window.galleryOverlay = document.querySelector('.gallery-overlay');

  window.preview = {
    printFotoInGallery: function (element) {
      var targetImg = element.querySelector('img').getAttribute('src');
      var targetLikes = element.querySelector('.picture-likes').textContent;
      var targetComments = element.querySelector('.picture-comments').textContent;
      window.galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', targetImg);
      window.galleryOverlay.querySelector('.likes-count').textContent = targetLikes;
      window.galleryOverlay.querySelector('.comments-count').textContent = targetComments;
    },

    printFotoInGallerys: function (elements) {
      // debugger;
      var targetImg = elements.url;
      var targetLikes = elements.likes;
      var targetComments = elements.comments;
      // debugger;
      window.galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', targetImg);
      window.galleryOverlay.querySelector('.likes-count').textContent = targetLikes;
      window.galleryOverlay.querySelector('.comments-count').textContent = targetComments.length;
    }
  };
})();

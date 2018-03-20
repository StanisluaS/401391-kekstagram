// файл preview.js
'use strict';

(function () {

  window.galleryOverlay = document.querySelector('.gallery-overlay');

  window.preview = {
    printFotoInGallery: function (element) {
      var targetImg;
      var targetLikes;
      var targetComments;
      if (element.url) {
        targetImg = element.url;
        targetLikes = element.likes;
        targetComments = element.comments.length;
      } else {
        targetImg = element.querySelector('img').getAttribute('src');
        targetLikes = element.querySelector('.picture-likes').textContent;
        targetComments = element.querySelector('.picture-comments').textContent;
      }
      window.galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', targetImg);
      window.galleryOverlay.querySelector('.likes-count').textContent = targetLikes;
      window.galleryOverlay.querySelector('.comments-count').textContent = targetComments;
    }
  };
})();

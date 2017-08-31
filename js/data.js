// файл data.js
'use strict';

(function () {
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var FOTO_COMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  window.arrayFotos = describeFotos(MIN_LIKES, MAX_LIKES, FOTO_COMENTS);

  function getRandomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomNumber(number) {
    return Math.floor(Math.random() * (number - 1));
  }

  function describeFotos(minLikes, maxLikes, comment) {
    var pictures = [];
    for (var i = 0; i < 25; i++) {
      pictures[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomMinMax(minLikes, maxLikes),
        comments: comment[getRandomNumber(comment.length)]
      };
    }
    return pictures;
  }
})();

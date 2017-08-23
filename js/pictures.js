// Файл pictures.js
'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var similarFotoTemplate = document.querySelector('#picture-template').content;
var similarListElement = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var FOTO_COMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

galleryOverlay.classList.remove('hidden');
document.querySelector('.upload-overlay').classList.add('hidden');
printFoto(describeFotos(MIN_LIKES, MAX_LIKES, FOTO_COMENTS));
printFotoInGallery(describeFotos(MIN_LIKES, MAX_LIKES, FOTO_COMENTS)[0]);

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

function getFotos(foto) {
  var fotoElement = similarFotoTemplate.cloneNode(true);
  fotoElement.querySelector('img').setAttribute('src', foto.url);
  fotoElement.querySelector('.picture-likes').textContent = foto.likes;
  fotoElement.querySelector('.picture-comments').textContent = foto.comments.length;
  return fotoElement;
}

function printFoto(fotos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < fotos.length; i++) {
    fragment.appendChild(getFotos(fotos[i]));
  }
  similarListElement.appendChild(fragment);
}

function printFotoInGallery(fotosNumber) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', fotosNumber.url);
  galleryOverlay.querySelector('.likes-count').textContent = fotosNumber.likes;
  galleryOverlay.querySelector('.comments-count').textContent = fotosNumber.comments.length;
}

// Файл pictures.js
'use strict';

var Urls = [];
for (var i = 1; i <= 25; i++) {
  Urls[i - 1] = 'photos/' + i + '.jpg';
}

var FOTO_COMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

function getRandomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomNumber(number) {
  return Math.floor(Math.random() * (number - 1));
}

function describeFotos(minLikess, maxLikes, comment) {
  var Fotos = [];
  for (var j = 0; j < 25; j++) {
    Fotos[j] = {
      url: Urls[j],
      likes: getRandomMinMax(minLikess, maxLikes),
      comments: comment[getRandomNumber(comment.length)]
    };
  }
  return Fotos;
}

var fotos = describeFotos(15, 200, FOTO_COMENTS);

var similarFotoTemplate = document.querySelector('#picture-template').content;
var similarListElement = document.querySelector('.pictures');

var getFotos = function (foto) {
  var fotoElement = similarFotoTemplate.cloneNode(true);
  fotoElement.querySelector('img').setAttribute('src', foto.url);
  fotoElement.querySelector('.picture-likes').textContent = foto.likes;
  fotoElement.querySelector('.picture-comments').textContent = foto.comments.length;
  return fotoElement;
};

function printFoto() {
  var fragment = document.createDocumentFragment();
  for (var a = 0; a < fotos.length; a++) {
    fragment.appendChild(getFotos(fotos[a]));
  }
  similarListElement.appendChild(fragment);
}

printFoto();

document.querySelector('.upload-overlay').classList.add('hidden');

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');

function printFotoInGallery(fotosNumber) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', fotosNumber.url);
  galleryOverlay.querySelector('.likes-count').textContent = fotosNumber.likes;
  galleryOverlay.querySelector('.comments-count').textContent = fotosNumber.comments.length;
}

printFotoInGallery(fotos[0]);

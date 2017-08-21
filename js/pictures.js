// Файл pictures.js
'use strict';

var similarFotoTemplate = document.querySelector('#picture-template').content;
var similarListElement = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');
document.querySelector('.upload-overlay').classList.add('hidden');
var FOTO_COMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

printFoto(describeFotos(15, 200, FOTO_COMENTS, getUrl()));
printFotoInGallery(describeFotos(15, 200, FOTO_COMENTS, getUrl())[0]);

function getUrl() {
  var urls = [];
  for (var i = 1; i <= 25; i++) {
    urls[i - 1] = 'photos/' + i + '.jpg';
  }
  return urls;
}

function getRandomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomNumber(number) {
  return Math.floor(Math.random() * (number - 1));
}

function describeFotos(minLikess, maxLikes, comment, address) {
  var pictures = [];
  for (var j = 0; j < 25; j++) {
    pictures[j] = {
      url: address[j],
      likes: getRandomMinMax(minLikess, maxLikes),
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
  for (var a = 0; a < fotos.length; a++) {
    fragment.appendChild(getFotos(fotos[a]));
  }
  similarListElement.appendChild(fragment);
}

function printFotoInGallery(fotosNumber) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', fotosNumber.url);
  galleryOverlay.querySelector('.likes-count').textContent = fotosNumber.likes;
  galleryOverlay.querySelector('.comments-count').textContent = fotosNumber.comments.length;
}

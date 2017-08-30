// Файл pictures.js
'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var MAX_LENGTH_HASHTAGS = 20;
var MAX_HASHTAGS = 5;
var similarFotoTemplate = document.querySelector('#picture-template').content;
var similarListElement = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var uploadOverlay = document.querySelector('.upload-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadImage = uploadSelectImage.querySelector('.upload-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var buttonDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var buttonInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var resizeValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var uploadEffect = uploadOverlay.querySelector('.upload-effect-controls');
var uploadFormHashtags = uploadOverlay.querySelector('.upload-form-hashtags');
var uploadFormDescription = uploadOverlay.querySelector('.upload-form-description');
var FOTO_COMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

similarListElement.addEventListener('click', openPopup);
similarListElement.addEventListener('keydown', onEnterPress);
uploadFile.addEventListener('change', openOverlay);

document.querySelector('.upload-overlay').classList.add('hidden');
printFoto(describeFotos(MIN_LIKES, MAX_LIKES, FOTO_COMENTS));

function openOverlay() {
  uploadOverlay.classList.remove('hidden');
  uploadImage.classList.add('hidden');
  uploadFile.removeEventListener('change', openOverlay);
  uploadFormCancel.addEventListener('click', closeOverlay);
  buttonDec.addEventListener('click', getResize);
  buttonInc.addEventListener('click', getResize);
  uploadEffect.addEventListener('click', setPhotoFilter);
  document.addEventListener('keydown', onEscPress);
  uploadFormCancel.addEventListener('keydown', onEnterPress);
  uploadFormHashtags.addEventListener('input', looksHashtags);
  uploadFormHashtags.addEventListener('invalid', makeRedFrame);
  uploadFormDescription.addEventListener('invalid', makeRedFrame);
  uploadFormDescription.addEventListener('input', looksFormDescription);
}

function closeOverlay() {
  uploadOverlay.classList.add('hidden');
  uploadImage.classList.remove('hidden');
  uploadFile.addEventListener('change', openOverlay);
  uploadFormCancel.removeEventListener('click', closeOverlay);
  buttonDec.removeEventListener('click', getResize);
  buttonInc.removeEventListener('click', getResize);
  uploadEffect.removeEventListener('click', setPhotoFilter);
  document.removeEventListener('keydown', onEscPress);
  uploadFormCancel.removeEventListener('keydown', onEnterPress);
  uploadFormHashtags.removeEventListener('input', looksHashtags);
  uploadFormHashtags.removeEventListener('invalid', makeRedFrame);
  uploadFormDescription.removeEventListener('invalid', makeRedFrame);
  uploadFormDescription.removeEventListener('input', looksFormDescription);
}

function openPopup(evt) {
  var target = evt.target.parentNode;
  printFotoInGallery(target);
  galleryOverlay.classList.remove('hidden');
  galleryOverlayClose.addEventListener('click', closePopup);
  document.addEventListener('keydown', onEscPress);
  similarListElement.removeEventListener('click', openPopup);
  similarListElement.removeEventListener('keydown', onEnterPress);
  galleryOverlayClose.addEventListener('keydown', onEnterPress);
}

function closePopup() {
  galleryOverlay.classList.add('hidden');
  galleryOverlayClose.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', onEscPress);
  similarListElement.addEventListener('click', openPopup);
  similarListElement.addEventListener('keydown', onEnterPress);
  galleryOverlayClose.removeEventListener('keydown', onEnterPress);
}

function onEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE && evt.currentTarget === similarListElement) {
    openPopup();
  }
  if (evt.keyCode === ENTER_KEYCODE && evt.target === galleryOverlayClose) {
    closePopup();
  }
  if (evt.keyCode === ENTER_KEYCODE && evt.target === uploadFormCancel) {
    closeOverlay();
  }
}

function onEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
    closeOverlay();
  }
}

// Наложение фильтров на фотографию
function setPhotoFilter(evt) {
  var classTarget = evt.target.parentNode.getAttribute('for');
  var newClassTarget = [];
  var newClass = '';
  for (var i = 0; i < (classTarget.length - 7); i++) {
    newClassTarget[i] = classTarget[i + 7];
    newClass += newClassTarget[i];
  }
  uploadSelectImage.querySelector('img').setAttribute('class', newClass);
}

// изминение маштаба на табло
function getResize(evt) {
  var value = parseInt(resizeValue.getAttribute('value'), 10);
  if (value >= 25 && value <= 100) {
    if (evt.target === buttonDec) {
      resizeValue.setAttribute('value', value - 25 + '%');
      value = parseInt(resizeValue.getAttribute('value'), 10);
      if (value < 25) {
        value = 25;
        resizeValue.setAttribute('value', '25%');
      }
    }
    if (evt.target === buttonInc) {
      resizeValue.setAttribute('value', value + 25 + '%');
      value = parseInt(resizeValue.getAttribute('value'), 10);
      if (value > 100) {
        value = 100;
        resizeValue.setAttribute('value', '100%');
      }
    }
  }
  resizeImage(value);
}

// маштаб картинки
function resizeImage(valueImg) {
  uploadOverlay.querySelector('img').style.transform = 'scale(' + valueImg / 100 + ')';
}

// волидация поля коментариев
function looksFormDescription(evt) {
  evt.target.style.borderColor = '';
}

// волидация поля хештегов
function looksHashtags(evt) {
  var arrayHastags = evt.target.value.split(' ');
  if (arrayHastags.length > MAX_HASHTAGS) {
    evt.target.setCustomValidity('Максимум можно использовать' + MAX_HASHTAGS + 'хеш-тегов');
  } else if (hasLongElements(arrayHastags, MAX_LENGTH_HASHTAGS)) {
    evt.target.setCustomValidity('Максимальная длина одного хэш-тега' + MAX_LENGTH_HASHTAGS + 'символов');
  } else if (hasElementsLattice(arrayHastags) && arrayHastags.toString()) {
    evt.target.setCustomValidity('Хэш-тег начинается с символа `#` и должен включать одно слово');
  } else if (hasElementsWithSpace(arrayHastags)) {
    evt.target.setCustomValidity('Хэш-теги разделяются пробелами');
  } else if (hasDuplicateElement(arrayHastags)) {
    evt.target.setCustomValidity('Хэш-теги не должны повторяться');
  } else {
    evt.target.setCustomValidity('');
    evt.target.style.borderColor = '';
  }
}

// Доп функции для хештегов
function hasLongElements(array, maxLength) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].length > maxLength) {
      return true;
    }
  }
  return false;
}

function hasElementsLattice(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].slice(0, 1) !== '#') {
      return true;
    }
  }
  return false;
}

function hasElementsWithSpace(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].indexOf('#', 1) !== -1) {
      return true;
    }
  }
  return false;
}

function hasDuplicateElement(array) {
  var obj = {};

  for (var i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      return true;
    }
    obj[array[i]] = true;
  }
  return false;
}

function makeRedFrame(evt) {
  if (!evt.target.validity.valid) {
    evt.target.style.borderColor = 'red';
  }
}

function printFotoInGallery(element) {
  var targetImg = element.querySelector('img').getAttribute('src');
  var targetLikes = element.querySelector('.picture-likes').textContent;
  var targetComments = element.querySelector('.picture-comments').textContent;
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', targetImg);
  galleryOverlay.querySelector('.likes-count').textContent = targetLikes;
  galleryOverlay.querySelector('.comments-count').textContent = targetComments;
}

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

// файл gallery.js
'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var uploadOverlay = document.querySelector('.upload-overlay');
  var galleryOverlayClose = window.galleryOverlay.querySelector('.gallery-overlay-close');
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

  window.similarListElement.addEventListener('click', openPopup);
  window.similarListElement.addEventListener('keydown', onEnterPress);
  uploadFile.addEventListener('change', openOverlay);

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
    uploadFormHashtags.addEventListener('input', window.validationForm.looksHashtags);
    uploadFormHashtags.addEventListener('invalid', window.validationForm.addRedFrame);
    uploadFormDescription.addEventListener('invalid', window.validationForm.addRedFrame);
    uploadFormDescription.addEventListener('input', window.validationForm.looksFormDescription);
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
    uploadFormHashtags.removeEventListener('input', window.validationForm.looksHashtags);
    uploadFormHashtags.removeEventListener('invalid', window.validationForm.addRedFrame);
    uploadFormDescription.removeEventListener('invalid', window.validationForm.addRedFrame);
    uploadFormDescription.removeEventListener('input', window.validationForm.looksFormDescription);
  }

  function openPopup(evt) {
    var target = evt.target.parentNode;
    window.preview.printFotoInGallery(target);
    window.galleryOverlay.classList.remove('hidden');
    galleryOverlayClose.addEventListener('click', closePopup);
    document.addEventListener('keydown', onEscPress);
    window.similarListElement.removeEventListener('click', openPopup);
    window.similarListElement.removeEventListener('keydown', onEnterPress);
    galleryOverlayClose.addEventListener('keydown', onEnterPress);
  }

  function closePopup() {
    window.galleryOverlay.classList.add('hidden');
    galleryOverlayClose.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', onEscPress);
    window.similarListElement.addEventListener('click', openPopup);
    window.similarListElement.addEventListener('keydown', onEnterPress);
    galleryOverlayClose.removeEventListener('keydown', onEnterPress);
  }

  function onEnterPress(evt) {
    if (evt.keyCode === ENTER_KEYCODE && evt.currentTarget === window.similarListElement) {
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

})();

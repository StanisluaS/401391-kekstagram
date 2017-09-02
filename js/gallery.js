// файл gallery.js
'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var galleryOverlayClose = window.galleryOverlay.querySelector('.gallery-overlay-close');
  window.uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadImage = window.uploadSelectImage.querySelector('.upload-image');
  var uploadFile = window.uploadSelectImage.querySelector('#upload-file');
  var uploadFormCancel = window.uploadOverlay.querySelector('.upload-form-cancel');
  var uploadEffect = window.uploadOverlay.querySelector('.upload-effect-controls');
  var uploadFormHashtags = window.uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadFormDescription = window.uploadOverlay.querySelector('.upload-form-description');
  var effectLevel = window.uploadOverlay.querySelector('.upload-effect-level');


  window.similarListElement.addEventListener('click', openPopup);
  window.similarListElement.addEventListener('keydown', onEnterPress);
  uploadFile.addEventListener('change', openOverlay);

  function openOverlay() {
    window.uploadOverlay.classList.remove('hidden');
    uploadImage.classList.add('hidden');
    effectLevel.classList.add('hidden');
    uploadFile.removeEventListener('change', openOverlay);
    uploadFormCancel.addEventListener('click', closeOverlay);
    window.buttonDec.addEventListener('click', window.validationForm.getResize);
    window.buttonInc.addEventListener('click', window.validationForm.getResize);
    uploadEffect.addEventListener('click', window.validationForm.setPhotoFilter);
    window.effectPin.addEventListener('mousedown', window.validationForm.onClickPin);
    document.addEventListener('keydown', onEscPress);
    uploadFormCancel.addEventListener('keydown', onEnterPress);
    uploadFormHashtags.addEventListener('input', window.validationForm.looksHashtags);
    uploadFormHashtags.addEventListener('invalid', window.validationForm.addRedFrame);
    uploadFormDescription.addEventListener('invalid', window.validationForm.addRedFrame);
    uploadFormDescription.addEventListener('input', window.validationForm.looksFormDescription);
  }

  function closeOverlay() {
    window.uploadOverlay.classList.add('hidden');
    uploadImage.classList.remove('hidden');
    uploadFile.addEventListener('change', openOverlay);
    uploadFormCancel.removeEventListener('click', closeOverlay);
    window.buttonDec.removeEventListener('click', window.validationForm.getResize);
    window.buttonInc.removeEventListener('click', window.validationForm.getResize);
    uploadEffect.removeEventListener('click', window.validationForm.setPhotoFilter);
    window.effectPin.removeEventListener('mousedown', window.validationForm.onClickPin);
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

})();

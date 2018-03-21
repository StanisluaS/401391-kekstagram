// файл gallery.js
'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var galleryOverlayClose = window.galleryOverlay.querySelector('.gallery-overlay-close');
  var uploadFile = window.uploadSelectImage.querySelector('#upload-file');
  var uploadFormCancel = window.uploadOverlay.querySelector('.upload-form-cancel');
  var uploadFormHashtags = window.uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadFormDescription = window.uploadOverlay.querySelector('.upload-form-description');
  var effectLevel = window.uploadOverlay.querySelector('.upload-effect-level');
  window.effectImage = window.uploadOverlay.querySelector('.effect-image-preview');
  window.resizeValue = window.uploadOverlay.querySelector('.upload-resize-controls-value');

  window.similarListElement.addEventListener('click', openPopup);
  window.similarListElement.addEventListener('keydown', onEnterPress);
  uploadFile.addEventListener('change', openOverlay);

  function openOverlay() {
    window.uploadOverlay.classList.remove('hidden');
    window.uploadImage.classList.add('hidden');
    effectLevel.classList.add('hidden');
    uploadFile.removeEventListener('change', openOverlay);
    uploadFormCancel.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', onEscPress);
    uploadFormCancel.addEventListener('keydown', onEnterPress);
    uploadFormHashtags.addEventListener('blur', window.validationForm.looksHashtags);
    uploadFormDescription.addEventListener('blur', window.validationForm.looksFormDescription);
    window.uploadSelectImage.addEventListener('submit', submitForm);
  }

  function closeOverlay() {
    removeEffect();
    window.errorMessage.classList.add('hidden');
    window.uploadOverlay.classList.add('hidden');
    window.uploadImage.classList.remove('hidden');
    uploadFile.addEventListener('change', openOverlay);
    uploadFormCancel.removeEventListener('click', closeOverlay);
    document.removeEventListener('keydown', onEscPress);
    uploadFormCancel.removeEventListener('keydown', onEnterPress);
    uploadFormHashtags.removeEventListener('blur', window.validationForm.looksHashtags);
    uploadFormDescription.removeEventListener('blur', window.validationForm.looksFormDescription);
    window.uploadSelectImage.removeEventListener('submit', submitForm);
  }

  function openPopup(evt) {
    var target = evt.target;
    if (target.classList.contains('pictures')) {
      return;
    } else {
      while (target.parentNode !== evt.currentTarget) {
        target = target.parentNode;
        if (target.classList.contains('picture')) {
          window.preview.printFotoInGallery(target);
          window.galleryOverlay.classList.remove('hidden');
          galleryOverlayClose.addEventListener('click', closePopup);
          document.addEventListener('keydown', onEscPress);
          window.similarListElement.removeEventListener('click', openPopup);
          window.similarListElement.removeEventListener('keydown', onEnterPress);
          galleryOverlayClose.addEventListener('keydown', onEnterPress);
          return;
        }
      }
    }
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
      removeEffect();
    }
  }

  function onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
      closeOverlay();
      removeEffect();
    }
  }

  function submitForm(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.uploadSelectImage), function () {
      closeOverlay();
      window.uploadSelectImage.reset();
    }
    , window.pictures.errorHandler);
  }

  function removeEffect() {
    window.effectImage.style.filter = '';
    window.uploadSelectImage.querySelector('img').setAttribute('class', 'effect-image-preview');
    window.uploadOverlay.querySelector('img').style.transform = '';
    window.resizeValue.setAttribute('value', '100%');
    uploadFormHashtags.style.borderColor = '';
  }

})();

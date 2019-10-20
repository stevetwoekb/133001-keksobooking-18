'use strict';
window.utils = (function () {
  var KEY_CODE_ESC = 27;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adAddress = adForm.querySelector('#address');
  var mapMainPin = document.querySelector('.map__pin--main');
  var errorElement = cloneElements('#error', '.error');
  var successElement = cloneElements('#success', '.success');
  var mainElement = document.querySelector('main');
  var errorBtn;
  var docFragment = document.createDocumentFragment();

  function flexNormalize(number, forms) {
    number = Number(number);
    if (number % 100 === 11) {
      return forms[0];
    }
    var remainder = number % 10;
    switch (true) {
      case remainder === 0 || remainder > 4:
        return forms[0];
      case remainder === 1:
        return forms[1];
      default:
        return forms[2];
    }
  }

  function roomsFlexNormalize(number) {
    var forms = ['комнат', 'комната', 'комнаты'];
    return flexNormalize(number, forms);
  }

  function guestsFlexNormalize(number) {
    var forms = ['гостей', 'гостя', 'гостей'];
    return flexNormalize(number, forms);
  }

  function cloneElements(templateSelector, elementSelector) {
    return document.querySelector(templateSelector).content.querySelector(elementSelector).cloneNode(true);
  }

  function closeMessageError() {
    mainElement.removeChild(errorElement);
    document.removeEventListener('keydown', onMessageErrorKeydown);
    document.removeEventListener('click', onMessageErrorClick);
    errorBtn.removeEventListener('click', onErrorBtnClick);
  }

  function closeMessageSuccess() {
    mainElement.removeChild(successElement);
    document.removeEventListener('keydown', onMessageSuccessKeydown);
    document.removeEventListener('click', onMessageSuccessClick);
  }

  function onMessageErrorKeydown(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeMessageError();
    }
  }

  function onMessageErrorClick() {
    closeMessageError();
  }

  function onMessageSuccessKeydown(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeMessageSuccess();
    }
  }

  function onMessageSuccessClick() {
    closeMessageSuccess();
  }

  function onErrorBtnClick(evt) {
    evt.stopPropagation();
    closeMessageError();
  }

  function showMessageError() {
    docFragment.appendChild(errorElement);
    mainElement.appendChild(docFragment);
    document.addEventListener('keydown', onMessageErrorKeydown);
    errorElement.addEventListener('click', onMessageErrorClick);
    errorBtn = document.querySelector('.error__button');
    errorBtn.addEventListener('click', onErrorBtnClick);
  }

  function showMessageSuccess() {
    docFragment.appendChild(successElement);
    mainElement.appendChild(docFragment);
    document.addEventListener('keydown', onMessageSuccessKeydown);
    successElement.addEventListener('click', onMessageSuccessClick);
  }

  return {
    mapElement: map,
    form: adForm,
    address: adAddress,
    mainPin: mapMainPin,
    rooms: roomsFlexNormalize,
    guests: guestsFlexNormalize,
    clone: cloneElements,
    showMessageError: showMessageError,
    showMessageSuccess: showMessageSuccess,
    KEY_CODE_ESC: KEY_CODE_ESC,
  };
})();

'use strict';
window.utils = (function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('#address');
  var mapMainPin = document.querySelector('.map__pin--main');
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function shuffleArray(array) {
    var newArray = array.slice();
    for (var i = newArray.length - 1; i > 0; i--) {
      var j = getRandomNumberInRange(0, newArray.length);
      var temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  }

  function getArrayWithRandomLength(array) {
    return shuffleArray(array).slice(0, getRandomNumberInRange(0, array.length));
  }

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

  return {
    mapElement: map,
    adForm: adForm,
    address: address,
    mapMainPin: mapMainPin,
    randomElement: getRandomElement,
    randomLengthArray: getArrayWithRandomLength,
    numberRange: getRandomNumberInRange,
    rooms: roomsFlexNormalize,
    guests: guestsFlexNormalize,
    clone: cloneElements,
  };
})();

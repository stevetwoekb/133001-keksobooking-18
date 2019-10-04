'use strict';
window.validators = (function () {
  var form = window.utils.form;
  var price = form.querySelector('#price');
  var roomsCapacityMap = {
    '1': {
      'guests': ['1'],
      'errorText': '1 комната для 1 гостя'
    },
    '2': {
      'guests': ['1', '2'],
      'errorText': '2 комнаты для 1 или 2 гостей'
    },
    '3': {
      'guests': ['1', '2', '3'],
      'errorText': '3 комнаты для 1, 2 или 3 гостей'
    },
    '100': {
      'guests': ['0'],
      'errorText': '100 комнат не для гостей'
    },
  };

  function setPriceValidator() {
    var type = form.querySelector('#type');
    type.addEventListener('input', onTypeClick);

    function onTypeClick() {
      switch (type.value) {
        case 'bungalo':
          setNewParams('0');
          break;
        case 'flat':
          setNewParams('1000');
          break;
        case 'house':
          setNewParams('5000');
          break;
        case 'palace':
          setNewParams('10000');
          break;
      }
    }

    function setNewParams(minPrice) {
      price.setAttribute('min', minPrice);
      price.placeholder = minPrice;
    }
  }

  function setChecksValidator() {
    var timeIn = form.querySelector('#timein');
    var timeOut = form.querySelector('#timeout');

    function onTimeInClick() {
      timeOut.value = timeIn.value;
    }

    function onTimeOutClick() {
      timeIn.value = timeOut.value;
    }

    timeIn.addEventListener('input', onTimeInClick);
    timeOut.addEventListener('input', onTimeOutClick);

  }

  function validateRoomsNumbers() {
    var roomsSelect = document.querySelector('[name="rooms"]');
    var rooms = roomsSelect.value;
    var guests = document.querySelector('[name="capacity"]').value;
    roomsSelect.setCustomValidity(roomsCapacityMap[rooms].guests.includes(guests) ? '' : roomsCapacityMap[rooms].errorText);
  }

  return {
    setPrice: setPriceValidator,
    setChecks: setChecksValidator,
    setRooms: validateRoomsNumbers,

  };
})();

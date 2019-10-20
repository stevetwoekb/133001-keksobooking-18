'use strict';
window.pin = (function () {
  var LOCATION_Y_MIN = 130;
  var mainPin = window.utils.mainPin;
  var PIN_DEFAULT_X_POSITION = 570;
  var PIN_DEFAULT_Y_POSITION = 375;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var clone = window.utils.clone;
  var clearCards = window.cards.clear;
  var renderCard = window.cards.render;
  var address = window.utils.address;
  var mapPinsElement = document.querySelector('.map__pins');

  function getAddressWithPin(pin) {
    var x = Math.floor(parseInt(pin.style.left, 10) + PIN_HEIGHT);
    var y = Math.floor(parseInt(pin.style.top, 10) + PIN_WIDTH);
    return x + ', ' + y;
  }

  function setAddress(pin) {
    address.value = getAddressWithPin(pin);
  }

  function renderPin(props) {
    var pinElement = clone('#pin', '.map__pin');
    pinElement.querySelector('img').src = '';
    pinElement.style.left = (props.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (props.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = props.author.avatar;
    pinElement.querySelector('img').alt = props.offer.title;
    function onPinClick() {
      clearCards();
      renderCard(props);
    }
    pinElement.addEventListener('click', onPinClick);
    return pinElement;
  }
  function clearPins() {
    mainPin.style.left = PIN_DEFAULT_X_POSITION + 'px';
    mainPin.style.top = PIN_DEFAULT_Y_POSITION + 'px';
    setAddress(mainPin);
    mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (element) {
      element.remove();
    });
  }
  function renderPins(pins) {
    clearPins();
    var docFragment = document.createDocumentFragment();
    pins.forEach(function (element) {
      docFragment.appendChild(renderPin(element));
    });
    mapPinsElement.appendChild(docFragment);
  }

  return {
    address: setAddress,
    addressWithPin: getAddressWithPin,
    render: renderPins,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    clear: clearPins,
  };
})();

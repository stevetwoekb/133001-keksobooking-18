'use strict';
window.pin = (function () {
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = 1200;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var numberRange = window.utils.numberRange;
  var Author = window.data.Author;
  var Offer = window.data.Offer;
  var clone = window.utils.clone;
  var clearCards = window.cards.clear;
  var renderCard = window.cards.render;
  var address = window.utils.address;

  function PinPosition() {
    var pinsWrapper = document.querySelector('.map__pins');
    var pin = document.querySelector('.map__pin');
    LOCATION_X_MIN = pin.offsetWidth / 2;
    LOCATION_X_MAX = pinsWrapper.offsetWidth - (pin.offsetWidth / 2);
    this.x = numberRange(LOCATION_X_MIN, LOCATION_X_MAX);
    this.y = numberRange(LOCATION_Y_MIN, LOCATION_Y_MAX);
  }

  function Pin(number) {
    this.author = new Author(number);
    this.location = new PinPosition();
    this.offer = new Offer(this.location);
  }

  function getPins(number) {
    return new Array(number).fill('').map(function (element, index) {
      return new Pin(index + 1);
    });
  }

  function getAddressWithPinDisabled(pin) {
    var x = Math.floor(parseInt(pin.style.left, 10) + (pin.offsetHeight / 2));
    var y = Math.floor(parseInt(pin.style.top, 10) + (pin.offsetWidth / 2));
    return x + ', ' + y;
  }

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

  function renderPins(pins) {
    var mapPinsElement = document.querySelector('.map__pins');
    var docFragment = document.createDocumentFragment();
    pins.forEach(function (element) {
      docFragment.appendChild(renderPin(element));
    });
    mapPinsElement.appendChild(docFragment);
  }

  return {
    address: setAddress,
    get: getPins,
    disabledAddress: getAddressWithPinDisabled,
    render: renderPins,
    addressPosition: getAddressWithPin,
    maxLocationY: LOCATION_Y_MIN
  };
})();

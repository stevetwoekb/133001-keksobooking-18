'use strict';
window.pin = (function () {
  var LOCATION_Y_MIN = 130;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var clone = window.utils.clone;
  var clearCards = window.cards.clear;
  var renderCard = window.cards.render;
  var address = window.utils.address;

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
    disabledAddress: getAddressWithPinDisabled,
    render: renderPins,
    LOCATION_Y_MIN: LOCATION_Y_MIN
  };
})();

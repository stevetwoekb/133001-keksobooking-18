'use strict';
window.map = (function () {
  var DATA_COUNT = 8;
  var KEY_CODE_ENTER = 13;
  var map = window.utils.mapElement;
  var getPins = window.pin.get;
  var setAddress = window.pin.address;
  var render = window.pin.render;
  var setPrice = window.validators.setPrice;
  var setChecks = window.validators.setChecks;
  var adFormEnable = window.form.enable;
  var mainPin = window.utils.mainPin;
  var pins = getPins(DATA_COUNT);
  var mapWidth = map.offsetWidth;
  var mapHeight = map.offsetHeight;
  var mapMinHeight = window.pin.maxLocationY;
  var pinWidth = mainPin.offsetWidth;
  var pinPosition = {
    x: parseInt(mainPin.style.left, 10),
    y: parseInt(mainPin.style.top, 10),
  };
  var startPosition = {
    x: 0,
    y: 0,
  };

  var updatePosition = {
    x: 0,
    y: 0,
  };


  function onMapPinMousedown(evt) {
    enableMap();
    startPosition.x = evt.clientX;
    startPosition.y = evt.clientY;
    mainPin.addEventListener('mousemove', onMapPinMousemove);
  }

  function onMapPinMouseup() {
    mainPin.removeEventListener('mousemove', onMapPinMousemove);
    pinPosition.x = parseInt(mainPin.style.left, 10);
    pinPosition.y = parseInt(mainPin.style.top, 10);
  }

  function onMapPinMousemove(evt) {
    updatePosition.x = startPosition.x - evt.clientX;
    updatePosition.y = startPosition.y - evt.clientY;
    var newPositionX = pinPosition.x - updatePosition.x;
    var newPositionY = pinPosition.y - updatePosition.y;
    if (newPositionX >= 0 && newPositionY >= 0 && newPositionY <= (mapHeight - mapMinHeight) && newPositionX <= (mapWidth - pinWidth)) {
      mainPin.style.left = newPositionX + 'px';
      mainPin.style.top = newPositionY + 'px';
      setAddress(mainPin);
    }
  }

  function onMapPinKeydown(evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      enableMap();
    }
  }

  function enableMap() {
    map.classList.remove('map--faded');
    adFormEnable();
    setAddress(mainPin);
    setPrice();
    setChecks();
    render(pins);
    mainPin.removeEventListener('keydown', onMapPinKeydown);
  }

  mainPin.addEventListener('mouseup', onMapPinMouseup);
  mainPin.addEventListener('mousedown', onMapPinMousedown);
  mainPin.addEventListener('keydown', onMapPinKeydown);
})();

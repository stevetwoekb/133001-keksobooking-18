'use strict';
window.map = (function () {
  var KEY_CODE_ENTER = 13;
  var LOCATION_Y_MIN = window.pin.LOCATION_Y_MIN;
  var map = window.utils.mapElement;
  var setAddress = window.pin.address;
  var render = window.pin.render;
  var setPrice = window.validators.setPrice;
  var setChecks = window.validators.setChecks;
  var adFormEnable = window.form.enable;
  var mainPin = window.utils.mainPin;
  var showMessageError = window.utils.showMessageError;
  var mapWidth = map.offsetWidth;
  var mapHeight = map.offsetHeight;
  var pinWidth = mainPin.offsetWidth;
  var load = window.backend.load;

  function onMapPinMousedown() {
    enableMap();
    mainPin.removeEventListener('mousedown', onMapPinMousedown);
  }

  function onMapPinMoveMousedown(evt) {
    var startPosition = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var pinPosition = {
      x: parseInt(mainPin.style.left, 10),
      y: parseInt(mainPin.style.top, 10),
    };

    function getNewPosition(evtMove) {
      var newPositionX = pinPosition.x - (startPosition.x - evtMove.clientX);
      var newPositionY = pinPosition.y - (startPosition.y - evtMove.clientY);
      var maxHeightPosition = mapHeight - LOCATION_Y_MIN;
      var maxWidthPosition = mapWidth - pinWidth;
      if (newPositionX >= 0 && newPositionY >= 0 && newPositionY <= maxHeightPosition && newPositionX <= maxWidthPosition) {
        mainPin.style.left = newPositionX + 'px';
        mainPin.style.top = newPositionY + 'px';
        setAddress(mainPin);
      }
    }

    function onMapPinMousemove(evtMove) {
      getNewPosition(evtMove);
    }

    function onMapPinMouseup() {
      document.removeEventListener('mousemove', onMapPinMousemove);
    }
    document.addEventListener('mouseup', onMapPinMouseup);
    document.addEventListener('mousemove', onMapPinMousemove);
  }

  function onMapPinKeydown(evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      enableMap();
    }
  }

  function onLoad(data) {
    render(data);
  }
  function onError() {
    showMessageError();
  }

  function enableMap() {
    map.classList.remove('map--faded');
    adFormEnable();
    setAddress(mainPin);
    setPrice();
    setChecks();
    load(onLoad, onError);
    mainPin.removeEventListener('keydown', onMapPinKeydown);
    mainPin.removeEventListener('mousedown', onMapPinMousedown);
  }

  mainPin.addEventListener('mousedown', onMapPinMousedown);
  mainPin.addEventListener('mousedown', onMapPinMoveMousedown);
  mainPin.addEventListener('keydown', onMapPinKeydown);
})();

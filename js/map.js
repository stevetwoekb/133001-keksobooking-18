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


  function onMapPinMousedown() {
    enableMap();
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
    mainPin.removeEventListener('mousedown', onMapPinMousedown);
    mainPin.removeEventListener('keydown', onMapPinKeydown);
  }

  mainPin.addEventListener('mousedown', onMapPinMousedown);
  mainPin.addEventListener('keydown', onMapPinKeydown);
})();

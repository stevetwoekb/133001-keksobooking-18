'use strict';
window.map = (function () {
  var DATA_COUNT = 8;
  var KEY_CODE_ENTER = 13;
  var map = window.utils.mapElement;
  var getPins = window.pin.pins;
  var setAddress = window.pin.address;
  var render = window.pin.render;
  var priceValidator = window.validators.priceValidator;
  var checksValidator = window.validators.checksValidator;
  var adFormEnable = window.form.enable;
  var mapMainPin = document.querySelector('.map__pin--main');
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
    setAddress(mapMainPin);
    priceValidator();
    checksValidator();
    render(pins);
    mapMainPin.removeEventListener('mousedown', onMapPinMousedown);
    mapMainPin.removeEventListener('keydown', onMapPinKeydown);
  }

  mapMainPin.addEventListener('mousedown', onMapPinMousedown);
  mapMainPin.addEventListener('keydown', onMapPinKeydown);

  return {
    mapElement: map
  };
})();

'use strict';
window.map = (function () {
  var DATA_COUNT = 8;
  var KEY_CODE_ENTER = 13;
  var map = window.utils.mapElement;
  var mapMainPin = document.querySelector('.map__pin--main');
  var getPins = window.pin.getPins;
  var pins = getPins(DATA_COUNT);
  var setAddress = window.pin.setAddress;
  var render = window.pin.render;
  var setPriceValidator = window.validators.setPriceValidator;
  var setChecksValidator = window.validators.setChecksValidator;
  var adFormEnable = window.form.adFormEnable;


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
    setPriceValidator();
    setChecksValidator();
    render(pins);
    mapMainPin.removeEventListener('mousedown', onMapPinMousedown);
    mapMainPin.removeEventListener('keydown', onMapPinKeydown);
  }

  mapMainPin.addEventListener('mousedown', onMapPinMousedown);
  mapMainPin.addEventListener('keydown', onMapPinKeydown);

  return {
    mapElement: map,
    enableMap: enableMap,
  };
})();

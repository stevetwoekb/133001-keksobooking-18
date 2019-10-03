'use strict';
window.form = (function () {
  var mapMainPin = window.utils.mapMainPin;
  var adForm = window.utils.adForm;
  var pinDisabledAddress = window.pin.pinDisabledAddress;
  var roomsValidator = window.validators.roomsValidator;
  var child = adForm.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
  var mapFeatures = mapFiltersForm.querySelectorAll('.map__features');
  var submitBtn = adForm.querySelector('.ad-form__submit');

  function adFormEnable() {
    adForm.classList.remove('ad-form--disabled');

    function removeDisabledAttr(array) {
      array.forEach(function (element) {
        element.removeAttribute('disabled');
      });
    }

    removeDisabledAttr(child);
    removeDisabledAttr(mapFilters);
    removeDisabledAttr(mapFeatures);
  }

  function addDisabledAttr(array) {
    array.forEach(function (element) {
      element.setAttribute('disabled', '');
    });
  }

  function adFormDisabled() {
    address.value = pinDisabledAddress(mapMainPin);
    addDisabledAttr(child);
    addDisabledAttr(mapFilters);
    addDisabledAttr(mapFeatures);
  }

  function onSubmitButtonClick() {
    roomsValidator();
  }
  submitBtn.addEventListener('click', onSubmitButtonClick);
  adFormDisabled();
  return {
    enable: adFormEnable,
  };
})();

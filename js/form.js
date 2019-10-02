'use strict';
window.form = (function () {
  var mapMainPin = window.utils.mapMainPin;
  var adForm = window.utils.adForm;
  var child = adForm.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
  var mapFeatures = mapFiltersForm.querySelectorAll('.map__features');
  var submitBtn = adForm.querySelector('.ad-form__submit');
  var getAddressWithPinDisabled = window.pin.getAddressWithPinDisabled;
  var validateRoomsNumbers = window.validators.validateRoomsNumbers;

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
    address.value = getAddressWithPinDisabled(mapMainPin);
    addDisabledAttr(child);
    addDisabledAttr(mapFilters);
    addDisabledAttr(mapFeatures);
  }

  function onSubmitButtonClick() {
    validateRoomsNumbers();
  }
  submitBtn.addEventListener('click', onSubmitButtonClick);
  adFormDisabled();
  return {
    adFormEnable: adFormEnable,
    adFormDisabled: adFormDisabled,
  };
})();

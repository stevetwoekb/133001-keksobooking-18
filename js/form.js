'use strict';
window.form = (function () {
  var mainPin = window.utils.mainPin;
  var form = window.utils.form;
  var disabledAddress = window.pin.disabledAddress;
  var setRooms = window.validators.setRooms;
  var address = window.utils.address;
  var child = form.querySelectorAll('fieldset');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
  var mapFeatures = mapFiltersForm.querySelectorAll('.map__features');
  var submitBtn = form.querySelector('.ad-form__submit');

  function adFormEnable() {
    form.classList.remove('ad-form--disabled');

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
    address.value = disabledAddress(mainPin);
    addDisabledAttr(child);
    addDisabledAttr(mapFilters);
    addDisabledAttr(mapFeatures);
  }

  function onSubmitButtonClick() {
    setRooms();
  }
  submitBtn.addEventListener('click', onSubmitButtonClick);
  adFormDisabled();
  return {
    enable: adFormEnable,
  };
})();

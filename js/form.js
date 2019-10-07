'use strict';
window.form = (function () {
  var mainPin = window.utils.mainPin;
  var form = window.utils.form;
  var disabledAddress = window.pin.disabledAddress;
  var setRooms = window.validators.setRooms;
  var address = window.utils.address;
  var save = window.backend.save;
  var showMessageError = window.utils.showMessageError;
  var showMessageSuccess = window.utils.showMessageSuccess;
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

  function onSubmitButtonClick(evt) {
    evt.preventDefault();
    setRooms();

    var data = new FormData(form);
    save(data, onSuccess, onError);
    function onSuccess() {
      showMessageSuccess();
    }

    function onError() {
      showMessageError();
    }
  }
  submitBtn.addEventListener('click', onSubmitButtonClick);
  adFormDisabled();
  return {
    enable: adFormEnable,
  };
})();

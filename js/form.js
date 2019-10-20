'use strict';
window.form = (function () {
  var mainPin = window.utils.mainPin;
  var form = window.utils.form;
  var addressWithPin = window.pin.addressWithPin;
  var setRooms = window.validators.setRooms;
  var address = window.utils.address;
  var save = window.backend.save;
  var showMessageError = window.utils.showMessageError;
  var showMessageSuccess = window.utils.showMessageSuccess;
  var child = form.querySelectorAll('fieldset');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
  var mapFeatures = mapFiltersForm.querySelectorAll('.map__features');
  var mapFeaturesCheckboxes = document.querySelectorAll('.feature__checkbox');
  var submitBtn = form.querySelector('.ad-form__submit');
  var clearBtn = form.querySelector('.ad-form__reset');

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
    form.classList.add('ad-form--disabled');
    address.value = addressWithPin(mainPin);
    addDisabledAttr(child);
    addDisabledAttr(mapFilters);
    addDisabledAttr(mapFeatures);
  }
  function onSubmitButtonClick(evt) {
    setRooms();
    var isValid = form.checkValidity();
    var data = new FormData(form);

    function onSuccess() {
      showMessageSuccess();
      resetForm();
    }

    function onError() {
      showMessageError();
    }
    if (isValid) {
      evt.preventDefault();
      save(data, onSuccess, onError);
    }
  }
  function clearForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#description').value = '';
    var formSelects = form.querySelectorAll('.ad-form__element select');
    formSelects.forEach(function (element) {
      if (element.id === 'type') {
        element.selectedIndex = 1;
      } else {
        element.selectedIndex = 0;
      }
    });
  }

  function resetForm() {
    adFormDisabled();
    clearForm();
    window.cards.clear();
    window.map.disable();
    window.filters.clear();
    window.pin.clear();
    window.files.clear();
    mapFeaturesCheckboxes.forEach(function (element) {
      element.checked = false;
    });
  }
  submitBtn.addEventListener('click', onSubmitButtonClick);
  clearBtn.addEventListener('click', resetForm);

  adFormDisabled();
  return {
    enable: adFormEnable,
  };
})();

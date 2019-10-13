'use strict';
window.filters = (function () {
  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;
  var render = window.pin.render;
  var clearCards = window.cards.clear;
  var debounce = window.debounce.debounce;
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = mapFiltersForm.querySelector('#housing-type');
  var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var housingRoom = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuests = mapFiltersForm.querySelector('#housing-guests');
  var mapFeature = mapFiltersForm.querySelectorAll('.map__checkbox');
  var pins = null;

  function getData(data) {
    pins = data;
  }

  function filterTypes(element) {
    if (housingType.value === 'any') {
      return true;
    }
    return element.offer.type === housingType.value;
  }

  function filterRooms(element) {
    if (housingRoom.value === 'any') {
      return true;
    }
    return element.offer.rooms === +housingRoom.value;
  }

  function filterGuests(element) {
    if (housingGuests.value === 'any') {
      return true;
    }
    return element.offer.guests === +housingGuests.value;
  }

  function filterPrice(element) {
    switch (housingPrice.value) {
      case 'low':
        return element.offer.price < MIN_PRICE;
      case 'middle':
        return element.offer.price >= MIN_PRICE && element.offer.price <= MAX_PRICE;
      case 'high':
        return element.offer.price > MAX_PRICE;
      default:
        return element;
    }
  }

  function getCheckboxValue() {
    var checkBoxes = [];
    mapFeature.forEach(function (element) {
      if (element.checked) {
        checkBoxes.push(element.value);
      }
    });
    return checkBoxes;
  }

  function getArrayCompare(arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) === -1) {
        return false;
      }
    }
    return true;
  }

  function filteringCheckboxes(element) {
    return (getArrayCompare(element.offer.features, getCheckboxValue())) ? element : false;
  }

  function onSelectHostingType() {
    var filteredPins = pins.filter(filterTypes).filter(filterPrice).filter(filterRooms).filter(filterGuests).filter(filteringCheckboxes).slice(0, 5);
    var debouncedRender = debounce(render);
    debouncedRender(filteredPins);
    clearCards();
  }

  mapFiltersForm.addEventListener('change', onSelectHostingType);
  return {
    getData: getData,
  };
})();

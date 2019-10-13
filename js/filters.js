'use strict';
window.filters = (function () {
  var render = window.pin.render;
  var clearCards = window.cards.clear;
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = mapFiltersForm.querySelector('#housing-type');
  var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var pins = null;

  function getData(data) {
    pins = data;
  }

  function filterPrice(element) {
    if (housingPrice.value === 'any') {
      return true;
    }
    console.log(housingPrice.value);
  }

  function filterTypes(element) {
    if (housingType.value === 'any') {
      return true;
    }
    return element.offer.type === housingType.value;
  }
  function onSelectHostingType() {
    var filteredPins = pins.filter(filterTypes).filter(filterPrice).slice(0, 5);
    render(filteredPins);
    clearCards();
  }

  mapFiltersForm.addEventListener('change', onSelectHostingType);
  return {
    getData: getData,
  };
})();

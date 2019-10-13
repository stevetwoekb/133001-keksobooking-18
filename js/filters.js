'use strict';
window.filters = (function () {
  var render = window.pin.render;
  var clearCards = window.cards.clear;
  var mapFiltersForm = document.querySelector('.map__filters');
  var hostingType = mapFiltersForm.querySelector('.map__filter');
  var pins = null;

  function getData(data) {
    pins = data;
  }

  function filterTypes(element) {
    if (hostingType.value === 'any') {
      return true;
    }
    return element.offer.type === hostingType.value;
  }
  function onSelectHostingType() {
    var filteredPins = pins.filter(filterTypes).slice(0, 5);
    render(filteredPins);
    clearCards();
  }

  mapFiltersForm.addEventListener('change', onSelectHostingType);
  return {
    getData: getData,
  };
})();

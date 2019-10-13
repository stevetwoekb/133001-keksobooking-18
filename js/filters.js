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

  function onSelectHostingType() {
    if (hostingType.value !== 'any') {
      var filteredPins = pins.filter(function (element) {
        return element.offer.type === hostingType.value;
      });
      render(filteredPins.slice(0, 5));
    } else {
      render(pins.slice(0, 5));
    }
    clearCards();
  }

  mapFiltersForm.addEventListener('change', onSelectHostingType);
  return {
    getData: getData,
  };
})();

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
    clearCards();
    var filteredPins = pins.filter(function (element) {
      if (element.offer.type === hostingType.value) {
        return true;
      } else {
        return false;
      }
    });
    render(filteredPins.slice(0, 5));
  }

  hostingType.addEventListener('input', onSelectHostingType);
  return {
    getData: getData,
  };
})();

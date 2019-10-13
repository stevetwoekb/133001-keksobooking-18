'use strict';
window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout = null;
  function debounce(cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    return function () {
      var parameters = arguments;
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }
  return {
    debounce: debounce
  };
})();

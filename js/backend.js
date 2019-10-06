'use strict';
window.backend = (function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);

    function onLoadFunc() {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    }

    function onErrorFunc() {
      onError('Ошибка загрузки данных');
    }

    xhr.addEventListener('load', onLoadFunc);
    xhr.addEventListener('error', onErrorFunc);
    xhr.send();
  }

  return {
    load: load,
  };
})();

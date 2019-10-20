'use strict';
window.backend = (function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';
  var SERVER_STATUS_OK = 200;

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);

    function onLoadFunc() {
      if (xhr.status === SERVER_STATUS_OK) {
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

  function save(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL_SEND);
    xhr.send(data);
    function onLoadFunc() {
      if (xhr.status === SERVER_STATUS_OK) {
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
  }

  return {
    load: load,
    save: save,
  };
})();

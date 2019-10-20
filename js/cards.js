'use strict';
window.cards = (function () {
  var KEY_CODE_ESC = window.utils.KEY_CODE_ESC;
  var OFFER_TYPE_LIST_MAP = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var map = window.utils.mapElement;
  var clone = window.utils.clone;
  var rooms = window.utils.rooms;
  var guests = window.utils.guests;
  var popup;
  var popupClose;

  function clearCards() {
    var cards = map.querySelectorAll('.map__card');
    if (cards.length > 0) {
      map.removeChild(cards[0]);
    }
  }

  function renderFeatureList(parent, selector, features) {
    var cardElemListFeature = parent.querySelector(selector);
    var docFragment = document.createDocumentFragment();
    features.forEach(function (element) {
      var li = document.createElement('li');
      li.className = 'popup__feature ' + 'popup__feature--' + element;
      docFragment.appendChild(li);
    });
    cardElemListFeature.appendChild(docFragment);
  }

  function renderPhotoList(parent, selector, photos) {
    var cardElemListFeature = parent.querySelector(selector);
    var docFragment = document.createDocumentFragment();
    photos.forEach(function (element) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.src = element;
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      docFragment.appendChild(img);
    });
    cardElemListFeature.appendChild(docFragment);
  }

  function onPopupCloseClick() {
    popup.remove();
  }

  function onDocumentKeydown(evt) {
    if (evt.keyCode === KEY_CODE_ESC && popup !== null) {
      popup.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  }

  function renderCard(data) {
    var filtersElement = map.querySelector('.map__filters-container');
    var offer = data.offer;
    var author = data.author;
    var cardElement = clone('#card', '.map__card');
    var capacityContent = offer.rooms + ' ' +
    rooms(offer.rooms) + ' для ' + offer.guests + ' ' + guests(offer.guests);
    var timeContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    cardElement.querySelector('.popup__title').textContent = offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offer.price + '\u20bd/ночь';
    cardElement.querySelector('.popup__type ').textContent = OFFER_TYPE_LIST_MAP[offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = capacityContent;
    cardElement.querySelector('.popup__text--time').textContent = timeContent;
    cardElement.querySelector('.popup__features').innerHTML = '';
    renderFeatureList(cardElement, '.popup__features', offer.features);
    cardElement.querySelector('.popup__description ').textContent = offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    renderPhotoList(cardElement, '.popup__photos', offer.photos);
    cardElement.querySelector('.popup__avatar').src = author.avatar;
    filtersElement.insertAdjacentElement('beforebegin', cardElement);
    popup = map.querySelector('.popup');
    popupClose = popup.querySelector('.popup__close');
    popupClose.addEventListener('click', onPopupCloseClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  return {
    clear: clearCards,
    render: renderCard,
  };
})();

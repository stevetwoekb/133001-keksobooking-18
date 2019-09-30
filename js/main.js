'use strict';

var DATA_COUNT = 8;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];


var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var PRICES = [
  1000,
  1500,
  3000,
  2500,
  6000,
  700,
  1300,
  999,
];

var TITLES = [
  'Комната-1',
  'Комната-2',
  'Комната-3',
  'Комната-4',
  'Комната-5',
  'Комната-6',
  'Комната-7',
  'Комната-8'
];

var DESCRIPTIONS = [
  'Описание-1',
  'Описание-2',
  'Описание-3',
  'Описание-4',
  'Описание-5',
  'Описание-6',
  'Описание-7',
  'Описание-8'
];

var ROOMS = [
  1,
  2,
  3,
  4,
];

var GUESTS = [
  1,
  2,
  3,
];

var OFFER_TYPE_LIST_MAP = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

var KEY_CODE_ENTER = 13;
var KEY_CODE_ESC = 27;
var map = document.querySelector('.map');
var mapMainPin = document.querySelector('.map__pin--main');
var mapFiltersForm = document.querySelector('.map__filters');
var mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
var mapFeatures = mapFiltersForm.querySelectorAll('.map__features');
var adForm = document.querySelector('.ad-form');
var child = adForm.querySelectorAll('fieldset');
var address = adForm.querySelector('#address');
var submitBtn = adForm.querySelector('.ad-form__submit');
var price = adForm.querySelector('#price');
var popup;
var popupClose;
var roomsCapacityMap = {
  '1': {
    'guests': ['1'],
    'errorText': '1 комната для 1 гостя'
  },
  '2': {
    'guests': ['1', '2'],
    'errorText': '2 комнаты для 1 или 2 гостей'
  },
  '3': {
    'guests': ['1', '2', '3'],
    'errorText': '3 комнаты для 1, 2 или 3 гостей'
  },
  '100': {
    'guests': ['0'],
    'errorText': '100 комнат не для гостей'
  },
};

function shuffleArray(array) {
  var newArray = array.slice();
  for (var i = newArray.length - 1; i > 0; i--) {
    var j = getRandomNumberInRange(0, newArray.length);
    var temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}

function getArrayWithRandomLength(array) {
  return shuffleArray(array).slice(0, getRandomNumberInRange(0, array.length));
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function flexNormalize(number, forms) {
  number = Number(number);
  if (number % 100 === 11) {
    return forms[0];
  }
  var remainder = number % 10;
  switch (true) {
    case remainder === 0 || remainder > 4:
      return forms[0];
    case remainder === 1:
      return forms[1];
    default:
      return forms[2];
  }
}

function roomsFlexNormalize(number) {
  var forms = ['комнат', 'комната', 'комнаты'];
  return flexNormalize(number, forms);
}

function cloneElements(templateSelector, elementSelector) {
  return document.querySelector(templateSelector).content.querySelector(elementSelector).cloneNode(true);
}

function PinPosition() {
  var pinsWrapper = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin');
  LOCATION_X_MIN = pin.offsetWidth / 2;
  LOCATION_X_MAX = pinsWrapper.offsetWidth - (pin.offsetWidth / 2);
  this.x = getRandomNumberInRange(LOCATION_X_MIN, LOCATION_X_MAX);
  this.y = getRandomNumberInRange(LOCATION_Y_MIN, LOCATION_Y_MAX);
}

function guestsFlexNormalize(number) {
  var forms = ['гостей', 'гостя', 'гостей'];
  return flexNormalize(number, forms);
}

function Author(index) {
  this.avatar = 'img/avatars/user0' + index + '.png';
}

function Offer(location) {
  this.title = getRandomElement(TITLES);
  this.address = location.x + ', ' + location.y;
  this.price = getRandomElement(PRICES);
  this.type = getRandomElement(TYPES);
  this.rooms = getRandomElement(ROOMS);
  this.guests = getRandomElement(GUESTS);
  this.checkin = getRandomElement(CHECKINS);
  this.checkout = getRandomElement(CHECKOUTS);
  this.features = getArrayWithRandomLength(FEATURES);
  this.description = getRandomElement(DESCRIPTIONS);
  this.photos = getArrayWithRandomLength(PHOTOS);
}

function Pin(number) {
  this.author = new Author(number);
  this.location = new PinPosition();
  this.offer = new Offer(this.location);
}

function getPins(number) {
  return new Array(number).fill('').map(function (element, index) {
    return new Pin(index + 1);
  });
}

function clearCards() {
  var cards = map.querySelectorAll('.map__card');
  if (cards.length > 0) {
    map.removeChild(cards[0]);
  }
}

function renderPin(props) {
  var pinElement = cloneElements('#pin', '.map__pin');
  pinElement.querySelector('img').src = '';
  pinElement.style.left = (props.location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (props.location.y - PIN_HEIGHT) + 'px';
  pinElement.querySelector('img').src = props.author.avatar;
  pinElement.querySelector('img').alt = props.offer.title;
  function onPinClick() {
    clearCards();
    renderCard(props);
  }
  pinElement.addEventListener('click', onPinClick);
  return pinElement;
}

function renderPins(pins) {
  var mapPinsElement = document.querySelector('.map__pins');
  var docFragment = document.createDocumentFragment();
  pins.forEach(function (element) {
    docFragment.appendChild(renderPin(element));
  });
  mapPinsElement.appendChild(docFragment);
}

function renderFeatureList(parent, selector, features) {
  var cardelemListFeature = parent.querySelector(selector);
  var docFragment = document.createDocumentFragment();
  features.forEach(function (element) {
    var li = document.createElement('li');
    li.className = 'popup__feature ' + 'popup__feature--' + element;
    docFragment.appendChild(li);
  });
  cardelemListFeature.appendChild(docFragment);
}

function renderPhotoList(parent, selector, photos) {
  var cardelemListFeature = parent.querySelector(selector);
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
  cardelemListFeature.appendChild(docFragment);
}

function onPopupCloseClick() {
  popup.remove();
}

function renderCard(data) {
  var filtersElement = map.querySelector('.map__filters-container');
  var offer = data.offer;
  var author = data.author;
  var cardElement = cloneElements('#card', '.map__card');
  var capacityContent = offer.rooms + ' ' +
    roomsFlexNormalize(offer.rooms) + ' для ' + offer.guests + ' ' +
    guestsFlexNormalize(offer.guests);
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

function onMapPinMousedown() {
  enableMap();
}

function onMapPinKeydown(evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    enableMap();
  }
}

function adFormEnable() {
  adForm.classList.remove('ad-form--disabled');

  function removeDisabledAttr(array) {
    array.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  }

  removeDisabledAttr(child);
  removeDisabledAttr(mapFilters);
  removeDisabledAttr(mapFeatures);
}

function getAddressWithPinDisabled(pin) {
  var x = Math.floor(parseInt(pin.style.left, 10) + (pin.offsetHeight / 2));
  var y = Math.floor(parseInt(pin.style.top, 10) + (pin.offsetWidth / 2));
  return x + ', ' + y;
}

function getAddressWithPin(pin) {
  var x = Math.floor(parseInt(pin.style.left, 10) + PIN_HEIGHT);
  var y = Math.floor(parseInt(pin.style.top, 10) + PIN_WIDTH);
  return x + ', ' + y;
}

function setAddress(pin) {
  address.value = getAddressWithPin(pin);
}

function setPriceValidator() {
  var type = adForm.querySelector('#type');
  type.addEventListener('input', onTypeClick);

  function onTypeClick() {
    switch (type.value) {
      case 'bungalo':
        setNewParams('0');
        break;
      case 'flat':
        setNewParams('1000');
        break;
      case 'house':
        setNewParams('5000');
        break;
      case 'palace':
        setNewParams('10000');
        break;
    }
  }

  function setNewParams(minPrice) {
    price.setAttribute('min', minPrice);
    price.placeholder = minPrice;
  }
}

function setChecksValidator() {
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  function onTimeInClick() {
    timeOut.value = timeIn.value;
  }

  function onTimeOutClick() {
    timeIn.value = timeOut.value;
  }

  timeIn.addEventListener('input', onTimeInClick);
  timeOut.addEventListener('input', onTimeOutClick);

}

function validateRoomsNumbers() {
  var roomsSelect = document.querySelector('[name="rooms"]');
  var rooms = roomsSelect.value;
  var guests = document.querySelector('[name="capacity"]').value;
  roomsSelect.setCustomValidity(roomsCapacityMap[rooms].guests.includes(guests) ? '' : roomsCapacityMap[rooms].errorText);
}

function addDisabledAttr(array) {
  array.forEach(function (element) {
    element.setAttribute('disabled', '');
  });
}

function onSubmitButtonClick() {
  validateRoomsNumbers();
}

function onDocumentKeydown(evt) {
  if (evt.keyCode === KEY_CODE_ESC && popup !== null) {
    popup.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

function adFormDisabled() {
  address.value = getAddressWithPinDisabled(mapMainPin);
  addDisabledAttr(child);
  addDisabledAttr(mapFilters);
  addDisabledAttr(mapFeatures);
}

function enableMap() {
  map.classList.remove('map--faded');
  adFormEnable();
  setAddress(mapMainPin);
  setPriceValidator();
  setChecksValidator();
  renderPins(pins);
  mapMainPin.removeEventListener('mousedown', onMapPinMousedown);
  mapMainPin.removeEventListener('keydown', onMapPinKeydown);
}
var pins = getPins(DATA_COUNT);

mapMainPin.addEventListener('mousedown', onMapPinMousedown);
mapMainPin.addEventListener('keydown', onMapPinKeydown);
submitBtn.addEventListener('click', onSubmitButtonClick);
adFormDisabled();

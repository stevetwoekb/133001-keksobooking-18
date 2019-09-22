'use strict';

var DATA_COUNT = 8;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 0;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

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

function enableMap() {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
}

function getArrayWithRandomLength(array) {
  return shuffleArray(array).slice(0, getRandomNumberInRange(0, array.length));
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
function PinPosition() {
  var pinsWrapper = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin');
  LOCATION_X_MIN = pin.offsetWidth / 2;
  LOCATION_X_MAX = pinsWrapper.offsetWidth - (pin.offsetWidth / 2);
  this.x = getRandomNumberInRange(LOCATION_X_MIN, LOCATION_X_MAX);
  this.y = getRandomNumberInRange(LOCATION_Y_MIN, LOCATION_Y_MAX);
}


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

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function Pin(number) {
  this.author = new Author(number);
  this.location = new PinPosition();
  this.offer = new Offer(this.location);
}

function getWordDec(number, one, two, five) {
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return five;
  }
  number %= 10;
  if (number === 1) {
    return one;
  }
  if (number >= 2 && number <= 4) {
    return two;
  }
  return five;
}

function getWordDecAdj(number, one, two) {
  number %= 100;
  if (number === 11) {
    return two;
  }
  number %= 10;
  if (number === 1) {
    return one;
  }
  return two;
}

function clearList(perent, selector) {
  var cardelemListFeature = perent.querySelector(selector);
  while (cardelemListFeature.firstChild) {
    cardelemListFeature.removeChild(cardelemListFeature.firstChild);
  }
}

function getPins(number) {
  return new Array(number).fill('').map(function (element, index) {
    return new Pin(index + 1);
  });
}

function cloneElements(templateSelector, elementSelector) {
  return document.querySelector(templateSelector).content.querySelector(elementSelector).cloneNode(true);
}

function renderPin(props) {
  var pinElement = cloneElements('#pin', '.map__pin');
  pinElement.querySelector('img').src = '';
  pinElement.style.left = (props.location.x - pinElement.clientWidth / 2) + 'px';
  pinElement.style.top = (props.location.y - pinElement.clientHeight) + 'px';
  pinElement.querySelector('img').src = props.author.avatar;
  pinElement.querySelector('img').alt = props.offer.title;
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
  for (var i = 0; i < features.length; i++) {
    var li = document.createElement('li');
    li.append();
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + features[i]);
    cardelemListFeature.appendChild(li);
  }
  return li;
}

function renderPhotoList(parent, selector, features) {
  var cardelemListFeature = parent.querySelector(selector);
  for (var i = 0; i < features.length; i++) {
    var img = document.createElement('img');
    img.append();
    img.classList.add('popup__photo');
    img.src = features[i];
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    cardelemListFeature.appendChild(img);
  }
  return img;
}

function renderCard() {
  var offer = PINS[0].offer;
  var author = PINS[0].author;
  var cardElement = cloneElements('#card', '.map__card');
  clearList(cardElement, '.popup__features');
  clearList(cardElement, '.popup__photos');
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + '\u20bd/ночь';
  cardElement.querySelector('.popup__type ').textContent = OFFER_TYPE_LIST_MAP[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' ' + getWordDec(offer.rooms, 'комната', 'комнаты', 'комнат') + ' ' + offer.guests + ' ' + getWordDecAdj(offer.rooms, 'гость', 'гостей');
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', ' + 'выезд до ' + offer.checkout;
  renderFeatureList(cardElement, '.popup__features', offer.features);
  cardElement.querySelector('.popup__description ').textContent = offer.description;
  renderPhotoList(cardElement, '.popup__photos', offer.photos);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  return cardElement;
}

function rednderPopUp() {
  var mapElement = document.querySelector('.map');
  var filtersElement = mapElement.querySelector('.map__filters-container');
  var docFragment = document.createDocumentFragment();
  docFragment.appendChild(renderCard());
  mapElement.insertBefore(docFragment, filtersElement);
}

var PINS = getPins(DATA_COUNT);
enableMap();
renderPins(PINS);
rednderPopUp();

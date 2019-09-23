'use strict';

var DATA_COUNT = 8;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 0;
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

function guestsFlexNormalize(number) {
  var forms = ['гостей', 'гостя', 'гостей'];
  return flexNormalize(number, forms);
}

function roomsFlexNormalize(number) {
  var forms = ['комнат', 'комната', 'комнаты'];
  return flexNormalize(number, forms);
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
  pinElement.style.left = (props.location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (props.location.y - PIN_HEIGHT) + 'px';
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

function renderCard(data) {
  var mapElement = document.querySelector('.map');
  var filtersElement = mapElement.querySelector('.map__filters-container');
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
}

var pins = getPins(DATA_COUNT);
enableMap();
renderPins(pins);
renderCard(pins[0]);

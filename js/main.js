'use strict';

var DATA_COUNT = 8;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 230;

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var HOURS = [
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
var PRIICES = [
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

var MOCK_OJBECTS = getPins(8);


function enabledMap() {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
}

function getArrayRandomLingth(value) {
  return value.splice(0, Math.floor(Math.random() * value.length) + 1);
}

function Author(index) {
  this.avatar = 'img/avatars/user0' + index + '.png';
}

function Offer(location) {
  this.title = getRandomeValue(TITLES);
  this.adress = location.x + ', ' + location.y;
  this.price = getRandomeValue(PRIICES);
  this.type = getRandomeValue(TYPES);
  this.rooms = getRandomeValue(ROOMS);
  this.guests = getRandomeValue(GUESTS);
  this.checkin = getRandomeValue(HOURS);
  this.checkout = getRandomeValue(HOURS);
  this.features = getArrayRandomLingth(FEATURES);
  this.description = getRandomeValue(DESCRIPTIONS);
  this.photos = getArrayRandomLingth(PHOTOS);
}

function PinPosition() {
  var locationX = document.querySelector('.map__pins');
  this.x = getRandomLocation(locationX.offsetWidth, null, null);
  this.y = getRandomLocation(null, LOCATION_Y_MIN, LOCATION_Y_MAX);
}

function getRandomLocation(value, valueRangeMin, valueRangeMax) {
  if (valueRangeMin && valueRangeMax) {
    return Math.floor(Math.random() * (valueRangeMax - valueRangeMin) + valueRangeMin);
  }
  return Math.floor(Math.random() * value);
}

function getRandomeValue(array) {
  return array[Math.floor(Math.random() * array.length)];
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

function cloneElements(templateSelector, elementSelector) {
  return document.querySelector(templateSelector).content.querySelector(elementSelector).cloneNode(true);
}

function renderPin(props) {
  var pinElement = cloneElements('#pin', '.map__pin');
  pinElement.style.left = (props.location.x - pinElement.clientWidth / 2) + 'px';
  pinElement.style.top = (props.location.y - pinElement.clientHeight) + 'px';
  pinElement.firstChild.src = props.author.avatar;
  pinElement.firstChild.alt = props.offer.title;
  return pinElement;
}


function renderPins(pins) {
  var mapPinsElement = document.querySelector('.map__pins');
  var docFragment = document.createDocumentFragment();
  pins.forEach(function (element) {
    renderPin(element);
    docFragment.appendChild(renderPin(element));
    mapPinsElement.appendChild(docFragment);
  });
}

var pins = getPins(8);

renderPins(pins);
enabledMap();

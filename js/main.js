'use strict';

var DATA_COUNT = 8;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 230;

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
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

// var MOCK_OJBECTS = generateMock();

function enabledMap() {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
}

function getArrayRandomLingth(value) {
  return value.splice(0, Math.floor(Math.random() * value.length) + 1);
}

function Author(avatar) {
  this.avatar = avatar;
}

function Offer(title, adress, price, type, rooms, guests, checkin, checkout, features, description, photos) {
  this.title = title;
  this.adress = adress;
  this.price = price;
  this.type = type;
  this.rooms = rooms;
  this.guests = guests;
  this.checkin = checkin;
  this.checkout = checkout;
  this.features = features;
  this.description = description;
  this.photos = photos;
}

function MapPosition(x, y) {
  this.x = x;
  this.y = y;
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

function generateMock() {
  var locationX = document.querySelector('.map__overlay');
  var array = [];
  for (var i = 0; i < DATA_COUNT; i++) {
    var author = new Author(AVATARS);
    var location = new MapPosition(getRandomLocation(locationX.offsetWidth, null, null), getRandomLocation(null, LOCATION_Y_MIN, LOCATION_Y_MAX));
    var offer = new Offer(TITLES[i], location.x + ', ' + location.y, getRandomeValue(PRIICES), getRandomeValue(TYPES), getRandomeValue(ROOMS), getRandomeValue(GUESTS), getRandomeValue(HOURS), getRandomeValue(HOURS), getArrayRandomLingth(FEATURES), DESCRIPTIONS[i], getArrayRandomLingth(PHOTOS));
    array.push({author: {avatar: author.avatar[i]}, offer: {title: offer.title, adress: offer.adress, price: offer.price, type: offer.type, rooms: offer.rooms, guests: offer.guests, checkin: offer.checkin, checkout: offer.checkout, features: offer.features, description: offer.description, photos: offer.photos}, location: {x: location.x, y: location.y}});
  }
  return array;
}
generateMock();
enabledMap();

'use strict';
window.data = (function () {
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

  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
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

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var getRandomElement = window.utils.getRandomElement;
  var getArrayWithRandomLength = window.utils.getArrayWithRandomLength;

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

  return {
    Author: Author,
    Offer: Offer,
  };

})();

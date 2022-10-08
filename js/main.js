import { getRandomInteger, getRandomFloat } from './random.js';

// const avatar; // Адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.

// Информация об объявлении
const title = [
  'Квартира свободной планировки 174,1 м²',
  'Огромный пентхаус',
  'Апартаменты от застройщика в ЖК Voxhall',
  'Апартаменты-студия 26,9 м²',
  'Дом под ключ с бассейн и хамамом'
];

// const address; // Cоставляется из географических координат по маске {{location.lat}}, {{location.lng}}

const price = getRandomInteger(0, 100000); // Случайное целое положительное число

const type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const rooms = getRandomInteger(0, 10); // Случайное целое положительное число

const guests = getRandomInteger(0, 15); // Количество гостей, которое можно разместить. Случайное целое положительное число

const checkin = ['12:00', '13:00', '14:00']; // Одно из трёх фиксированных значений

const checkout = ['12:00', '13:00', '14:00']; // Одно из трёх фиксированных значений

// const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // Массив строк — массив случайной длины из значений, которые не должны повторяться

const description = [
  'Двухкомнатная квартира в кирпичном кооперативном доме с огороженной территорией.',
  'Квартира после дизайнерского ремонта с использованием дорогостоящих материалов. Планировка узаконена.',
  'Функциональная планировка: кухня-гостиная, изолированная спальня, 1 раздельный СУ с ванной, лоджия.',
  'Есть все необходимое из мебели и бытовой техники.',
  'Светлая, уютная квартира, окна на 3 стороны!'
]; // Описание помещения

// const photoUrlOne = new URL('https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg');
// const photoUrlTwo = new URL('https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg');
// const photoUrlThree = new URL('https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg');
// const photos = [ ];

// const getRandomArrayElement = (elements) => elements[getRandomFloat(0, elements.length - 1)];
const getRandomArrayItem = function(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const objectInformation = function() {

  // Mестоположение в виде географических координат
  const randomLat = getRandomFloat(35.65000, 35.70000); // Число с плавающей точкой — широта
  const randomLng = getRandomFloat(139.70000, 139.80000); // Число с плавающей точкой — долгота

  return {
    author: '', // Описывает автора
    offer: `${getRandomArrayItem(title) } ${ price } ${ getRandomArrayItem(type) } ${ rooms } ${ guests } ${ getRandomArrayItem(checkin) } ${ getRandomArrayItem(checkout) } ${ getRandomArrayItem(description)}`, // Информация об объявлении
    location: randomLat + randomLng, // Mестоположение в виде географических координат
  };
};

objectInformation();

const similarObjectInformation = Array.from({length: 5}, objectInformation);

// console.log(similarObjectInformation);

// TODO: Удалить, временные вызовы, чтобы Eslint не жаловался

getRandomIntegerWithChecks(6.555, 90.4);
getRandomFloat(5.66, 9.69);

/**
 * На основе материала {@link https://learn.javascript.ru/task/random-int-min-max| Learn JS}
@param {number} from Целое положительное число
@param {number} to Целое положительное число, которое больше предыдущего
@returns {number} Случайное число в заданном промежутке включительно
*/

function getRandomInteger (from, to) {
  const randomNumber = from + Math.random() * (to + 1 - from);
  return Math.floor(randomNumber);
}

/**
Возвращает случайное число в заданом диапазоне, проверяет на типы и что число положительное
 * @param {*} a Предпочтительно положительное число
 * @param {*} b Предпочтительно положительное число
 * @param {number} Случайное целое число в заданном промежутке включительно или `Nan`, если аргументы не подходящие
*/

function getRandomIntegerWithChecks(a, b) {
  const resultCheck = checkFunctionArguments(a, b);

  // Проверяем, что число положительное
  if (isNaN (resultCheck)) {
    return resultCheck;
  }

  // Поддержка передачи чисел в любом порядке, т.е. если b меньше а, то они меняются местами
  [a, b] = resultCheck;

  a = Math.ceil(a); // Округление значения в сторону плюс бесконечности
  b = Math.floor(b); // Округлите значение в сторону минус бесконечности

  return getRandomInteger(a, b);
}

/**
 * @param {*} a Предпочительно положительное число
 * @param {*} b Предпочительно положительное число
 * @param {*} [precision=1] Предпочительно положительное число
 * @returns {number} Случайное число с плавающей точкой или `NaN`, если аргументы не подходящие
 */

function getRandomFloat(a, b, precision = 1) {
  const resultCheck = checkFunctionArguments(a, b);

  // Проверяем числа на типы
  if (resultCheck === null || typeof precision !== 'number' || precision < 0) {
    return NaN;
  }

  // Проверяем, что число положительное
  if (a < 0 || b < 0 || precision < 0) {
    return NaN;
  }

  // Поддержка передачи чисел в любом порядке, т.е. если b меньше а, то они меняются местами
  [a, b] = resultCheck;

  // Получаем рандомное число от 0 до 1
  // Уножаем на разницу между переданными числами и прибавляем второе значение
  const result = b + Math.random() * (a - b);

  // С помощью метода toFixed любого числа в JavaScript указываем требуемое количество знаков после точки.
  // Метод возвращает строку, поэтому с помощью унарного плюса превращаем её в число
  return +result.toFixed(precision);
}

// Функция для строк
function getRandomString(a, b) {
  const resultCheck = checkFunctionArguments(a, b);

  // Проверяем, что число положительное
  if (a < 0 || b < 0) {
    return NaN;
  }

  // [a, b] = resultCheck; эта строка в данной функции вызывала ошибку
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

getRandomString();

/**
Функция для проверки аргументов в другой функции
 * @param {*} first Предпочтительно положительное число
 * @param {*} second Предпочтительно положительное число
 * @return {null | number[]} Возвращает `null`, если аргументы не числа или меньше нуля, а так же массив исходных значений по возрастанию
*/

function checkFunctionArguments(first, second) {
  // Проверяем числа на типы
  if (typeof first !== 'number' || typeof second !== 'number') {
    return null;
  }

  // Проверяем, что число положительное
  if (first < 0 || second < 0) {
    return null;
  }

  // Поддержка передачи чисел в любом порядке, т.е. если b меньше а, то они меняются местами
  return second < first ? [first, second] : [second, first];
}

// Описывает автора. Содержит одно поле
// const avatar; // Адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.

// Информация об объявлении
const title = [
  'Квартира свободной планировки 174,1 м²',
  'Огромный пентхаус',
  'Апартаменты от застройщика в ЖК Voxhall',
  'Апартаменты-студия 26,9 м²',
  'Дом под ключ с бассейн и хамамом'
]; // Заголовок предложения

// const address; // Адрес предложения. Cоставляется из географических координат по маске {{location.lat}}, {{location.lng}}

// const price; // Cтоимость. Случайное целое положительное число

const type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

// const rooms; // Количество комнат. Случайное целое положительное число

// const guests; // Количество гостей, которое можно разместить. Случайное целое положительное число

const checkin = ['12:00', '13:00', '14:00']; // Одно из трёх фиксированных значений

const checkout = ['12:00', '13:00', '14:00']; // Одно из трёх фиксированных значений

let features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // Массив строк — массив случайной длины из значений, которые не должны повторяться

const description = [
  'Двухкомнатная квартира в кирпичном кооперативном доме с огороженной территорией.',
  'Квартира после дизайнерского ремонта с использованием дорогостоящих материалов. Планировка узаконена.',
  'Функциональная планировка: кухня-гостиная, изолированная спальня, 1 раздельный СУ с ванной, лоджия.',
  'Есть все необходимое из мебели и бытовой техники.',
  'Светлая, уютная квартира, окна на 3 стороны!'
]; // Описание помещения

const photoUrlOne = new URL('https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg');
const photoUrlTwo = new URL('https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg');
const photoUrlThree = new URL('https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg');
const photos = [ ];

const getRandomArrayElement = (elements) => elements[getRandomFloat(0, elements.length - 1)];
const getRandomArrayString = (elements) => elements[getRandomString(0, elements.length - 1)];

const objectInformation = () => {

  // Mестоположение в виде географических координат
  const randomLat = getRandomFloat(35.65000, 35.70000); // Число с плавающей точкой — широта
  const randomLng = getRandomFloat(139.70000, 139.80000); // Число с плавающей точкой — долгота

  return {
    author: '', // Описывает автора
    offer: getRandomArrayString(title) + ' ' + getRandomArrayString(type) + ' ' + getRandomArrayString(checkin) + ' ' + getRandomArrayString(checkout) + ' ' + getRandomArrayString(description), // Информация об объявлении
    location: randomLat + randomLng, // Mестоположение в виде географических координат
  };
};

objectInformation();

const similarObjectInformation = Array.from({length: 4}, objectInformation);

console.log(similarObjectInformation);

// Источник https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

/**
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
@param {number} a Положительное число
@param {number} b Положительное число
@param {number} precision Случайное число в заданном промежутке включительно
*/

// eslint-disable-next-line no-unused-vars
function getRandomIntegerWithChecks(a, b) {
  // Проверяем числа на типы
  if (!typeof a === 'number' || typeof b === 'number') {
    return NaN;
  }

  // Проверяем, что число положительное
  if (a < 0 || b < 0) {
    return NaN;
  }

  // Поддержка передачи чисел в любом порядке, т.е. если b меньше а, то они меняются местами
  if (b < a) {
    [a, b] = [b, a];
  }

  a = Math.ceil(a); /** Округление значения в сторону плюс бесконечности */
  b = Math.floor(b); /** Округлите значение в сторону минус бесконечности */

  return getRandomInteger(a, b);
}

// eslint-disable-next-line no-unused-vars
function getRandomFloat(a, b, precision = 1) {
  // Проверяем числа на типы
  if (!typeof a === 'number' || typeof b === 'number' || typeof precision === 'number') {
    return NaN;
  }

  // Проверяем, что число положительное
  if (a < 0 || b < 0 || precision < 0) {
    return NaN;
  }

  // Поддержка передачи чисел в любом порядке, т.е. если b меньше а, то они меняются местами
  if (b < a) {
    [a, b] = [b, a];
  }

  a = Math.ceil(a); /** Округление значения в сторону плюс бесконечности */
  b = Math.floor(b); /** Округлите значение в сторону минус бесконечности */

  // Получаем рандомное число от 0 до 1
  // Уножаем на разницу между переданными числами и прибавляем второе значение
  const result = b + Math.random() * (a - b);

  // С помощью метода toFixed любого числа в JavaScript указываем требуемое количество знаков после точки.
  // Метод возвращает строку, поэтому с помощью унарного плюса превращаем её в число
  return +result.toFixed(precision);
}

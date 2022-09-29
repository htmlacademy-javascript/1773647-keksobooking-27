// Источник https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function randomNumber(a, b, digits = 1) {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }

  // Поддержка передачи минимального и максимального значения в любом порядке
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  // Math.random() для получения случайного дробного числа от 0 до 1
  // Уножаем на разницу между переданными числами
  const result = Math.random() * (upper - lower);

  // С помощью метода toFixed любого числа в JavaScript указываем требуемое количество знаков после точки.
  // Метод возвращает строку, поэтому с помощью унарного плюса превращаем её в число
  return +result.toFixed(digits);
}

randomNumber();


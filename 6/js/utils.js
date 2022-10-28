/**
 * @param {number} number
 * @example
 * formatNumber(5) // '05'
 * formatNumber(12) // '12'
 */
export const formatNumber = (number) => number < 10 ? `0${number}` : String(number);

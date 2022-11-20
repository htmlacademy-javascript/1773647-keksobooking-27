const typeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

/**
 * @param {HTMLSelectElement} typeSelect
 * @param {HTMLInputElement} priceInput
 * @param {*} pristine Pristine instance
 */
export const initPriceAndType = (typeSelect, priceInput, pristine) => {
  const checkMinPrice = (value) => value > typeToMinPrice[typeSelect.value];
  const showMinPriceMessage = () => `Минимальная цена ${typeToMinPrice[typeSelect.value]}`;

  pristine.addValidator (priceInput, checkMinPrice, showMinPriceMessage);

  typeSelect.addEventListener('input', () => pristine.validate(priceInput));
};

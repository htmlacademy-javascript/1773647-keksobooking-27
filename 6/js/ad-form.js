const validationMessage = {
  REQUIRED: 'Обязательное поле',
  LENGTH: 'От 30 до 100 символов',
  MAX_PRICE: 'Максимальное значение - 100 000',
};

/** @type {HTMLFormElement} */
const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'ad-form__element--invalid', // Класс, обозначающий невалидное поле
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'text-help' // Класс для элемента с текстом ошибки
});

// const titleDataset = adForm.elements.title.dataset;

// titleDataset.pristineRequiredMessege = validationMessage.REQUIRED;
// titleDataset.pristineMinlengthMessege = validationMessage.LENGTH;
// titleDataset.pristineMaxlengthMessege = validationMessage.LENGTH;

// const validateTitle = (value) => value.length >= 30 && value.length >= 100;

// pristine.addValidator(validateTitle, validationMessage.LENGTH);


/** @type {HTMLInputElement} */
const priceInput = adForm.price;
const priceDataset = priceInput.dataset;

/** @type {HTMLSelectElement} */
const typeSelect = adForm.elements.type;

priceDataset.pristineRequiredMessege = validationMessage.REQUIRED;
// priceDataset.pristineMaxMessege = validationMessage.MAX_PRICE;

const typeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

pristine.addValidator(priceInput, (value) => {
  const valuePrice = Number(value);
  return valuePrice > 100000;
}, validationMessage.MAX_PRICE);

const updatePriceMinValue = () => {
  const minPrice = typeToMinPrice[typeSelect.value];
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
  priceDataset.pristineMinMessege = `Минимальная цена ${minPrice}`;
};

updatePriceMinValue();

const timeinSelect = adForm.elements.timein;
const timeoutSelect = adForm.elements.timeout;

timeinSelect.addEventListener('change', () => {
  timeoutSelect.value = timeinSelect.value;
});

timeoutSelect.addEventListener('change', () => {
  timeinSelect.value = timeoutSelect.value;
});

const roomsSelect = adForm.elements.rooms;
const capacitySelect = adForm.elements.capacity;

const roomsToCapacity = {
  '1': new Set(['1']),
  '2': new Set(['2', '1']),
  '3': new Set(['3', '2', '1']),
  '100': new Set(['0']),
};

pristine.addValidator(capacitySelect, (value) => {
  const roomAmount = roomsSelect.value;
  return roomsToCapacity[roomAmount].has(value);
},'Неверное количество гостей');

typeSelect.addEventListener('input', () => {
  updatePriceMinValue();
  pristine.reset();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

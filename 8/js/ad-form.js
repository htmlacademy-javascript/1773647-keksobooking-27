const PRISTINE_OPTIONS = {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'ad-form__element--invalid', // Класс, обозначающий невалидное поле
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'text-help' // Класс для элемента с текстом ошибки
};

const validationMessage = {
  REQUIRED: 'Обязательное поле',
  LENGTH: 'От 30 до 100 символов',
  MAX_PRICE: 'Максимальное значение - 100 000',
};

/** @type {HTMLFormElement} */
const adForm = document.querySelector('.ad-form');

const {
  title: {dataset: titleDataset},
  price: priceInput,
  type: typeSelect,
  timein: timeInSelect,
  timeout: timeoutSelect,
  rooms: roomsSelect,
  capacity: capacitySelect,
} = adForm.elements;

const priceDataset = priceInput.dataset;

titleDataset.pristineRequiredMessage = validationMessage.REQUIRED;
titleDataset.pristineMinlengthMessage = validationMessage.LENGTH;
titleDataset.pristineMaxlengthMessage = validationMessage.LENGTH;

priceDataset.pristineRequiredMessage = validationMessage.REQUIRED;
priceDataset.pristineMaxMessage = validationMessage.MAX_PRICE;

const typeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const roomsToCapacity = {
  '1': new Set(['1']),
  '2': new Set(['2', '1']),
  '3': new Set(['3', '2', '1']),
  '100': new Set(['0']),
};

timeInSelect.addEventListener('change', () => {
  timeoutSelect.value = timeInSelect.value;
});

timeoutSelect.addEventListener('change', () => {
  timeInSelect.value = timeoutSelect.value;
});

const pristine = new Pristine(adForm, PRISTINE_OPTIONS);

pristine.addValidator(capacitySelect, (value) => {
  const roomAmount = roomsSelect.value;
  return roomsToCapacity[+roomAmount].has(value);
}, () => `Для ${roomsSelect.value} комнат не допустимо гостей ${capacitySelect.value}`);

const checkMinPrice = (value) => value < typeToMinPrice[typeSelect.value];
const showMinPriceMessage = () => `Минимальная цена ${typeToMinPrice[typeSelect.value]}`;

pristine.addValidator (priceInput, checkMinPrice, showMinPriceMessage);

typeSelect.addEventListener('input', () => pristine.validate(priceInput));

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

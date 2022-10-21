const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__label', // Элемент, на который будут добавляться классы
  errorClass: 'ad-form__element--invalid', // Класс, обозначающий невалидное поле
  successClass: 'ad-form__element--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'text-help' // Класс для элемента с текстом ошибки
});

//Проверяем на валидность заголовок
const validateTitle = (value) => value.length >= 30 && value.length >= 100;

pristine.addValidator(adForm.querySelector('#title'), validateTitle, 'От 30 до 100 символов');

// Проверяем на валидность на количество комнат и количество мест
const roomField = adForm.querySelector('#room_number');

const maxAmount = {
  1 : 1, // 1 комната — «для 1 гостя»;
  2 : 2, // 2 комнаты — «для 2 гостей» или «для 1 гостя»;
  3 : 3, // 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
  100 : 0, // 100 комнат — «не для гостей».
};

const validateAmount = (value) => {
  const rooms = adForm.querySelector('[name="rooms"]');
  return value.length <= maxAmount[rooms.value];
};

const getAmountErrorMessage = () => {
  const rooms = adForm.querySelector('[name="rooms"]');
  return `Не больше ${maxAmount[rooms.value]} гостей в комнату`;
};

const capacityField = adForm.querySelector('#capacity');
const settlementOption = {
  '1 комната': 'для 1 гостя',
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': 'не для гостей',
};

const validateCapacity = () => settlementOption[capacityField.value].includes[roomField.value];

const getValidationErrorMessage = () => `
  ${capacityField.value}
  ${roomField.value}
  ${capacityField.value === 'Количество' ? 'возможно' : 'невозможно'}`;

pristine.addValidator(roomField, validateAmount, getAmountErrorMessage, validateCapacity, getValidationErrorMessage);
pristine.addValidator(capacityField,validateCapacity, getValidationErrorMessage);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

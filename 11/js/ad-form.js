import { initPriceAndType } from './form/price.js';
import { initCapacityAndRooms } from './form/capacity.js';

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

const sliderElement = document.querySelector('.ad-form__slider');
const adFormButton = adForm.querySelector('.ad-form__submit');

const {
  title: {dataset: titleDataset},
  price: priceInput,
  type: typeSelect,
  timein: timeInSelect,
  timeout: timeoutSelect,
  rooms: roomsSelect,
  capacity: capacitySelect,
  address: addressSelect,
} = adForm.elements;

const priceDataset = priceInput.dataset;

/** Валадация для заголовка */
titleDataset.pristineRequiredMessage = validationMessage.REQUIRED;
titleDataset.pristineMinlengthMessage = validationMessage.LENGTH;
titleDataset.pristineMaxlengthMessage = validationMessage.LENGTH;

/** Валадация для адреса */
addressSelect.pristineRequiredMessage = validationMessage.REQUIRED;
const setCoordinates = (location) => {
  addressSelect.setAttribute('value', `${(location.lat).toFixed(5)}, ${(location.lng).toFixed(5)}`);
};

/** Валадация для прайса */
priceDataset.pristineRequiredMessage = validationMessage.REQUIRED;
priceDataset.pristineMaxMessage = validationMessage.MAX_PRICE;

/** Синхронизация полей время заезда и выезда */
timeInSelect.addEventListener('change', () => {
  timeoutSelect.value = timeInSelect.value;
});

timeoutSelect.addEventListener('change', () => {
  timeInSelect.value = timeoutSelect.value;
});

const pristine = new Pristine(adForm, PRISTINE_OPTIONS);

initPriceAndType(typeSelect, priceInput, pristine);
initCapacityAndRooms(capacitySelect, roomsSelect, pristine);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

/** Слайдер в поле цены */
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 10,
  connect: 'lower',
  format: {
    to(value) {
      return value.toFixed(0);
    },
    from(value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  const diff = Math.abs(priceInput.value - sliderValue);

  if(diff >= 10){
    priceInput.value = sliderValue;
  }
});

priceInput.addEventListener('input', ({target: {value}}) => sliderElement.noUiSlider.set(value));

sliderElement.setAttribute('disabled', true);

sliderElement.removeAttribute('disabled');

adForm.addEventListener('reset', () => {
  sliderElement.noUiSlider.set(0);
});

const blockSubmitButton = () => {
  adFormButton.disabled = true;
  adFormButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  adFormButton.disabled = false;
  adFormButton.textContent = 'Опубликовать';
};

/** Отправка формы */
const setUserFormSubmit = (cb) => {
  adForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(evt.target));
      unblockSubmitButton();
    }
  });
};

const onResetButtonClick = (cb) => {
  const resetButton = adForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', cb);
};

export {setUserFormSubmit, setCoordinates, adForm, onResetButtonClick};


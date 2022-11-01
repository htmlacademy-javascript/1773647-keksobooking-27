const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

/**
 * @param {string} tag
 * @param {HTMLFormElement} form
 * @param {boolean} [isDisable = true]
 */

const disableElementForm = (tag, form, isDisable = true) => {
  const elements = form.querySelectorAll(tag);

  for (const element of elements) {
    element.disabled = isDisable;
  }
};

const DISABLED_CLASSES = ['ad-form--disabled', 'map__filters--disabled'];

const switchAdFormState = (isDisable = true) => {
  [adForm, filtersForm].forEach((form, index) => {
    form.classList.toggle(DISABLED_CLASSES[index], isDisable);
    disableElementForm('fieldset', form, isDisable);
  });

  disableElementForm('select', filtersForm, isDisable);
};

export{switchAdFormState};

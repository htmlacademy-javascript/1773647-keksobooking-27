import { getBEMModifier } from './utils.js';

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

/**
 * Функция, которая блокирует и разблокирует форму
 * @param {HTMLFormElement} form
 * @param {string[]} selectors массив CSS селекторов
 */
const createFormSwitcher = (form, selectors = ['fieldset']) => {
  const disableClass = getBEMModifier(form, 'disabled');

  return () => {
    form.classList.toggle(disableClass);

    const isDisable = form.classList.contains(disableClass);

    selectors.forEach((cssSelector) =>
      disableElementForm(cssSelector, form, isDisable)
    );
  };
};

const switchFilterState = createFormSwitcher(filtersForm, ['fieldset', 'selector']);

const switchAdFormState = createFormSwitcher(adForm);

export { switchAdFormState, switchFilterState };

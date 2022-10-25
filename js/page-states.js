const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const switchAdFormState = (isDisable = true) => {
  adForm.classList.toggle('ad-form--disabled', isDisable);
  mapFilters.classList.toggle('ad-form--disabled', isDisable);

  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = isDisable;
  });

  const selectFilter = adForm.querySelectorAll('select');
  selectFilter.forEach((fieldset) => {
    fieldset.disabled = isDisable;
  });
};

export{switchAdFormState};


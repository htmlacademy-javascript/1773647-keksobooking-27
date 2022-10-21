// const blockedForm = () => {
//   const adForm = document.querySelector('.ad-form');
//   const mapFilters = document.querySelector('.map__filters');

//   adForm.classList.add('ad-form--disabled');
//   mapFilters.classList.add('map__filters--disabled');

//   const elementsInput = adForm.getElementsByTagName('input');
//   for (let i = 0; i < elementsInput.length; i++) {
//     elementsInput[i].setAttribute('disabled', true);
//   }

//   const selectForm = adForm.getElementsByTagName('select');
//   for (let i = 0; i < selectForm.length; i++) {
//     selectForm[i].setAttribute('disabled', true);
//   }

//   const elementsDescription = adForm.querySelector('#description');
//   elementsDescription.setAttribute('disabled', true);

//   const selectMapFilters = mapFilters.getElementsByTagName('select');
//   for (let i = 0; i < selectMapFilters.length; i++) {
//     selectMapFilters[i].setAttribute('disabled', true);
//   }

//   const mapFiltersInput = mapFilters.getElementsByTagName('input');
//   for (let i = 0; i < mapFiltersInput.length; i++) {
//     mapFiltersInput[i].setAttribute('disabled', true);
//   }
// };

// blockedForm();

const adForm = document.querySelector('.ad-form');

const adFormOff = () => {
  adForm.classList.add('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const adFormOn = () => {
  adForm.classList.remove('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

export{adFormOff, adFormOn};


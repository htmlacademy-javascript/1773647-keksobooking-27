import { adForm, setCoordinates, setUserFormSubmit, sliderElement, onResetButtonClick } from './ad-form.js';
import { switchAdFormState } from './page-states.js';
import { initMap, setOnMapLoad, setAdPins } from './map.js';
import { getData, sendData } from './api.js';
import { showAlert } from './utils.js';
import { showSuccess, showError } from './modal.js';
import { resetFilters } from './filter.js';
import { seveLocations } from './locations.js';

const INIT_COORDS = {
  lat: 35.682339,
  lng: 139.75318,
};

switchAdFormState();
setOnMapLoad(() => switchAdFormState(false));

const resetCoordinate = () => {
  setCoordinates(INIT_COORDS);
  initMap(INIT_COORDS);
};

resetCoordinate();
resetFilters();

onResetButtonClick(resetFilters);

adForm.addEventListener('reset', () => {
  sliderElement.noUiSlider.set(0);
  resetCoordinate();
});

// const onLoadLocations = (location) => {
//   setAdPins();
// };

getData(
  (location) => {
    seveLocations(location);
    setAdPins(location);
  },
  showAlert,);

const onSuccess = () => {
  showSuccess();
  adForm.reset();
};

setUserFormSubmit(async (data) => {
  await sendData(onSuccess, showError, data);
});

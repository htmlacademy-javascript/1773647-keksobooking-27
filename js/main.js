import { adForm, setCoordinates, setUserFormSubmit } from './ad-form.js';
import { switchAdFormState } from './page-states.js';
import { initMap, setOnMapLoad, setAdPins } from './map.js';
import { getData, sendData } from './api.js';
import { showAlert } from './utils.js';
import { showSuccess, showError } from './modal.js';
import './filter.js';
import './image.js';

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
getData(setAdPins, showAlert);

adForm.addEventListener('reset', resetCoordinate);

const onSuccess = () => {
  showSuccess();
  adForm.reset();
};

setUserFormSubmit(async (data) => {
  await sendData(onSuccess, showError, data);
});


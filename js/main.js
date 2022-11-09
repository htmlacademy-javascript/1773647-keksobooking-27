import { resetForm, setCoordinates, setUserFormSubmit } from './ad-form.js';
import { switchAdFormState } from './page-states.js';
import { initMap, setOnMapLoad, setAdPins } from './map.js';
import { getData, sendData } from './api.js';
import { showAlert } from './utils.js';
import { showError } from './error.js';
import { showSuccess } from './success.js';

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

const onSenDataSuccess = () => {
  resetForm();
  resetCoordinate();
  showSuccess();
};

setUserFormSubmit(async (data) => {
  await sendData(showSuccess, showError, data);
});

onSenDataSuccess();
getData(setAdPins, showAlert);


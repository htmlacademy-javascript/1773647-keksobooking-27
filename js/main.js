import { adForm, setCoordinates, sliderElement } from './ad-form.js';
import { switchAdFormState, switchFilterState } from './page-states.js';
import { initMap, setOnMapLoad } from './map.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { initFilter, resetFilters } from './filter.js';
import { resetPhoto } from './image.js';

const INIT_COORDS = {
  lat: 35.682339,
  lng: 139.75318,
};

switchAdFormState();
switchFilterState();
setOnMapLoad(switchAdFormState);
initMap(INIT_COORDS);

adForm.addEventListener('reset', () => {
  sliderElement.noUiSlider.set(0);
  setCoordinates(INIT_COORDS);
  resetFilters();
  initMap(INIT_COORDS);
  resetPhoto();
});

getData(initFilter, showAlert);

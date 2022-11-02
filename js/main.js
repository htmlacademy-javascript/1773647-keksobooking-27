import './ad-form.js';
import {switchAdFormState} from './page-states.js';
import {adMocks} from './mock.js';
import {initMap, setAdPins, setOnMapLoad} from './map.js';

switchAdFormState();

initMap({
  lat: 35.682339,
  lng: 139.75318,
});
setOnMapLoad(() => switchAdFormState(false));

setAdPins(adMocks);

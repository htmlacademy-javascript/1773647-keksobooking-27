import {setCoordinates} from './ad-form.js';
import {switchAdFormState} from './page-states.js';
import {adMocks} from './mock.js';
import {initMap, setAdPins, setOnMapLoad} from './map.js';

const INIT_COORDS = {
  lat: 35.682339,
  lng: 139.75318,
};

switchAdFormState();
setOnMapLoad(() => switchAdFormState(false));

setCoordinates(INIT_COORDS);
initMap(INIT_COORDS);

setAdPins(adMocks);

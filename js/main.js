import './markup-elements.js';
import './ad-form.js';
import {initMap, createAdPinMarker, setAdPin, setOnMapLoad} from './map.js';

setOnMapLoad(() => {
  createAdPinMarker();
  setAdPin(location);
});

initMap();

import { mockAd } from './mock.js';
import {switchAdFormState} from './page-states.js';

const map = L.map('map-canvas')
  .on('load', () => {
    // console.log('Карта инициализирована');
    switchAdFormState(false);
  })
  .setView({
    lat: 35.42,
    lng: 139.36,
  }, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.68948,
    lng: 139.69170,
  },
  {
    draggable: true, // Метку можно передвигать по карте
    icon: mainPinIcon,
  }
);

marker.addTo(map);

marker.on('moveend', (evt) => {
  // console.log(evt.target.getLatLng());
});

const points = mockAd(location);
console.log(points);


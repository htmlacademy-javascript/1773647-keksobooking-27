import { getCoordinates } from './ad-form.js';
// import { mockAd } from './mock.js';
import { getCard } from './markup-elements.js';
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

// Главная иконка маркера на карте
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Виторостепенный маркер на карте
const pinIcon = L.icon({
  iconUrl: './img/pin.svg.',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Главный маркер на карте
const mainPinMarker = L.marker(
  {
    lat: 35.68948,
    lng: 139.69170,
  },
  {
    draggable: true, // Метку можно передвигать по карте
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

// Запись координат главного маркера для поля формы - Адрес
mainPinMarker.on('moveend', (evt) => {
  const coordinatesMarker = evt.target.getLatLng();
  getCoordinates(coordinatesMarker);
});

// Маркер похожих объявлений
const markerGroup = L.layerGroup().addTo(map);

const addMarkers = (point) => {
  point.forEach((element) => {
    const marker = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(getCard(element));
  });
};

console.log(addMarkers());

export {addMarkers};

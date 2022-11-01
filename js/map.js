import { getCoordinates } from './ad-form.js';
import { adMocks } from './mock.js';
import { switchAdFormState } from './page-states.js';

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map); // Маркер похожих объявлений
const OFFERS_COUNT = 10;
const CENTER_MAP = {
  lat: 35.682339,
  lng: 139.75318,
};

// Главная иконка маркера на карте
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Главный маркер на карте
const mainPinMarker = L.marker(
  { CENTER_MAP},
  {
    draggable: true, // Метку можно передвигать по карте
    icon: mainPinIcon,
  }
);

// Виторостепенный маркер на карте
const pinIcon = L.icon({
  iconUrl: './img/pin.svg.',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const initMap = (coordinate) => {
  map.setView(coordinate, 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },).addTo(map);

  mainPinMarker.setLatLng(coordinate);
  mainPinMarker.addTo(map);
};

// Запись координат главного маркера для поля формы - Адрес
mainPinMarker.on('moveend', (evt) => {
  const coordinatesMarker = evt.target.getLatLng();
  getCoordinates(coordinatesMarker);
});

// for(const ad of adMocks) {
//   console.log(ad.location);
// }

// Функция для создания второстепенных маркеров
const createAdPinMarker = (locations) => {
  locations.forEach((location) => {
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker.addTo(markerGroup).bindPopup(adMocks(location));
  });
};

const setAdPin = (locations) => {
  markerGroup.clearLayrs();
  createAdPinMarker(locations.slice(0, OFFERS_COUNT));
};

// Инициализация карты
const setOnMapLoad = () => {
  map.on('load', () => {
    switchAdFormState(false);
  });
};

export {initMap, createAdPinMarker, setAdPin, setOnMapLoad};

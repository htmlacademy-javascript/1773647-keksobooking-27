import { getCoordinates } from './ad-form.js';
import { markUpAd } from './markup-elements.js';

const map = L.map('map-canvas');
const OFFERS_COUNT = 10;

// Главная иконка маркера на карте
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Главный маркер на карте
const mainPinMarker = L.marker(
  {
    lat: 35.682339,
    lng: 139.75318,
  },
  {
    draggable: true, // Метку можно передвигать по карте
    icon: mainPinIcon,
  }
);

// Виторостепенный маркер на карте
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
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

/**
 * Запись координат главного маркера для поля формы - Адрес
 */
mainPinMarker.on('moveend', (evt) => {
  const coordinatesMarker = evt.target.getLatLng();
  getCoordinates(coordinatesMarker);
});

/**
 * Маркер похожих объявлений
 */
const markerGroup = L.layerGroup().addTo(map);

/**
 * Функция для создания второстепенных маркеров
 */
const createAdPinMarker = (locations) => {
  locations.forEach((location) => {
    const marker = L.marker(
      location.location,
      {
        icon: pinIcon,
      },
    );
    marker.addTo(markerGroup).bindPopup(markUpAd(location));
  });
};

const setAdPins = (locations) => {
  markerGroup.clearLayers();
  createAdPinMarker(locations.slice(0, OFFERS_COUNT));
};

// Инициализация карты
/**
 * @param {Function} cb
 */
const setOnMapLoad = (cb) => map.on('load', cb);

export {initMap, createAdPinMarker, setAdPins, setOnMapLoad};

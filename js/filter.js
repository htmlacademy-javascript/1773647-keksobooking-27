import { createAdPinMarker } from './map.js';
import { showAlert } from './utils.js';

const OFFERS_COUNT = 10;
const FILTER_DEFAULT = 'any';
const priceHousing = {
  MIN: 10000,
  MAX: 50000,
};

const filterElement = document.querySelector('.map__filters');

const compareType = (type) => {
  const typeField = filterElement.querySelector('#housing-type');
  return type === typeField.value || typeField.value === 'any';
};

/** Фильтрация по прайсу */
const filterByPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.price < priceHousing.MIN;
    case 'middle':
      return offer.price < priceHousing.MAX && offer.price > priceHousing.MIN;
    case 'high':
      return offer.price >= priceHousing.MAX;
  }
};

/** Устанавливает взаимосвязь между фильтром и объялениями */
const comparePrice = (price) => {
  const priceField = filterElement.querySelector('#housing-price');
  const priceRange = filterByPrice(price);
  return priceRange === priceField.value || priceField.value === FILTER_DEFAULT;
};

const compareRooms = (rooms) => {
  const roomsField = filterElement.querySelector('#housing-rooms');
  return rooms.toString() === roomsField.value || roomsField.value === FILTER_DEFAULT;
};

const compareGuests = (guests) => {
  const guestsField = filterElement.querySelector('#housing-guests');
  return guests.toString() === guestsField.value || guestsField.value === FILTER_DEFAULT;
};

const getcheckedCheckboxes = (featuresArray) => {
  const checkedCheckboxes = [];
  featuresArray.forEach((item) => {
    if (item.checked) {
      checkedCheckboxes.push(item.value);
    }
  });
  return checkedCheckboxes;
};

const compareFeatures = (features) => {
  const featuresCheckbox = filterElement.querySelectorAll('.map__checkbox');
  const checkedFeatures = getcheckedCheckboxes(featuresCheckbox);
  return checkedFeatures.length === 0 || features && checkedFeatures.every((element) => features.includes(element));
};

/** Функция для сравнения всех полей */
let offers = [];
const compareAllFields = () => {

  const filteredOffers = [];
  for(const offer of offers) {
    if(filteredOffers.length >= OFFERS_COUNT) {
      break;
    }
    if(
      compareType(offer.type)
      && comparePrice(offer.price)
      && compareRooms(offer.rooms)
      && compareGuests(offer.guests)
      && compareFeatures(offer.features)
    ) {
      filteredOffers.push(offer);
    }

    filteredOffers.forEach((ad) => createAdPinMarker(ad));
    if (filteredOffers.length === 0) {
      showAlert('Не нашлось подходящих объявлений, попробуйте изменить настройки фильтров');
    }
  }

  return filteredOffers;
};

const resetFilters = () => filterElement.reset();

const onAnyFieldChange = (cb) => {
  const mapFeatures = document.querySelectorAll('[name="features"]');
  filterElement.forEach((item) => item.addEventListener('change', cb));
  mapFeatures.forEach((item) => item.addEventListener('change', cb));
};

/** Функция для отображания похожих объявлений */
const renderSimilarAds = (otherAds) => {
  otherAds
    .slice(0, OFFERS_COUNT)
    .forEach((ad) => createAdPinMarker(ad));
};

export { compareAllFields, resetFilters, onAnyFieldChange, renderSimilarAds };

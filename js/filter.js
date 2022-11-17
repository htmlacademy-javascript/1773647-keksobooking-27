import { getAllLocations } from './locations.js';
import { setAdPins } from './map.js';
import { debounce } from './utils.js';

const priceHousing = {
  MIN: 10000,
  MAX: 50000,
};
const RERENDER_DELAY = 1000;
const FILTER_ALL = 'any';

/** @type {HTMLFormElement} */
const filterForm = document.querySelector('.map__filters');

/** @type {RadioNodeList} */
const features = filterForm.features;

const createFilters = () => ({
  type: filterForm['housing-type'].value,
  price: filterForm['housing-price'].value,
  rooms: filterForm['housing-rooms'].value,
  guests: filterForm['housing-guests'].value,
});

/**
 * @returns {string[]}
 */
const getCheckedFeatures = () => {
  const result = [];
  for(const feature of features) {
    if(feature.checked) {
      result.push(feature.value);
    }
  }
  return result;
};

const isFilteringByFeatures = (offer, features) =>
  offer.features ?
    features.every((feature) =>
      offer.features.includes(feature)
    ) :
    false;

/**
 * @param {{offer: {price: Number}}} offer
 * @param {Number} price
 * @return {Boolean}
 */
const isFilteringByPrice = (offer, price) => {
  switch (price) {
    case 'low':
      return offer.price < priceHousing.MIN;
    case 'middle':
      return offer.price < priceHousing.MAX && offer.price > priceHousing.MIN;
    case 'high':
      return offer.price >= priceHousing.MAX;
    default: // any
      return true;
  }
};

const isFilteringByValue = (value, filterValue) => filterValue === FILTER_ALL ? true : String(value) === String(filterValue);

const isFilteringLocation = ({offer}, filters) => {
  const filteredByType = isFilteringByValue(offer.type, filters.type);
  if (!filteredByType) {
    return false;
  }
  const filteredByRooms = isFilteringByValue(offer.rooms, filters.rooms);
  if (!filteredByRooms) {
    return false;
  }

  const filteredByGuests = isFilteringByValue(offer.guests, filters.guests);
  if (!filteredByGuests) {
    return false;
  }

  const filteredByPrice = isFilteringByPrice(offer, filters.price);
  if (!filteredByPrice) {
    return false;
  }

  return true;
};

/** Фильтруем локации по фильтрам */
const filterLocationsByFilters = (locations) => {
  const filters = createFilters();
  const filteredLocations = locations.filter((location) => isFilteringLocation(location, filters));

  return filteredLocations;
};

/** Фильтруем локации по удобствам */
const filterLocationsByFeatures = (locations) => {
  const checkedFeatures = getCheckedFeatures();

  return locations.filter(({ offer }) => isFilteringByFeatures(offer, checkedFeatures));
};

filterForm.addEventListener('input', () => {
  const locations = getAllLocations();
  const filteredLocations = filterLocationsByFilters(locations);

  setAdPins(filteredLocations);

  const filteredLocationsByFeatures = filterLocationsByFeatures(filteredLocations);
  const renderPins = () => setAdPins(filteredLocationsByFeatures);
  const setAdPinsDebounce = debounce(renderPins, RERENDER_DELAY);
  setAdPinsDebounce();
});

const resetFilters = () => filterForm.reset();

export { filterForm, resetFilters };

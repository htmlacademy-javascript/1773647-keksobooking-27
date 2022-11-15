import { getAllLocations } from './locations.js';
import { setAdPins } from './map.js';
import { debounce } from './utils.js';

const priceHousing = {
  MIN: 10000,
  MAX: 50000,
};

const RERENDER_DELAY = 1000;

/** @type {HTMLFormElement} */
const filterForm = document.querySelector('.map__filters');

const {
  ['housing-type']: selectType,
  ['housing-price']: selectPrice,
  ['housing-rooms']: selectRooms,
  ['housing-guests']: selectGuests,
} = filterForm;

const {
  ['filter-wifi']: checkboxWifi,
  ['filter-parking']: checkboxDishwasher,
  ['filter-dishwasher']: checkboxParking,
  ['filter-elevator']: checkboxElevator,
  ['filter-washer']: checkboxWasher,
  ['filter-conditioner']: checkboxConditioner,
} = filterForm;

const checkboxesFilter = [
  checkboxWifi,
  checkboxDishwasher,
  checkboxParking,
  checkboxWasher,
  checkboxElevator,
  checkboxConditioner
];

/**
 * @param {{offer: {features: String[]}}} offer
 * @param {String[]} name
 * @returns
 */
const filterBycheckbox = (offer, name) => {
  switch (name) {
    case 'wifi':
      return offer.features && offer.features.includes('wifi');
    case 'dishwasher':
      return offer.features && offer.features.includes('dishwasher');
    case 'parking':
      return offer.features && offer.features.includes('parking');
    case 'washer':
      return offer.features && offer.features.includes('washer');
    case 'elevator':
      return offer.features && offer.features.includes('elevator');
    case 'conditioner':
      return offer.features && offer.features.includes('conditioner');
  }
};

/**
   * @param {{offer: {price: Number}}} offer
   * @param {Number} price
   * @return {Boolean}
 */
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

filterForm.addEventListener('input', ({target}) => {
  const locations = getAllLocations();

  if(target === selectType) {
    const filteredLocations = locations.filter(({offer}) => offer.type === selectType.value);
    setAdPins(filteredLocations);
  }

  if(target === selectPrice) {
    const filteredPrice = locations.filter(({ offer }) => filterByPrice(offer, selectPrice.value));
    setAdPins(filteredPrice);
  }

  if(target === selectRooms) {
    const filteredRooms = locations.filter(({offer}) => offer.rooms === +selectRooms.value);
    setAdPins(filteredRooms);
  }

  if(target === selectGuests) {
    const filteredGuests = locations.filter(({offer}) => offer.guests === +selectGuests.value);
    setAdPins(filteredGuests);
  }

  const filteredAccommodations = () => {
    if (checkboxesFilter.includes(target)) {
      const filtred = locations.filter(({offer}) => filterBycheckbox(offer, target.value));
      setAdPins(filtred);
    }
  };

  const setOnFilterChange = debounce(filteredAccommodations, RERENDER_DELAY);
  setOnFilterChange();
});

export { filterForm };

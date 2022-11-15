import { getAllLocations } from './locations.js';
import { setAdPins } from './map.js';

const priceHousing = {
  MIN: 10000,
  MAX: 50000,
};

/** @type {HTMLFormElement} */
const filterForm = document.querySelector('.map__filters');
const selectType = filterForm['housing-type'];
const selectPrice = filterForm['housing-price'];
const selectRooms = filterForm['housing-rooms'];
const selectGuests = filterForm['housing-guests'];

const checkboxWifi = filterForm['filter-wifi'];
const checkboxDishwasher = filterForm['filter-dishwasher'];
const checkboxParking = filterForm['filter-parking'];
const checkboxWasher = filterForm['filter-washer'];
const checkboxElevator = filterForm['filter-elevator'];
const checkboxConditioner = filterForm['filter-conditioner'];

const checkboxes = [
  checkboxWifi,
  checkboxDishwasher,
  checkboxParking,
  checkboxWasher,
  checkboxElevator,
  checkboxConditioner
];

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

  if (checkboxes.includes(target)) {
    const filtred = locations.filter(({ offer }) => filterBycheckbox(offer, target.value));
    setAdPins(filtred);
  }
});

const resetFilters = () => filterForm.reset();

export { resetFilters };

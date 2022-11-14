// import { createAdPinMarker } from './map.js';
// import { showAlert } from './utils.js';
import { getAllLocations } from './locations.js';
import { setAdPins } from './map.js';

// const OFFERS_COUNT = 10;
// const FILTER_DEFAULT = 'any';
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
// const selectFeatures = filterForm['housing-features'];

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
  if(target === selectType) {
    const locations = getAllLocations();
    const filteredLocations = locations.filter(({offer}) => offer.type === selectType.value);
    setAdPins(filteredLocations);
  }

  if(target === selectPrice) {
    const price = getAllLocations();
    const priceRange = filterByPrice(price);
    // console.log(priceRange);
    const filteredPrice = price.filter(({offer}) => offer.price === +selectPrice.value || priceRange === +selectPrice.value,);
    // console.log(filteredPrice);
    setAdPins(filteredPrice);
  }

  if(target === selectRooms) {
    const rooms = getAllLocations();
    const filteredRooms = rooms.filter(({offer}) => offer.rooms === +selectRooms.value);
    setAdPins(filteredRooms);
  }

  if(target === selectGuests) {
    const guests = getAllLocations();
    const filteredGuests = guests.filter(({offer}) => offer.guests === +selectGuests.value);
    setAdPins(filteredGuests);
  }

  /**
   * @param {{offer: {features: String[]}}} offer
   * @param {String[]} features
   * @return {Boolean}
   */
  // const isFilteringFeatures = (offer, features) => features.every((feature) => offer.offer.features.indexOf(feature) !== -1);
  // console.log(isFilteringFeatures);
});

// const resetFilters = () => filterForm.reset();

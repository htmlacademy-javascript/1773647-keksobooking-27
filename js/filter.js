const OFFERS_COUNT = 10;
const priceHousing = {
  MIN: 10000,
  MAX: 50000,
};

const filterElement = document.querySelector('.map__filters');
const typeField = filterElement.querySelector('#housing-type');
const priceField = filterElement.querySelector('#housing-price');
const roomsField = filterElement.querySelector('#housing-rooms');
const guestsField = filterElement.querySelector('#housing-guests');
const featuresCheckbox = filterElement.querySelectorAll('.map__checkbox');

const filterOff = () => {
  filterElement.disabled = true;
};

const filterOn = () => {
  filterElement.disabled = false;
};

const offers = [];

const filterByType = (offer, type) => type === 'any' || offer.offer.type === type;

const filterByPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < priceHousing.MIN;
    case 'middle':
      return offer.offer.price < priceHousing.MAX && offer.offer.price > priceHousing.MIN;
    case 'high':
      return offer.offer.price >= priceHousing.MAX;
  }
};

const filterByRooms = (offer, rooms) => rooms === 'any' || offer.offer.rooms === +rooms;

const filterByGuests = (offer, guests) => guests === 'any' || offer.offer.guests === +guests;

const filterByFeatures = (offer, features) => {
  if(!features.lenght) {
    return true;
  }
  if(!offer.offer.features) {
    return false;
  }

  return features.every((feature) => offer.offer.feature.includes(feature));
};

const getFilterOffers = () => {
  const selectType = typeField.value;
  const selectPrice = priceField.value;
  const selectRooms = roomsField.value;
  const selectGuests = guestsField.value;
  const selectFeatures = [];

  featuresCheckbox.forEach((checkbox) => {
    if(checkbox.checked) {
      selectFeatures.push(checkbox.value);
    }
  });

  const filteredOffers = [];
  for(const offer of offers) {
    if(filteredOffers.length >= OFFERS_COUNT) {
      break;
    }
    if(
      filterByType(offer, selectType) &&
      filterByPrice(offer, selectPrice) &&
      filterByRooms(offer, selectRooms) &&
      filterByGuests(offer, selectGuests) &&
      filterByFeatures(offer, selectFeatures)
    ) {
      filteredOffers.push(offer);
    }
  }

  return filteredOffers;
};

const setOnFilterChange = (cb) => {
  filterElement.addEventListener('change', () => cb(getFilterOffers));
};

export { filterOff, filterOn, setOnFilterChange };

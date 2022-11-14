const houseTypeToString = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

/**
 * @param {Element} card Элемент клонирования карточки
 * @param {import ('./mock.js').Feature[] | undefined} features Массив преимуществ
*/
const markUpFeatures = (card, features) => {
  const featuresList = card.querySelector('.popup__features');

  if(features === undefined || features?.length === 0) {
    return featuresList.remove();
  }

  featuresList.textContent = '';
  for (const feature of features) {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(`popup__feature--${feature}`);

    featuresList.append(featureElement);
  }
};

/**
 * @param {Element} cardElement
 * @param {String[]} [photos]
*/
const markUpPhotos = (cardElement, photos) => {

  /** @type {Element} */
  const photoWrapper = cardElement.querySelector('.popup__photos');
  const photoTemplate = cardElement.querySelector('.popup__photo');
  photoWrapper.removeChild(photoTemplate);

  if(photos === undefined || photos.length === 0) {
    return cardElement.remove(photoTemplate);
  }

  for( const photo of photos){

    /** @type {HTMLImageElement} */
    const photoElement = photoTemplate.cloneNode();
    photoElement.src = photo;
    photoWrapper.append(photoElement);
  }
};

export const markUpAd = ({offer, author}) => {

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = houseTypeToString[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  markUpFeatures(cardElement, offer.features);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  markUpPhotos(cardElement, offer.photos);
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  return cardElement;
};

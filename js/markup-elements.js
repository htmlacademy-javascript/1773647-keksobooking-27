// На основе временных данных для разработки и шаблона #card создайте DOM-элементы, соответствующие объявлениям, и заполните их данными:

// Выведите заголовок объявления offer.title в заголовок .popup__title.

// Выведите адрес offer.address в блок .popup__text--address.

// Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».

// В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
// Квартира для flat
// Бунгало для bungalow
// Дом для house
// Дворец для palace
// Отель для hotel

// Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».

// Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».

// В список .popup__features выведите все доступные удобства в объявлении.
// В блок .popup__description выведите описание объекта недвижимости offer.description.
// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
// Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
// Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
import {mockAd} from './mock';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mockPopup = document.querySelector('#map-canvas');
const similarMock = mockAd();
const cardFragment = document.createDocumentFragment();

similarMock.forEach((element) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = element.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
  // cardElement.querySelector('.popup__text--price').textContent = element.`${offer.price} ₽/ночь`;
  // cardElement.querySelector('.popup__text--capacity').textContent = element.`${offer.rooms} комнаты для ${offer.guests} гостей`;
  // cardElement.querySelector('.popup__text--time').textContent = element.`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = element.offer.features;
  cardElement.querySelector('.popup__description').textContent = element.offer.description;
  cardElement.querySelector('.popup__avatar').src = element.author.avatar;
  cardFragment.append(cardElement);
});

mockPopup.append(cardFragment);

import { setAdPins } from './map.js';

const GET_URL = 'https://27.javascript.pages.academy/keksobooking/data';

const getData = () => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // throw new Error('error');
      setAdPins(data);
    });

};

getData();

//Получение данных - Если при загрузке данных с сервера произошла ошибка запроса, нужно показать соответствующее сообщение. Дизайн блока с сообщением нужно придумать самостоятельно.

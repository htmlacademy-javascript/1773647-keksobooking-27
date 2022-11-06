import { setAdPins } from './map.js';

const GET_URL = 'https://27.javascript.pages.academy/keksobooking/data';

const getData = () => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setAdPins(data);
    });
};

getData();

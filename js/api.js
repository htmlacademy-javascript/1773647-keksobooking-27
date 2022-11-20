const BASE_URL = 'https://27.javascript.pages.academy/keksobooking';
const GET_URL = `${BASE_URL}/data`;

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(GET_URL);

    if(!response.ok) {
      throw new Error ('Не удалось загрузить объявления');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(BASE_URL,
      {
        method: 'POST',
        body,
      });

    if(!response.ok) {
      throw new Error ('Не удалось отправить форму. Попробуйте еще раз.');
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export { getData, sendData };

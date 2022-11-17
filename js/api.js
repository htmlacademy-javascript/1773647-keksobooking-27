const GET_URL = 'https://27.javascript.pages.academy/keksobooking/data';

const getData = async (onSuccess, onFail) => {
  try {
    const responce = await fetch(GET_URL);

    if(!responce.ok) {
      throw new Error ('Не удалось загрузить объявления');
    }

    const offers = await responce.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  const FORM_URL = 'https://27.javascript.pages.academy/keksobooking';

  try {
    const responce = await fetch(FORM_URL,
      {
        method: 'POST',
        body,
      });

    if(!responce.ok) {
      throw new Error ('Не удалось отправить форму. Попробуйте еще раз.');
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export { getData, sendData };

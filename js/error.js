export const showAlert = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');

  document.body.append(errorElement);

  const clickHandler = () => {
    errorElement.remove();
  };
  const keydownHandler = (evt) => {
    // console.log('evt.Code'); // почему не работает?
    if(evt.Code === 27) {
      errorElement.remove();
      document.removeEventListener('keydown', keydownHandler);
    }
  };
  errorButton.addEventListener('click', clickHandler);

  document.addEventListener('keydown', keydownHandler);

  document.addEventListener('click', clickHandler);
};


export const showError = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');

  document.body.append(errorElement);
  document.body.style.overflow = 'hidden';
  document.body.style.overflow = 'auto';

  const clickHandler = () => {
    errorElement.remove();
  };

  const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
  const keydownHandler = (evt) => {
    if(isEscEvent(evt)) {
      errorElement.remove();
      document.removeEventListener('keydown', keydownHandler);
    }
  };

  errorButton.addEventListener('click', clickHandler);
  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('click', clickHandler);
};


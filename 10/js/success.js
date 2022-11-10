export const showSuccess = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);

  document.body.append(successElement);
  document.body.style.overflow = 'hidden';
  document.body.style.overflow = 'auto';

  const clickHandler = () => {
    successElement.remove();
  };

  const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
  const keydownHandler = (evt) => {
    if(isEscEvent(evt)) {
      successElement.remove();
      document.removeEventListener('keydown', keydownHandler);
    }
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('keydown', keydownHandler);
};


const ALERT_SHOW_TIME = 5000;

/** Сообщение об ошибки */
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '20px 15px';
  alertContainer.style.fontSize = '34px';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

/** @param {KeyboardEvent} evt */
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

/** Функция для устранения дребезга */
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

/**
 * @param {HTMLElement} block
 * @param {string} modifier
 */
const getBEMModifier = (block, modifier) => {
  if(block.classList.length) {
    const className = block.classList[0];
    return `${className}--${modifier}`;
  }
};

export { showAlert, isEscEvent, debounce, getBEMModifier };

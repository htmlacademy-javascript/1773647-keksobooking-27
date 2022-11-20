const roomsToCapacity = {
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '1': ['1'],
  '100': ['0'],
};

/**
 * @param {HTMLSelectElement} capacitySelect
 * @param {HTMLSelectElement} roomsSelect
 * @param {*} pristine
 */
export const initCapacityAndRooms = (capacitySelect, roomsSelect, pristine) => {

  pristine.addValidator(capacitySelect, (value) => {

    /** @type {string} */
    const roomAmount = roomsSelect.value;
    return roomsToCapacity[+roomAmount].includes(value);
  },
  () => {
    const roomAmout = roomsSelect.value;

    if(roomAmout === '1') {
      return 'Для 1 гостя';
    }
    if (roomAmout === '2') {
      return 'Для 1 или 2 гостей';
    }
    if (roomAmout === '3') {
      return 'Для 1, 2 или 3 гостей';
    }
    if (roomAmout === '100') {
      return 'Не для гостей';
    }
  });

  roomsSelect.addEventListener('input', () => pristine.validate(capacitySelect));
};

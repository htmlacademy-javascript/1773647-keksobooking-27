
const roomsToCapacity = {
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '1': ['1'],
  '100': ['0'],
};

/**
 *
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

    if (roomAmout === '100') {
      return 'Только не для гостей';
    }

    /** @type {string[]} */
    const options = roomsToCapacity[roomAmout];
    const onlyAvailable = `${options.slice(0, -1).join(', ')} или 1 гостя`;

    return `${roomsSelect.selectedOptions[0].innerText} доступно только ${onlyAvailable}`;
  });

  roomsSelect.addEventListener('input', () => pristine.validate(capacitySelect));
};

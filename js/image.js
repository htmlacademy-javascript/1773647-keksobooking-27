
/** Фото пользователя */
const fileAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const onAvatarChange = () => {
  const file = fileAvatar.files[0];

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (file && matches(file)) {
    previewAvatar.src = URL.createObjectURL(file);
  }
};

/** Фото жилья */
const fileChooser = document.querySelector('.ad-form__upload input[type=file]');
const previewZone = document.querySelector('.ad-form__photo');

const onZoneChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(file && matches(file)) {
    previewZone.innerHTML = '';

    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.style.maxWidth = '100%';
    image.style.height = 'auto';
    previewZone.append(image);
  }
};

const resetAvatarAndZone = () => {
  previewAvatar.src = DEFAULT_AVATAR;
  previewZone.innerHTML = '';
};

export { onAvatarChange, onZoneChange, resetAvatarAndZone };

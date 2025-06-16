export const requiredForm = {
  required: 'Заполните поле',
};

export const emailForm = {
  required: 'Поле обязательно для ввода',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Неверный адрес электронной почты',
  },
};

export const passwordForm = {
  required: 'Поле обязательно для ввода',
  maxLength: { value: 64, message: 'Пароль не должен содержать более 64 символов' },
};

import { store } from '../redux/store'; // make sure your store is exported as named export
import { setLanguage } from '../redux/languageSlice';

export const toggleLanguage = () => {
  const currentLang = store.getState().language.language;
  const newLang = currentLang === 'es' ? 'en' : 'es';
  store.dispatch(setLanguage(newLang));
};

export const validateEcuadorianCedula = (cedula) => {
  if (!/^\d{10}$/.test(cedula)) {
    return false; // Not exactly 10 digits
  }

  const provinceCode = parseInt(cedula.substring(0, 2), 10);
  const thirdDigit = parseInt(cedula[2], 10);

  if (provinceCode < 1 || provinceCode > 24 || thirdDigit > 5) {
    return false;
  }

  const digits = cedula.split('').map(Number);
  let total = 0;

  for (let i = 0; i < 9; i++) {
    let value = digits[i];
    if (i % 2 === 0) {
      value *= 2;
      if (value > 9) value -= 9;
    }
    total += value;
  }

  const checkDigit = total % 10 === 0 ? 0 : 10 - (total % 10);
  return checkDigit === digits[9];
};

export const isStrongPassword = (password) => {
  const lengthCheck = /.{8,}/;
  const lowercaseCheck = /[a-z]/;
  const uppercaseCheck = /[A-Z]/;
  const numberCheck = /[0-9]/;
  const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    lengthCheck.test(password) &&
    lowercaseCheck.test(password) &&
    uppercaseCheck.test(password) &&
    numberCheck.test(password) &&
    specialCharCheck.test(password)
  );
};

export const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
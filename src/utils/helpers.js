import { store } from "../redux/store";
import { Linking } from "react-native";
import { setLanguage } from "../redux/languageSlice";
import STRINGS from "../constants/strings";

export const toggleLanguage = () => {
  const currentLang = store.getState().language.language;
  const newLang = currentLang === "es" ? "en" : "es";
  store.dispatch(setLanguage(newLang));
};

export const setLanguageTo = (language) => {
  store.dispatch(setLanguage(language));
};

export const validateEcuadorianCedula = (cedula) => {
  if (!/^\d{10}$/.test(cedula)) {
    return false;
  }

  const provinceCode = parseInt(cedula.substring(0, 2), 10);
  const thirdDigit = parseInt(cedula[2], 10);

  if (provinceCode < 1 || provinceCode > 24 || thirdDigit > 5) {
    return false;
  }

  const digits = cedula.split("").map(Number);
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
  const numberCheck = /\d/;
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
  const formatedDate = new Date(date);
  const day = formatedDate.getDate().toString().padStart(2, "0");
  const month = (formatedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = formatedDate.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateText = (isoDateStr, language) => {
  const date = new Date(isoDateStr);

  const dayName = STRINGS[language].daysOfWeek[date.getUTCDay()];
  const day = String(date.getUTCDate());
  const monthName = STRINGS[language].months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${dayName} ${day} ${monthName} ${year}`;
};

export const formatTime = (isoDateStr, addMinutes = 0) => {
  const date = new Date(isoDateStr);

  date.setUTCMinutes(date.getUTCMinutes() + addMinutes);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const getCurrentTimeHHSS = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const callPhone = (number) => {
  Linking.openURL(`tel:${number}`);
};

export const sendEmail = (emailAddress) => {
  Linking.openURL(`mailto:${emailAddress}`);
};

export const appendPhoto = (formData, uri) => {
  if (!uri) return;

  const name = uri.split("/").pop();
  const ext = name.split(".").pop();
  const type = `image/${ext}`;

  formData.append("photo", { uri, name, type });
};
export const appendSimpleFields = (formData, userData) => {
  for (const key in userData) {
    if (key !== "profileImageUri" && key !== "profile") {
      formData.append(key, userData[key]);
    }
  }
};

export const appendProfileFields = (formData, profile) => {
  if (!profile) return;

  const { address, medicalConditions, vaccines, ...rest } = profile;

  if (address) {
    formData.append("profile.address.street", address.street);
    formData.append("profile.address.city", address.city);
    formData.append("profile.address.country", address.country);
  }

  if (medicalConditions) {
    formData.append(
      "profile.medicalConditions",
      JSON.stringify(medicalConditions),
    );
  }

  if (vaccines) {
    formData.append("profile.vaccines", JSON.stringify(vaccines));
  }

  for (const key in rest) {
    formData.append(`profile.${key}`, rest[key]);
  }
};

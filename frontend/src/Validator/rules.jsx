const requiredValue = "REQUIRED_VALUE";
const minValue = "MIN_VALUE";
const maxValue = "MAX_VALUE";
const emailValue = "EMAIL_VALUE";
const numberValue = "NUMBER_VALUE";

export const requiredValidator = () => ({
  value: requiredValue,
});
export const minValidator = (min) => ({
  value: minValue,
  min,
});
export const maxValidator = (max) => ({
  value: maxValue,
  max,
});
export const emailValidator = () => ({
  value: emailValue,
});
export const phoneNumberValidator = () => ({
  value: numberValue,
});
export default {
  requiredValue,
  minValue,
  maxValue,
  emailValue,

  numberValue,
};

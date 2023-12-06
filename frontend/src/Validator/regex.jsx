const testEmail = (value) => {
  const emailPattern = /^[a-z0-90._-]+@[a-z]+\.[a-z]{2,3}$/g;
  return emailPattern.test(value);
};
const testCodeMelli = (value) => {
  const codeMelliPattern = /^\d{10}$/g;
  return codeMelliPattern.test(value)
};
const testPhoneNumber = (value) => {
  const phoneNumberPattern = /^09\d{9}$/g;
  return phoneNumberPattern.test(value);
};
export default { testEmail, testCodeMelli, testPhoneNumber };

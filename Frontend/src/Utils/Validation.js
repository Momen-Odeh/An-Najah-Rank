export const validateEmail = (email) => {
  const pattern = /^[\w\.-]+@[\w\.-]+$/;
  return pattern.test(email);
};

export const validatePassword = (password) => {
  /*
    At least 8 characters in length.
    Contains at least one uppercase letter.
    Contains at least one lowercase letter.
    Contains at least one digit.
    May contain special characters (e.g., !, @, #, $, %, etc.).
  */
  const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  //   return pattern.test(password);
  return password.length >= 6;
};

export const validateFullName = (fullName) => {
  return fullName.length >= 3;
};

export const validateUniversityNumber = (universityNumber) => {
  const patternNum = /^[-+]?\d*\.?\d*$/;
  return patternNum.test(universityNumber) && universityNumber.length >= 3;
};

import { useLanguage } from "../LanguageContext";



export const emailValidator = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
};

export const passwordValidator = (password) => {
  // Check length
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long",
    };
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one lowercase letter",
    };
  }

  // Check for digit
  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one digit",
    };
  }

  // Check for special characters
  if (!/[!@#$%^&*()\-_=+<>?/]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one special character",
    };
  }

  // If all checks pass
  return { valid: true, message: "Password is valid" };
};

export const convertTime = (submittedDate) => {
  const {translation} = useLanguage();
  //TODO unit tests for this

  const day = 1000 * 60 * 60 * 24;
  const hour = day / 24;

  const current = Date.now();
  const dateSubmitted = new Date(submittedDate).getTime();
  const difference = current - dateSubmitted;
  
  if (difference >= day) {
    const differenceInDays = Math.round(difference / (1000 * 3600 * 24));
    return `${differenceInDays} ${translation.screens.authScreens.caseSelection.day} ago`;
  }
  if (difference >= hour) {
    const differenceInHours = Math.round(difference / (1000 * 3600));
    return `${differenceInHours} ${translation.screens.authScreens.caseSelection.hour} ago`;
  }

  return `< 1 ${translation.screens.authScreens.caseSelection.single} ago`;
};

export const convertDate = (submittedDate) => {
    const date = new Date(submittedDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();

    const formattedDate = `${day} - ${month} - ${year}`;
    return formattedDate
}

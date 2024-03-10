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
        return { valid: false, message: "Password must be at least 8 characters long" };
    }
    
    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    
    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    
    // Check for digit
    if (!/\d/.test(password)) {
        return { valid: false, message: "Password must contain at least one digit" };
    }
    
    // Check for special characters
    if (!/[!@#$%^&*()\-_=+<>?/]/.test(password)) {
        return { valid: false, message: "Password must contain at least one special character" };
    }
    
    // If all checks pass
    return { valid: true, message: "Password is valid" };
}
export const validatePassword = (password: string): string => {
    const minLength = 4;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[+!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 4 characters long';
    }
    // if (!hasUpperCase) {
    //   return 'Password must contain at least one uppercase letter';
    // }
    // if (!hasLowerCase) {
    //   return 'Password must contain at least one lowercase letter';
    // }
    if (!hasNumbers) {
      return 'Password must contain at least one number';
    }
    // if (!hasSpecialChar) {
    //   return 'Password must contain at least one special character';
    // }
    return 'Password is valid';
  };
export const validateEmail = (email: string): string => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailPattern.test(email)) {
      return 'Invalid email format';
    }
    return 'Email is valid';
  };

export const validateHouseholdName = (name: string): string => {
    
    if (name.length < 3) {
      return 'Household name must be at least 3 characters long';
    }
    return 'Household name is valid';
};
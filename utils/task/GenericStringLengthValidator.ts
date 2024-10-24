export const validateStringLength = (str: string, minLength: number): string => {
    if (str.length < minLength) {
        return `String must be at least ${minLength} characters long`;
    }
    return 'String is valid';
};

// Kanske skapa en validator för att kolla om task/chore redan finns i listan?
export const validateUsername = (username: string): string => {
    const minLength = 3;
    const maxLength = 20;
    const validCharacters = /^[a-zA-Z0-9_]+$/;

    if (username.length < minLength) {
        return 'Username must be at least 3 characters long';
    }
    if (username.length > maxLength) {
        return 'Username must be no more than 20 characters long';
    }
    if (!validCharacters.test(username)) {
        return 'Username can only contain letters, numbers, and underscores';
    }
    return 'Username is valid';
};

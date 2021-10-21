export const addToastMessages = errors => ({
    type: 'ADD_TOAST_MESSAGES',
    payload: errors
});

export const setLoggedUser = email => ({
    type: 'SET_LOGGED_USER',
    payload: email
});
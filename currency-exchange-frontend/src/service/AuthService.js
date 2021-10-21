export const isLoggedIn = () => {
    const emailLoggedUser = localStorage.getItem('emailLoggedUser');
    return emailLoggedUser && emailLoggedUser !== 'null';
}
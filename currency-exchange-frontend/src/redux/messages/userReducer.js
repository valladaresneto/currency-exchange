let INITIAL_STATE = {
    email: localStorage.getItem('emailLoggedUser')
};

const userReducer = (state = INITIAL_STATE, action) => {
    console.log('state' + JSON.stringify(state));
    switch (action.type) {
        case 'SET_LOGGED_USER':
            let email = action.payload;
            localStorage.setItem('emailLoggedUser', email);
            return {...state, email}
        default:
            return state;
    }
};

export default userReducer;
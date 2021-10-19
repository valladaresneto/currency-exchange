const toastMessages = {
    list: []
};

const messageReducer = (state = toastMessages, action) => {
    switch (action.type) {
        case 'ADD_TOAST_MESSAGES':
            let time = new Date().getTime();
            const newState = JSON.parse(JSON.stringify(state));
            newState.list = newState.list.filter(msg => {
                return (time - msg.time) < 3000;
            });
            if (action.payload) {
                action.payload.forEach(msg => {
                    msg.time = time;
                    newState.list.push(msg)
                });
            }
            return { ...newState };
        default:
            return state;
    }
};

export default messageReducer;
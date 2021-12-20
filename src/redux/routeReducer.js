const INIT_STATE = {
    location: '',
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case "REDIRECT":
            return { ...state, location: action.redirectTo };
        case "NOREDIRECT":
            return { ...state, location: '' };

        default: return { ...state };
    }
}

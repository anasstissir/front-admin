
export default (state = {}, action) => {
    switch (action.type) {
        case "NOTIFICATION_SUCCESS":
            return { ...state, message: action.message, type: 'success', uuid: action.uuid };

        case "NOTIFICATION_ERROR":
            return { ...state, message: action.message, type: 'error', uuid: action.uuid };

       
        default: return { ...state };
    }
}

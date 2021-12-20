import {
    GET_ADMIN_LIST,
    GET_ADMIN_LIST_SUCCESS,
    GET_ADMIN_LIST_ERROR,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    GET_USER,
    GET_USER_ERROR,
    GET_USER_SUCCESS
} from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ADMIN_LIST:
            return { ...state, loading: true, error: '' };

        case GET_ADMIN_LIST_SUCCESS:
            return { ...state, loading: false, list_admin: action.result, error: '', isCompleted: false };

        case GET_ADMIN_LIST_ERROR:
            return { ...state, loading: false, error: action.result };

        case GET_USER:
            return { ...state, loading: true, error: '', refresh: false };

        case GET_USER_SUCCESS:
            return { ...state, loading: false, toEdit: action.result, error: '' };

        case GET_USER_ERROR:
            return { ...state, loading: false, error: action.result };

        case ADD_USER:
            return { ...state, loading: true, error: '' };

        case ADD_USER_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case ADD_USER_ERROR:
            return { ...state, loading: false, error: action.result };
        case EDIT_USER:
            return { ...state, loading: true, error: '' };

        case EDIT_USER_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case EDIT_USER_ERROR:
            return { ...state, loading: false, error: action.result };
        case DELETE_USER:
            return { ...state, loading: true, error: '', refresh: false };

        case DELETE_USER_SUCCESS:
            return { ...state, loading: false, error: '', refresh: true };

        case DELETE_USER_ERROR:
            return { ...state, loading: false, error: action.result };
        default: return { ...state };
    }
}

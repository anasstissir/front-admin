import {
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    ADD_CATEGORY,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_ERROR,
    DELETE_CATEGORY,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    GET_NOTIFICATIONS,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_ERROR,
    GET_NOTIFICATION,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_ERROR,
    ADD_NOTIFICATION,
    ADD_NOTIFICATION_SUCCESS,
    ADD_NOTIFICATION_ERROR,
    EDIT_NOTIFICATION,
    EDIT_NOTIFICATION_SUCCESS,
    EDIT_NOTIFICATION_ERROR,
    DELETE_NOTIFICATION,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_ERROR,
    GET_CATEGORIE,
    GET_CATEGORIE_SUCCESS,
    GET_CATEGORIE_ERROR,
    EDIT_CATEGORY,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR
} from '../actions';
import * as Communication from '../actions'

export default (state = {}, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return { ...state, loading: true, error: '' };

        case GET_CATEGORIES_SUCCESS:
            return { ...state, loading: false, list_result: action.result, error: '', isCompleted: false };

        case GET_CATEGORIES_ERROR:
            return { ...state, loading: false, error: action.result };

        case ADD_CATEGORY:
            return { ...state, loading: true, error: '' };

        case ADD_CATEGORY_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case ADD_CATEGORY_ERROR:
            return { ...state, loading: false, error: action.result };
        case EDIT_CATEGORY:
            return { ...state, loading: true, error: '' };

        case EDIT_CATEGORY_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case EDIT_CATEGORY_ERROR:
            return { ...state, loading: false, error: action.result };
        case DELETE_CATEGORY:
            return { ...state, loading: true, error: '', refresh: false };

        case DELETE_CATEGORY_SUCCESS:
            return { ...state, loading: false, error: '', refresh: true };

        case DELETE_CATEGORY_ERROR:
            return { ...state, loading: false, error: action.result };
        case GET_NOTIFICATIONS:
            return { ...state, loading: true, error: '' };

        case GET_NOTIFICATIONS_SUCCESS:
            return { ...state, loading: false, list_result: action.result, error: '', isCompleted: false };

        case GET_NOTIFICATIONS_ERROR:
            return { ...state, loading: false, error: action.result };

        case ADD_NOTIFICATION:
            return { ...state, loading: true, error: '' };

        case ADD_NOTIFICATION_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case ADD_NOTIFICATION_ERROR:
            return { ...state, loading: false, error: action.result };
        case EDIT_NOTIFICATION:
            return { ...state, loading: true, error: '' };

        case EDIT_NOTIFICATION_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case EDIT_NOTIFICATION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.EDIT_EVENT:
            return { ...state, loading: true, error: '' };

        case Communication.EDIT_EVENT_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case Communication.EDIT_EVENT_ERROR:
            return { ...state, loading: false, error: action.result };
        case DELETE_NOTIFICATION:
            return { ...state, loading: true, error: '', refresh: false };

        case DELETE_NOTIFICATION_SUCCESS:
            return { ...state, loading: false, error: '', refresh: true };

        case DELETE_NOTIFICATION_ERROR:
            return { ...state, loading: false, error: action.result };
        case GET_CATEGORIE:
            return { ...state, loading: true, error: '', refresh: false };

        case GET_CATEGORIE_SUCCESS:
            return { ...state, loading: false, toEdit: action.result, error: '' };

        case GET_CATEGORIE_ERROR:
            return { ...state, loading: false, error: action.result };
        case GET_NOTIFICATION:
            return { ...state, loading: true, error: '', refresh: false };

        case GET_NOTIFICATION_SUCCESS:
            return { ...state, loading: false, toEdit: action.result, error: '' };

        case GET_NOTIFICATION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.ADD_COMMUNICATION:
            return { ...state, loading: true, error: '' };

        case Communication.ADD_COMMUNICATION_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case Communication.ADD_COMMUNICATION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.GET_COMMUNICATIONS:
            return { ...state, loading: true, error: '' };

        case Communication.GET_COMMUNICATIONS_SUCCESS:
            return { ...state, loading: false, comm_result: action.result, error: '', isCompleted: false };

        case Communication.GET_COMMUNICATIONS_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.GET_COMMUNICATION:
            return { ...state, loading: true, error: '', refresh: false };

        case Communication.GET_COMMUNICATION_SUCCESS:
            return { ...state, loading: false, displayed: action.result, error: '', isCompleted: false, refresh: false };

        case Communication.GET_COMMUNICATION_ERROR:
            return { ...state, loading: false, error: action.result, refresh: false };
        case Communication.GET_EVENTS:
            return { ...state, loading: true, error: '' };

        case Communication.GET_EVENTS_SUCCESS:
            return { ...state, loading: false, comm_result: action.result, error: '', isCompleted: false };

        case Communication.GET_EVENTS_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.GET_EVENT:
            return { ...state, loading: true, error: '' };

        case Communication.GET_EVENT_SUCCESS:
            return { ...state, loading: false, displayed: action.result, error: '', isCompleted: false };

        case Communication.GET_EVENT_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.PUBLISH_COMMUNICATION:
            return { ...state, loading: true, error: '', refresh: false };

        case Communication.PUBLISH_COMMUNICATION_SUCCESS:
            return { ...state, loading: false, error: '', refresh: true };

        case Communication.PUBLISH_COMMUNICATION_ERROR:
            return { ...state, loading: false, error: action.result, refresh: false };
        case Communication.NOTIFY_COMMUNICATION:
            return { ...state, loading: true, error: '', refresh: false };

        case Communication.NOTIFY_COMMUNICATION_SUCCESS:
            return { ...state, loading: false, error: '', refresh: true };

        case Communication.NOTIFY_COMMUNICATION_ERROR:
            return { ...state, loading: false, error: action.result, refresh: false };
        case Communication.DISTRUCT:
            return { ...state, displayed: '' };
        default: return { ...state };
    }
}

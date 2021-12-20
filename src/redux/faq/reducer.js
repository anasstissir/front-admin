
import * as Communication from '../actions'

export default (state = {}, action) => {
    switch (action.type) {
        case Communication.GET_SECTIONS:
            return { ...state, loading: true, error: '' };

        case Communication.GET_SECTIONS_SUCCESS:
            return { ...state, loading: false, list_result: action.result, error: '', isCompleted: false };

        case Communication.GET_SECTIONS_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.GET_SECTION:
            return { ...state, loading: true, error: '', refresh: false };

        case Communication.GET_SECTION_SUCCESS:
            return { ...state, loading: false, toEdit: action.result, error: '' };

        case Communication.GET_SECTION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.ADD_SECTION:
            return { ...state, loading: true, error: '' };

        case Communication.ADD_SECTION_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case Communication.ADD_SECTION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.EDIT_SECTION:
            return { ...state, loading: true, error: '' };

        case Communication.EDIT_SECTION_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case Communication.EDIT_SECTION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.DELETE_SECTION:
            return { ...state, loading: true, error: '', refresh: false };

        case Communication.DELETE_SECTION_SUCCESS:
            return { ...state, loading: false, error: '', refresh: true };

        case Communication.DELETE_SECTION_ERROR:
            return { ...state, loading: false, error: action.result };


        case Communication.GET_SUB_SECTIONS:
            return { ...state, loading: true, error: '' };

        case Communication.GET_SUB_SECTIONS_SUCCESS:
            return { ...state, loading: false, list_result: action.result,  error: '', isCompleted: false };

        case Communication.GET_SUB_SECTIONS_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.GET_SUB_SECTION:
            return { ...state, loading: true, error: '', refresh: false };

        case Communication.GET_SUB_SECTION_SUCCESS:
            return { ...state, loading: false, toEdit: action.result, error: '' };

        case Communication.GET_SUB_SECTION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.ADD_SUB_SECTION:
            return { ...state, loading: true, error: '' };

        case Communication.ADD_SUB_SECTION_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case Communication.ADD_SUB_SECTION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.EDIT_SUB_SECTION:
            return { ...state, loading: true, error: '' };

        case Communication.EDIT_SUB_SECTION_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case Communication.EDIT_SUB_SECTION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.DELETE_SUB_SECTION:
            return { ...state, loading: true, error: '', refresh: false };

        case Communication.DELETE_SUB_SECTION_SUCCESS:
            return { ...state, loading: false, error: '', refresh: true };

        case Communication.DELETE_SUB_SECTION_ERROR:
            return { ...state, loading: false, error: action.result };


        case Communication.GET_QUESTIONS:
            return { ...state, loading: true, error: '' };

        case Communication.GET_QUESTIONS_SUCCESS:
            return { ...state, loading: false, toEdit: null, list_result: action.result, error: '', isCompleted: false };

        case Communication.GET_QUESTIONS_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.GET_QUESTION:
            return { ...state, loading: true, error: '', refresh: false };

        case Communication.GET_QUESTION_SUCCESS:
            return { ...state, loading: false, toEdit: action.result, error: '' };

        case Communication.GET_QUESTION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.ADD_QUESTION:
            return { ...state, loading: true, error: '' };

        case Communication.ADD_QUESTION_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case Communication.ADD_QUESTION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.EDIT_QUESTION:
            return { ...state, loading: true, error: '' };

        case Communication.EDIT_QUESTION_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case Communication.EDIT_QUESTION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.DELETE_QUESTION:
            return { ...state, loading: true, error: '', refresh: false };

        case Communication.DELETE_QUESTION_SUCCESS:
            return { ...state, loading: false, error: '', refresh: true };

        case Communication.DELETE_QUESTION_ERROR:
            return { ...state, loading: false, error: action.result };

        case Communication.DISTRUCT:
            return { ...state, displayed: '' };
        default: return { ...state };
    }
}

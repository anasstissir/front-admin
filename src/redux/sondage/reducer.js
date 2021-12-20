
import * as Sondage from '../actions'

export default (state = {}, action) => {
    switch (action.type) {
        case Sondage.GET_SURVEYS:
            return { ...state, loading: true, error: '' };

        case Sondage.GET_SURVEYS_SUCCESS:
            return { ...state, loading: false, list_result: action.result, error: '', isCompleted: false };

        case Sondage.GET_SURVEYS_ERROR:
            return { ...state, loading: false, error: action.result };

        case Sondage.GET_SURVEY:
            return { ...state, loading: true, error: '', refresh: false };

        case Sondage.GET_SURVEY_SUCCESS:
            return { ...state, loading: false, displayed: action.result, error: '' };

        case Sondage.GET_SURVEY_ERROR:
            return { ...state, loading: false, error: action.result };

        case Sondage.ADD_SURVEY:
            return { ...state, loading: true, error: '' };

        case Sondage.ADD_SURVEY_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case Sondage.ADD_SURVEY_ERROR:
            return { ...state, loading: false, error: action.result };

        case Sondage.EDIT_SURVEY:
            return { ...state, loading: true, error: '' };

        case Sondage.EDIT_SURVEY_SUCCESS:
            return { ...state, loading: false, error: '', isCompleted: true };

        case Sondage.EDIT_SURVEY_ERROR:
            return { ...state, loading: false, error: action.result };

        case Sondage.DELETE_SURVEY:
            return { ...state, loading: true, error: '', refresh: false };

        case Sondage.DELETE_SURVEY_SUCCESS:
            return { ...state, loading: false, error: '', refresh: true };

        case Sondage.DELETE_SURVEY_ERROR:
            return { ...state, loading: false, error: action.result };

        case Sondage.PUBLISH_SURVEY:
            return { ...state, loading: true, error: '', refresh: false };

        case Sondage.PUBLISH_SURVEY_SUCCESS:
            return { ...state, loading: false, error: '', refresh: true };

        case Sondage.PUBLISH_SURVEY_ERROR:
            return { ...state, loading: false, error: action.result };

        case Sondage.NOTIFY_SURVEY:
            return { ...state, loading: true, error: '', refresh: false };

        case Sondage.NOTIFY_SURVEY_SUCCESS:
            return { ...state, loading: false, error: '', refresh: true };

        case Sondage.NOTIFY_SURVEY_ERROR:
            return { ...state, loading: false, error: action.result };

        case Sondage.GET_SURVEY_RESULT:
            return { ...state, loading: true, error: '', refresh: false };

        case Sondage.GET_SURVEY_RESULT_SUCCESS:
            return { ...state, loading: false, displayed: action.result, error: '', refresh: true };

        case Sondage.GET_SURVEY_RESULT_ERROR:
            return { ...state, loading: false, error: action.result };


        case Sondage.DISTRUCT:
            return { ...state, displayed: '' };
        default: return { ...state };
    }
}


import * as Kpi from '../actions'

const init = {
    communication: { viewd: {}, liked: {}, saded: {} },
    events: { viewd: {}, liked: {}, saded: {}, participed: {} },
    users: { viewd_article: {}, viewd_event: {}, participed_event: {} },
    faq: { favored: {} },
}

export default (state = init, action) => {
    switch (action.type) {
        case Kpi.GET_COUNT_USER:
            return { ...state, loading: true, error: '' };

        case Kpi.GET_COUNT_USER_SUCCESS:
            return { ...state, loading: false, actif_user: action.result, error: '' };

        case Kpi.GET_SURVEYS_ERROR:
            return { ...state, loading: false, error: action.result };


        case Kpi.GET_COUNT_SURVEY:
            return { ...state, loading: true, error: '' };

        case Kpi.GET_COUNT_SURVEY_SUCCESS:
            return { ...state, loading: false, sum_survey: action.result, error: '' };

        case Kpi.GET_COUNT_SURVEY_ERROR:
            return { ...state, loading: false, error: action.result };


        case Kpi.GET_COUNT_COMM:
            return { ...state, loading: true, error: '' };

        case Kpi.GET_COUNT_COMM_SUCCESS:
            return { ...state, loading: false, sum_comm: action.result, error: '' };

        case Kpi.GET_COUNT_COMM_ERROR:
            return { ...state, loading: false, error: action.result };


        case Kpi.GET_COUNT_EVENT:
            return { ...state, loading: true, error: '' };

        case Kpi.GET_COUNT_EVENT_SUCCESS:
            return { ...state, loading: false, sum_event: action.result, error: '' };

        case Kpi.GET_COUNT_EVENT_ERROR:
            return { ...state, loading: false, error: action.result };

        case Kpi.GET_COUNT_FAQ:
            return { ...state, loading: true, error: '' };

        case Kpi.GET_COUNT_FAQ_SUCCESS:
            return { ...state, loading: false, sum_faq: action.result, error: '' };

        case Kpi.GET_COUNT_FAQ_ERROR:
            return { ...state, loading: false, error: action.result };

        case Kpi.GET_ARTICLE_VIEWD:
            return { ...state, communication: { ...state.communication, viewed: { loading: true } } };

        case Kpi.GET_ARTICLE_VIEWD_SUCCESS:
            return { ...state, communication: { ...state.communication, viewed: { loading: false, result: action.result } } };

        case Kpi.GET_ARTICLE_VIEWD_ERROR:
            return { ...state, communication: { ...state.communication, viewed: { loading: false, error: action.result } } };

        case Kpi.GET_ARTICLE_LIKED:
            return { ...state, communication: { ...state.communication, liked: { loading: true } } };

        case Kpi.GET_ARTICLE_LIKED_SUCCESS:
            return { ...state, communication: { ...state.communication, liked: { loading: false, result: action.result } } };

        case Kpi.GET_ARTICLE_LIKED_ERROR:
            return { ...state, communication: { ...state.communication, liked: { loading: false, error: action.result } } };

        case Kpi.GET_ARTICLE_SADED:
            return { ...state, communication: { ...state.communication, saded: { loading: true } } };

        case Kpi.GET_ARTICLE_SADED_SUCCESS:
            return { ...state, communication: { ...state.communication, saded: { loading: false, result: action.result } } };

        case Kpi.GET_ARTICLE_SADED_ERROR:
            return { ...state, communication: { ...state.communication, saded: { loading: false, error: action.result } } };



        case Kpi.GET_EVENT_VIEWD:
            return { ...state, events: { ...state.events, viewed: { loading: true } } };

        case Kpi.GET_EVENT_VIEWD_SUCCESS:
            return { ...state, events: { ...state.events, viewed: { loading: false, result: action.result } } };

        case Kpi.GET_EVENT_VIEWD_ERROR:
            return { ...state, events: { ...state.events, viewed: { loading: false, error: action.result } } };

        case Kpi.GET_EVENT_LIKED:
            return { ...state, events: { ...state.events, liked: { loading: true } } };

        case Kpi.GET_EVENT_LIKED_SUCCESS:
            return { ...state, events: { ...state.events, liked: { loading: false, result: action.result } } };

        case Kpi.GET_EVENT_LIKED_ERROR:
            return { ...state, events: { ...state.events, liked: { loading: false, error: action.result } } };

        case Kpi.GET_EVENT_SADED:
            return { ...state, events: { ...state.events, saded: { loading: true } } };

        case Kpi.GET_EVENT_SADED_SUCCESS:
            return { ...state, events: { ...state.events, saded: { loading: false, result: action.result } } };

        case Kpi.GET_EVENT_SADED_ERROR:
            return { ...state, events: { ...state.events, saded: { loading: false, error: action.result } } };

        case Kpi.GET_EVENT_PARTICIPED:
            return { ...state, events: { ...state.events, participed: { loading: true } } };

        case Kpi.GET_EVENT_PARTICIPED_SUCCESS:
            return { ...state, events: { ...state.events, participed: { loading: false, result: action.result } } };

        case Kpi.GET_EVENT_PARTICIPED_ERROR:
            return { ...state, events: { ...state.events, participed: { loading: false, error: action.result } } };


        case Kpi.GET_FAQ_FAVOR:
            return { ...state, faq: { ...state.faq, favored: { loading: true } } };

        case Kpi.GET_FAQ_FAVOR_SUCCESS:
            return { ...state, faq: { ...state.faq, favored: { loading: false, result: action.result } } };

        case Kpi.GET_FAQ_FAVOR_ERROR:
            return { ...state, faq: { ...state.faq, favored: { loading: false, error: action.result } } };


        case Kpi.GET_USER_COMM_VIEW:
            return { ...state, users: { ...state.users, viewd_article: { loading: true } } };

        case Kpi.GET_USER_COMM_VIEW_SUCCESS:
            return { ...state, users: { ...state.users, viewd_article: { loading: false, result: action.result } } };

        case Kpi.GET_USER_COMM_VIEW_ERROR:
            return { ...state, users: { ...state.users, viewd_article: { loading: false, error: action.result } } };


        case Kpi.GET_USER_EVENT_PARTICIPATED:
            return { ...state, users: { ...state.users, participed_event: { loading: true } } };

        case Kpi.GET_USER_EVENT_PARTICIPATED_SUCCESS:
            return { ...state, users: { ...state.users, participed_event: { loading: false, result: action.result } } };

        case Kpi.GET_USER_EVENT_PARTICIPATED_ERROR:
            return { ...state, users: { ...state.users, participed_event: { loading: false, error: action.result } } };


        case Kpi.GET_USER_EVENT_VIEW:
            return { ...state, users: { ...state.users, viewd_event: { loading: true } } };

        case Kpi.GET_USER_EVENT_VIEW_SUCCESS:
            return { ...state, users: { ...state.users, viewd_event: { loading: false, result: action.result } } };

        case Kpi.GET_USER_EVENT_VIEW_ERROR:
            return { ...state, users: { ...state.users, viewd_event: { loading: false, error: action.result } } };



        case Kpi.DISTRUCT:
            return { ...state, displayed: '' };
        default: return { ...state };
    }
}

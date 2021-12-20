import * as Kpi from '../actions'

const API_METHOD = { POST: 'POST', GET: 'GET', PUT: 'PUT', DELETE: 'DELETE' }



export const getCountComm = (params) => {
  return {
    type: Kpi.GET_COUNT_COMM,
    meta: {
      API_CALL: 'communications/publishedCount',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_COUNT_COMM_SUCCESS,
      API_ERRORS: Kpi.GET_COUNT_COMM_ERROR
    }
  }
}

export const getCountFaq = (params) => {
  return {
    type: Kpi.GET_COUNT_FAQ,
    meta: {
      API_CALL: 'faqs/count',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_COUNT_FAQ_SUCCESS,
      API_ERRORS: Kpi.GET_COUNT_FAQ_ERROR
    }
  }
}

export const getCountEvent = (params) => {
  return {
    type: Kpi.GET_COUNT_EVENT,
    meta: {
      API_CALL: 'events/publishedCount',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_COUNT_EVENT_SUCCESS,
      API_ERRORS: Kpi.GET_COUNT_EVENT_ERROR
    }
  }
}

export const getCountSurvey = (params) => {
  return {
    type: Kpi.GET_COUNT_SURVEY,
    meta: {
      API_CALL: 'surveys/publishedCount',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_COUNT_SURVEY_SUCCESS,
      API_ERRORS: Kpi.GET_COUNT_SURVEY_ERROR
    }
  }
}

export const getCountUser = (params) => {
  return {
    type: Kpi.GET_COUNT_USER,
    meta: {
      API_CALL: 'users/activatedCount',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_COUNT_USER_SUCCESS,
      API_ERRORS: Kpi.GET_COUNT_USER_ERROR
    }
  }
}

export const getArticleViewed = (params) => {
  return {
    type: Kpi.GET_ARTICLE_VIEWD,
    meta: {
      API_CALL: 'communication-views/top-comm',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_ARTICLE_VIEWD_SUCCESS,
      API_ERRORS: Kpi.GET_ARTICLE_VIEWD_ERROR
    }
  }
}

export const getArticleLiked = (params) => {
  return {
    type: Kpi.GET_ARTICLE_LIKED,
    meta: {
      API_CALL: 'communication-likes/top-comm',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_ARTICLE_LIKED_SUCCESS,
      API_ERRORS: Kpi.GET_ARTICLE_LIKED_ERROR
    }
  }
}

export const getArticleSaded = (params) => {
  return {
    type: Kpi.GET_ARTICLE_SADED,
    meta: {
      API_CALL: 'communication-sads/top-comm',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_ARTICLE_SADED_SUCCESS,
      API_ERRORS: Kpi.GET_ARTICLE_SADED_ERROR
    }
  }
}

/* events */

export const getEventViewed = (params) => {
  return {
    type: Kpi.GET_EVENT_VIEWD,
    meta: {
      API_CALL: 'event-views/top-event',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_EVENT_VIEWD_SUCCESS,
      API_ERRORS: Kpi.GET_EVENT_VIEWD_ERROR
    }
  }
}

export const getEventLiked = (params) => {
  return {
    type: Kpi.GET_EVENT_LIKED,
    meta: {
      API_CALL: 'event-likes/top-event',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_EVENT_LIKED_SUCCESS,
      API_ERRORS: Kpi.GET_EVENT_LIKED_ERROR
    }
  }
}

export const getEventSaded = (params) => {
  return {
    type: Kpi.GET_EVENT_SADED,
    meta: {
      API_CALL: 'event-sads/top-event',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_EVENT_SADED_SUCCESS,
      API_ERRORS: Kpi.GET_EVENT_SADED_ERROR
    }
  }
}

export const getEventParticiped = (params) => {
  return {
    type: Kpi.GET_EVENT_PARTICIPED,
    meta: {
      API_CALL: 'event-participations/top-event',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_EVENT_PARTICIPED_SUCCESS,
      API_ERRORS: Kpi.GET_EVENT_PARTICIPED_ERROR
    }
  }
}

export const getFaqFavored = (params) => {
  return {
    type: Kpi.GET_FAQ_FAVOR,
    meta: {
      API_CALL: 'faq-favorises/top-faq',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_FAQ_FAVOR_SUCCESS,
      API_ERRORS: Kpi.GET_FAQ_FAVOR_ERROR
    }
  }
}


export const getUserParticipated = (params) => {
  return {
    type: Kpi.GET_USER_EVENT_PARTICIPATED,
    meta: {
      API_CALL: 'event-participations/top-users',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_USER_EVENT_PARTICIPATED_SUCCESS,
      API_ERRORS: Kpi.GET_USER_EVENT_PARTICIPATED_ERROR
    }
  }
}

export const getUserEvent = (params) => {
  return {
    type: Kpi.GET_USER_EVENT_VIEW,
    meta: {
      API_CALL: 'event-views/top-users',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_USER_EVENT_VIEW_SUCCESS,
      API_ERRORS: Kpi.GET_USER_EVENT_VIEW_ERROR
    }
  }
}

export const getUserComm = (params) => {
  return {
    type: Kpi.GET_USER_COMM_VIEW,
    meta: {
      API_CALL: 'communication-views/top-users',
      API_PAYLOAD: { params },
      API_SUCCESS: Kpi.GET_USER_COMM_VIEW_SUCCESS,
      API_ERRORS: Kpi.GET_USER_COMM_VIEW_ERROR
    }
  }
}

export const distruct= () => {
  return (
    {
      type: Kpi.DISTRUCT,
    }
  )
}
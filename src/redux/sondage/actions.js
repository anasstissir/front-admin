import * as Sondage from '../actions'

const API_METHOD = { POST: 'POST', GET: 'GET', PUT: 'PUT', DELETE: 'DELETE' }



export const getSurveyList = (params) => {
  return {
    type: Sondage.GET_SURVEYS,
    meta: {
      API_CALL: 'surveys',
      API_PAYLOAD: { params },
      API_SUCCESS: Sondage.GET_SURVEYS_SUCCESS,
      API_ERRORS: Sondage.GET_SURVEYS_ERROR
    }
  }
}

export const getSurvey = (id) => {
  return {
    type: Sondage.GET_SURVEY,
    meta: {
      API_CALL: 'surveys/'+id,
      API_SUCCESS: Sondage.GET_SURVEY_SUCCESS,
      API_ERRORS: Sondage.GET_SURVEY_ERROR
    }
  }
}

export const addSurvey = (survey) => {
  return (
    {
      type: Sondage.ADD_SURVEY,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'surveys',
        API_PAYLOAD: survey,
        API_SUCCESS: Sondage.ADD_SURVEY_SUCCESS,
        API_ERRORS: Sondage.ADD_SURVEY_ERROR
      },
      notification: {
        success : "Sondage ajouté avec succès"
      }
    }
  )
}

export const editSurvey= (cat) => {
  return (
    {
      type: Sondage.EDIT_SURVEY,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'surveys',
        API_PAYLOAD: cat,
        API_SUCCESS: Sondage.EDIT_SURVEY_SUCCESS,
        API_ERRORS: Sondage.EDIT_SURVEY_ERROR
      },
      notification: {
        success : "Sondage modifié avec succès"
      }
    }
  )
}

export const deleteSurvey = (category_id) => {
  return (
    {
      type: Sondage.DELETE_SURVEY,
      meta: {
        API_METHOD: API_METHOD.DELETE,
        API_CALL: 'surveys/' + category_id,
        API_SUCCESS: Sondage.DELETE_SURVEY_SUCCESS,
        API_ERRORS: Sondage.DELETE_SURVEY_ERROR
      },
      notification: {
        success : "Sondage supprimé avec succès"
      }
    }
  )
}

export const publishSurvey= (id) => {
  return (
    {
      type: Sondage.PUBLISH_SURVEY,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'surveys/'+id+'/publish',
        API_SUCCESS: Sondage.PUBLISH_SURVEY_SUCCESS,
        API_ERRORS: Sondage.PUBLISH_SURVEY_ERROR
      },
      notification: {
        success : "Sondage publié avec succès"
      }
    }
  )
}

export const notifySurvey = (id) => {
  return (
    {
      type: Sondage.NOTIFY_SURVEY,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'surveys/' + id + '/notify',
        API_SUCCESS: Sondage.NOTIFY_SURVEY_SUCCESS,
        API_ERRORS: Sondage.NOTIFY_SURVEY_ERROR
      },
      notification: {
        success : "Notification de sondage envoyée avec succès"
      }
    }
  )
}

export const getSurveyResult = (id) => {
  return (
    {
      type: Sondage.GET_SURVEY_RESULT,
      meta: {
        API_METHOD: API_METHOD.GET,
        API_CALL: 'surveys/' + id + '/result',
        API_SUCCESS: Sondage.GET_SURVEY_RESULT_SUCCESS,
        API_ERRORS: Sondage.GET_SURVEY_RESULT_ERROR
      }
    }
  )
}

export const distruct= () => {
  return (
    {
      type: Sondage.DISTRUCT,
    }
  )
}
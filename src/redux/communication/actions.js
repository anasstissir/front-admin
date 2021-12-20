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
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_ERROR,
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
  GET_CATEGORIE_ERROR
} from '../actions';

import * as Communication from '../actions'

const API_METHOD = { POST: 'POST', GET: 'GET', PUT: 'PUT', DELETE: 'DELETE' }



export const getCategoryList = (params) => {
  return {
    type: GET_CATEGORIES,
    meta: {
      API_CALL: 'communication-categories',
      API_PAYLOAD: { params },
      API_SUCCESS: GET_CATEGORIES_SUCCESS,
      API_ERRORS: GET_CATEGORIES_ERROR
    }
  }
}
export const getCategory = (id) => {
  return {
    type: GET_CATEGORIE,
    meta: {
      API_CALL: 'communication-categories/'+id,
      API_SUCCESS: GET_CATEGORIE_SUCCESS,
      API_ERRORS: GET_CATEGORIE_ERROR
    }
  }
}

export const addCategory = (category) => {
  return (
    {
      type: ADD_CATEGORY,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'communication-categories',
        API_PAYLOAD: category,
        API_SUCCESS: ADD_CATEGORY_SUCCESS,
        REDIRECT: '/gestion-admin',
        API_ERRORS: ADD_CATEGORY_ERROR
      },
      notification: {
        success : "Catégorie ajoutée avec succès"
      }
    }
  )
}

export const editCategory = (cat) => {
  return (
    {
      type: EDIT_CATEGORY,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'communication-categories',
        API_PAYLOAD: cat,
        API_SUCCESS: EDIT_CATEGORY_SUCCESS,
        API_ERRORS: EDIT_CATEGORY_ERROR
      },
      notification: {
        success : "Catégorie modifiée avec succès"
      }
    }
  )
}

export const deleteCategory = (category_id) => {
  return (
    {
      type: DELETE_CATEGORY,
      meta: {
        API_METHOD: API_METHOD.DELETE,
        API_CALL: 'communication-categories/' + category_id,
        API_SUCCESS: DELETE_CATEGORY_SUCCESS,
        API_ERRORS: DELETE_CATEGORY_ERROR
      },
      notification: {
        success : "Catégorie supprimée avec succès"
      }
    }
  )
}

export const getNotification = (params) => {
  return {
    type: GET_NOTIFICATIONS,
    meta: {
      API_CALL: 'notifications',
      API_PAYLOAD: { params },
      API_SUCCESS: GET_NOTIFICATIONS_SUCCESS,
      API_ERRORS: GET_NOTIFICATIONS_ERROR
    }
  }
}

export const getNotificationById = (id) => {
  return {
    type: GET_NOTIFICATION,
    meta: {
      API_CALL: 'notifications/'+id,
      API_SUCCESS: GET_NOTIFICATION_SUCCESS,
      API_ERRORS: GET_NOTIFICATION_ERROR
    }
  }
}

export const addNotification = (notif) => {
  return (
    {
      type: ADD_NOTIFICATION,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'notifications',
        API_PAYLOAD: notif,
        API_SUCCESS: ADD_NOTIFICATION_SUCCESS,
        API_ERRORS: ADD_NOTIFICATION_ERROR
      },
      notification: {
        success : "Notification ajoutée avec succès"
      }
    }
  )
}

export const editNotif = (notif) => {
  return (
    {
      type: EDIT_NOTIFICATION,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'notifications',
        API_PAYLOAD: notif,
        API_SUCCESS: EDIT_NOTIFICATION_SUCCESS,
        API_ERRORS: EDIT_NOTIFICATION_ERROR
      },
      notification: {
        success : "Notification modifiée avec succès"
      }
    }
  )
}

export const deleteNotification = (notif_id) => {
  return (
    {
      type: DELETE_NOTIFICATION,
      meta: {
        API_METHOD: API_METHOD.DELETE,
        API_CALL: 'notifications/' + notif_id,
        API_SUCCESS: DELETE_NOTIFICATION_SUCCESS,
        API_ERRORS: DELETE_NOTIFICATION_ERROR
      },
      notification: {
        success : "Notification supprimée avec succès"
      }
    }
  )
}



export const getArticles = (params) => {
  return {
    type: Communication.GET_COMMUNICATIONS,
    meta: {
      API_CALL: 'communications',
      API_PAYLOAD: { params },
      API_SUCCESS: Communication.GET_COMMUNICATIONS_SUCCESS,
      API_ERRORS: Communication.GET_COMMUNICATIONS_ERROR
    }
  }
}

export const getArticleById = (id) => {
  return {
    type: Communication.GET_COMMUNICATION,
    meta: {
      API_CALL: 'communications/'+id,
      API_SUCCESS: Communication.GET_COMMUNICATION_SUCCESS,
      API_ERRORS: Communication.GET_COMMUNICATION_ERROR
    }
  }
}

export const addArticle = (article) => {
  return (
    {
      type: ADD_NOTIFICATION,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'communications',
        API_PAYLOAD: article,
        FORM_DATA: true,
        API_SUCCESS: ADD_NOTIFICATION_SUCCESS,
        API_ERRORS: ADD_NOTIFICATION_ERROR
      },
      notification: {
        success : "Article ajouté avec succès"
      }
    }
  )
}

export const editArticle = (article) => {
  return (
    {
      type: EDIT_NOTIFICATION,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'communications',
        API_PAYLOAD: article,
        FORM_DATA: true,
        API_SUCCESS: EDIT_NOTIFICATION_SUCCESS,
        API_ERRORS: EDIT_NOTIFICATION_ERROR
      },
      notification: {
        success : "Article modifié avec succès"
      }
    }
  )
}

export const deleteArticle = (article_id) => {
  return (
    {
      type: DELETE_NOTIFICATION,
      meta: {
        API_METHOD: API_METHOD.DELETE,
        API_CALL: 'communications/' + article_id,
        API_SUCCESS: DELETE_NOTIFICATION_SUCCESS,
        API_ERRORS: DELETE_NOTIFICATION_ERROR
      },
      notification: {
        success : "Article supprimé avec succès"
      }
    }
  )
}

//events

export const getEvents = (params) => {
  return {
    type: Communication.GET_EVENTS,
    meta: {
      API_CALL: 'events',
      API_PAYLOAD: { params },
      API_SUCCESS: Communication.GET_EVENTS_SUCCESS,
      API_ERRORS: Communication.GET_EVENTS_ERROR
    }
  }
}

export const getEventById = (id) => {
  return {
    type: Communication.GET_EVENT,
    meta: {
      API_CALL: 'events/'+id,
      API_SUCCESS: Communication.GET_EVENT_SUCCESS,
      API_ERRORS: Communication.GET_EVENT_ERROR
    }
  }
}

export const addEvent= (event) => {
  return (
    {
      type: Communication.ADD_COMMUNICATION,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'events',
        API_PAYLOAD: event,
        FORM_DATA: true,
        API_SUCCESS: Communication.ADD_COMMUNICATION_SUCCESS,
        API_ERRORS: Communication.ADD_COMMUNICATION_ERROR
      },
      notification: {
        success : "Evenement ajouté avec succès"
      }
    }
  )
}

export const editEvent = (event) => {
  return (
    {
      type: Communication.EDIT_EVENT,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'events',
        API_PAYLOAD: event,
        FORM_DATA: true,
        API_SUCCESS: Communication.EDIT_EVENT_SUCCESS,
        API_ERRORS: Communication.EDIT_EVENT_ERROR
      },
      notification: {
        success : "Evenement modifié avec succès"
      }
    }
  )
}

export const deleteEvent= (id) => {
  return (
    {
      type: Communication.DELETE_NOTIFICATION,
      meta: {
        API_METHOD: API_METHOD.DELETE,
        API_CALL: 'events/' + id,
        API_SUCCESS: Communication.DELETE_NOTIFICATION_SUCCESS,
        API_ERRORS: Communication.DELETE_NOTIFICATION_ERROR
      },
      notification: {
        success : "Evenement supprimé avec succès"
      }
    }
  )
}

export const distruct= () => {
  return (
    {
      type: Communication.DISTRUCT,
    }
  )
}

export const publishArticle= (id) => {
  return (
    {
      type: Communication.PUBLISH_COMMUNICATION,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'communications/'+id+'/publish',
        API_SUCCESS: Communication.PUBLISH_COMMUNICATION_SUCCESS,
        API_ERRORS: Communication.PUBLISH_COMMUNICATION_ERROR
      },
      notification: {
        success : "Article publié avec succès"
      }
    }
  )
}

export const notifyArticle= (id) => {
  return (
    {
      type: Communication.NOTIFY_COMMUNICATION,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'communications/'+id+'/notify',
        API_SUCCESS: Communication.NOTIFY_COMMUNICATION_SUCCESS,
        API_ERRORS: Communication.NOTIFY_COMMUNICATION_ERROR
      },
      notification: {
        success : "Notification d'article publiée avec succès"
      }
    }
  )
}

export const publishEvent= (id) => {
  return (
    {
      type: Communication.PUBLISH_COMMUNICATION,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'events/'+id+'/publish',
        API_SUCCESS: Communication.PUBLISH_COMMUNICATION_SUCCESS,
        API_ERRORS: Communication.PUBLISH_COMMUNICATION_ERROR
      },
      notification: {
        success : "Evenement publiée avec succès"
      }
    }
  )
}

export const notifyEvent= (id) => {
  return (
    {
      type: Communication.NOTIFY_COMMUNICATION,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'events/'+id+'/notify',
        API_SUCCESS: Communication.NOTIFY_COMMUNICATION_SUCCESS,
        API_ERRORS: Communication.NOTIFY_COMMUNICATION_ERROR
      },
      notification: {
        success : "Notification d'évenement publiée avec succès"
      }
    }
  )
}
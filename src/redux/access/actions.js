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
  GET_USER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS
} from '../actions';

const API_METHOD = { POST: 'POST', GET: 'GET', PUT: 'PUT', DELETE: 'DELETE' }



export const getAdminList = (params) => ({
  type: GET_ADMIN_LIST,
  meta: {
    API_CALL: 'user',
    API_PAYLOAD: { params },
    API_SUCCESS: GET_ADMIN_LIST_SUCCESS,
    API_ERRORS: GET_ADMIN_LIST_ERROR
  }
})

export const getUserById = (id) => ({
  type: GET_USER,
  meta: {
    API_CALL: 'users/'+id,
    API_SUCCESS: GET_USER_SUCCESS,
    API_ERRORS: GET_USER_ERROR
  }
})

export const addUser = (user) => {
  return (
    {
      type: ADD_USER,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'users',
        FORM_DATA: true,
        API_PAYLOAD: user,
        API_SUCCESS: ADD_USER_SUCCESS,
        REDIRECT: '/gestion-admin',
        API_ERRORS: ADD_USER_ERROR
      },
      notification: {
        success : "Utilisateur ajouté avec succès"
      }
    }
  )
}

export const editUser = (user) => {
  return (
    {
      type: EDIT_USER,
      meta: {
        API_METHOD: API_METHOD.PUT,
        API_CALL: 'users',
        FORM_DATA: true,
        API_PAYLOAD: user,
        API_SUCCESS: EDIT_USER_SUCCESS,
        API_ERRORS: EDIT_USER_ERROR
      },
      notification: {
        success : "Utilisateur modifié avec succès"
      }
    }
  )
}

export const deleteUser = (user_id) => {
  return (
    {
      type: DELETE_USER,
      meta: {
        API_METHOD: API_METHOD.DELETE,
        API_CALL: 'users?logins='+user_id,
        API_SUCCESS: DELETE_USER_SUCCESS,
        API_ERRORS: DELETE_USER_ERROR
      },
      notification: {
        success : "Utilisateur supprimé avec succès"
      }
    }
  )
  }
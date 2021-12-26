import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from '../actions';

const API_METHOD = {POST: 'POST', GET: 'GET', PUT: 'PUT', DELETE: 'DELETE'}

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  meta:{
    API_METHOD: API_METHOD.POST,
    API_CALL: 'api/authenticate',
    API_PAYLOAD: { ...user, "rememberMe": true },
    API_SUCCESS: LOGIN_USER_SUCCESS,
    API_ERRORS: LOGIN_USER_ERROR
  }
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});
export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: message
});

export const forgotPassword = (payload) => {
  
  return (
    {
      type: FORGOT_PASSWORD,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'account/reset-password/init',
        API_PAYLOAD: payload,
        API_SUCCESS: FORGOT_PASSWORD_SUCCESS,
        API_ERRORS: FORGOT_PASSWORD_ERROR
      }
    }
  )
};

export const resetPassword = (payload) => {
  
  return (
    {
      type: RESET_PASSWORD,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'account/reset-password/finish',
        API_PAYLOAD: payload,
        API_SUCCESS: RESET_PASSWORD_SUCCESS,
        API_ERRORS: RESET_PASSWORD_ERROR
      }
    }
  )
};
export const changePassword = (payload) => {
  
  return (
    {
      type: RESET_PASSWORD,
      meta: {
        API_METHOD: API_METHOD.POST,
        API_CALL: 'account/change-password',
        API_PAYLOAD: payload,
        API_SUCCESS: RESET_PASSWORD_SUCCESS,
        API_ERRORS: RESET_PASSWORD_ERROR
      }
    }
  )
};
export const forgotPasswordSuccess = (forgotUserMail) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: forgotUserMail
});
export const forgotPasswordError = (message) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: { message }
});

export const resetPasswordSuccess = (newPassword) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: newPassword
});
export const resetPasswordError = (message) => ({
  type: RESET_PASSWORD_ERROR,
  payload: { message }
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history }
})
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user
})
export const registerUserError = (message) => ({
  type: REGISTER_USER_ERROR,
  payload: { message }
})

export const logoutUser = () => ({
  type: LOGOUT_USER
});
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
function call(meta, headers) {
  const method = meta.API_METHOD ? meta.API_METHOD : 'GET';
  switch (method) {
    case 'GET':
      return axios.get('http://localhost:8080/' + meta.API_CALL, meta.API_PAYLOAD)
    case 'POST':
      return axios.post('http://localhost:8080/' + meta.API_CALL, meta.API_PAYLOAD, headers)
    case 'PUT':
      return axios.put('http://localhost:8080/' + meta.API_CALL, meta.API_PAYLOAD, headers)
    case 'DELETE':
      return axios.delete('http://localhost:8080/' + meta.API_CALL)
  }
}

export default store => next => action => {
  const state = store.getState();
  const token = state.authUser.user && state.authUser.user['id_token'] ? 'Bearer ' +
    state.authUser.user['id_token'] : 'eyJhbGciOiJIUzUxMiJ9';
  // axios.defaults.headers.common['Authorization'] = token;
  if (action.meta && action.meta.API_CALL) {
    let headers = {}
    if (action.meta.FORM_DATA) {
      headers = { "Content-Type": "multipart/form-data" }
    }
    call(action.meta, headers)
      .then((res) => {
        store.dispatch({
          type: action.meta.API_SUCCESS,
          result: res,
        });
        if (action.notification) {
          store.dispatch({
            type: 'NOTIFICATION_SUCCESS',
            message: action.notification.success,
            uuid: uuidv4()
          });
        }
      })
      .catch((error) => {
        if (action.meta.API_ERRORS) {
          if (error.response && error.response.status === 401) {
            store.dispatch({
              type: 'LOGOUT_USER',
            });
          }
          store.dispatch({
            type: action.meta.API_ERRORS,
            result: error.response,
          });
          if (action.notification) {
            store.dispatch({
              type: 'NOTIFICATION_ERROR',
              message: error.response.data.message,
              uuid: uuidv4()
            });
          }
        }
        throw error;
      });
  }
  return next(action);
};
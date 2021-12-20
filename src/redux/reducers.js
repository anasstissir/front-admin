import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import access from './access/reducer'
import route from './routeReducer'
import communication from './communication/reducer'
import faq from './faq/reducer'
import sondage from './sondage/reducer'
import notification from './notification/reducer'
import kpi from './kpi/reducer'

const reducers = combineReducers({
  access,
  menu,
  settings,
  authUser,
  route,
  communication,
  faq,
  sondage,
  notification,
  kpi
});

export default reducers;
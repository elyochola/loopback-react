import { combineReducers } from 'redux'

import alerts from './alerts';
import auth from './authentication';
import profil from './profil';



export const rootReducer = combineReducers({
  alerts,
  auth,
  profil
})




import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, STATE_CONNECTED, STATE_NOT_CONNECTED } from '../actions/authentication'




export default function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case STATE_CONNECTED:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true
      })
    case STATE_NOT_CONNECTED:
     return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      }) 
    default:
      return state
    }
}



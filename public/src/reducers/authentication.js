import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/index'


function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
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
    default:
      return state
    }
}

export function loginUser(creds) {
  
  // let config = {
  //   method: 'POST',
  //   headers: { 'Content-Type':'application/x-www-form-urlencoded' },
  //   body: `username=${creds.username}&password=${creds.password}`
  // }
  
  // return dispatch => {
  //   // We dispatch requestLogin to kickoff the call to the API
  //   dispatch(requestLogin(creds))
  //   return fetch('http://localhost:3001/sessions/create', config)
  //     .then(response =>
  //       response.json()
  //       .then(user => ({ user, response }))
  //     ).then(({ user, response }) =>  {
  //       if (!response.ok) {
  //         // If there was a problem, we want to
  //         // dispatch the error condition
  //         dispatch(loginError(user.message))
  //         return Promise.reject(user)
  //       }
  //       else {
  //         // If login was successful, set the token in local storage
  //         localStorage.setItem('id_token', user.id_token)
          
  //         // Dispatch the success action
  //         dispatch(receiveLogin(user))
  //       }
  //     }).catch(err => console.log("Error: ", err))
  // }
  console.log('coucou');
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}
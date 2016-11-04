import { CALL_API } from '../middlewares/api'

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function requestSignUp(creds) {
  return {
    type: SIGN_UP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}


function receiveLogin(user) {
  console.log(user)
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.id
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const LOGOUT_REQUEST  = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS  = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE  = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  
  return dispatch => {
    dispatch(requestLogin(creds))

    return fetch('http://localhost:3000/api/appUsers/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'string@gogo.com',
          password: 'password',
        }),
      })
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {

          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', user.id)
        
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}



export function signUpUser(creds) {
  
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.username}&password=${creds.password}`
  }
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSignUp(creds))
    return fetch('http://localhost:3000/api/appUsers', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          // If login was successful, set the token in local storage
          console.log(user)
          localStorage.setItem('token', user.user.id)
          localStorage.setItem('userId', user.user.userId)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}

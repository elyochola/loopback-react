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
    token: user.user.id,
    userId: user.user.userId,
    user
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
          email: creds.email,
          password: creds.password,
        }),
      })
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        console.log("user")
        console.log(user)
        console.log("response")
        console.log(response)
        if (!response.ok) {
          dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          // TODO debug token and userId value
          localStorage.clear()
          localStorage.setItem('token', user.id)
          localStorage.setItem('userId', user.userId)
          

          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}



export function signUpUser(creds) {
  
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}&lastName=${creds.lastName}&firstName=${creds.firstName}`
  }
  
  return dispatch => {
    dispatch(requestSignUp(creds))
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
          localStorage.clear()
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

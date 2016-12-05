import { CALL_API } from '../middlewares/api'
import { BASE_URL } from './index'


export const PROFIL_SUCCESS = 'PROFIL_SUCCESS'
export const PROFIL_FAILURE = 'PROFIL_FAILURE'

function receiveUser(creds) {
  return {
    type: PROFIL_SUCCESS,
    user: creds
  }
}



export function getProfil(token, userId) {
  return dispatch => {
    return fetch('http://'+ BASE_URL + '/api/appUsers/' + userId, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token,
        }
       
      })
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          return Promise.reject(user)
        }
        else {
          dispatch(receiveUser(user))
        
        }
      }).catch(err => console.log("Error: ", err))
  }
}

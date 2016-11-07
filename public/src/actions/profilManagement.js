import { CALL_API } from '../middlewares/api'



export const PROFIL_SUCCESS = 'PROFIL_SUCCESS'

function receiveUser(creds) {
  return {
    type: PROFIL_SUCCESS,
    user: creds
  }
}



export function getProfil(token, userId) {
  return dispatch => {
    return fetch('http://localhost:3000/api/appUsers/' + userId, {
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

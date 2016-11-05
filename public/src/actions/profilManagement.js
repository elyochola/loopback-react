import { CALL_API } from '../middlewares/api'


export const PROFIL_REQUEST = 'PROFIL_REQUEST'


export function getProfil(token, userId) {
  console.log('getProfil')
  
  return dispatch => {

    return fetch('http://localhost:3000/api/appUsers/' + userId, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token,
        }
       
      })
      .then(function(response) {
		  console.log(response.json());
	  }).catch(err => console.log("Error: ", err))
  }
}

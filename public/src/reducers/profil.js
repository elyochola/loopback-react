import { PROFIL_SUCCESS } from '../actions/index'



export default function profil(state = {
    user: "",
  }, action) {
  console.log(action.type)
  switch (action.type) {
    case PROFIL_SUCCESS:
      return Object.assign({}, state, {
        user: action.user
      })
    default:
      return state
    }
}



import { PROFIL_SUCCESS, PROFIL_FAILURE} from '../actions/index'



export default function profil(state = {
    user: "",
  }, action) {
  switch (action.type) {
    case 'PROFIL_SUCCESS':
      return Object.assign({}, state, {
        user: action.user
      })
    default:
      return state
    }
}



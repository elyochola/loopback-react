

export const ADD_ALERT = 'ADD_ALERT'
export const DELETE_ALERT = 'DELETE_ALERT'
export const EDIT_ALERT = 'EDIT_ALERT'


const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default function alerts(state = initialState, action) {
  switch (action.type) {
    case ADD_ALERT:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        },
        ...state
      ]

    case DELETE_ALERT:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_ALERT:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    default:
      return state
  }
}
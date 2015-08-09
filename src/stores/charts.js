
import {TEST} from './actionTypes'

export default function charts(state = [], action) {
  switch (action.type) {
  case TEST:
    return [...state, {
      text: action.text,
      completed: false,
    }]
  default:
    return state
  }
}

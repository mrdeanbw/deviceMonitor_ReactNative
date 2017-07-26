import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  resetting: false,
  error: null
})

const attempt = (state, action) => state.merge({ resetting: true })

const success = (state, action) =>
  state.merge({
    resetting: false,
    error: null,
  })

const failure = (state, action) =>
  state.merge({
    resetting: false,
    error: action.error
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.RESET_PASSWORD]: attempt,
  [Types.RESET_PASSWORD_SUCCESS]: success,
  [Types.RESET_PASSWORD_FAILURE]: failure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)


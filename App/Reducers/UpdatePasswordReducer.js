import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  updating: false,
  error: null
})

const attempt = (state, action) => state.merge({ updating: true })

const success = (state, action) =>
  state.merge({
    updating: false,
    error: null,
  })

const failure = (state, action) =>
  state.merge({
    updating: false,
    error: action.error
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.UPDATE_PASSWORD]: attempt,
  [Types.UPDATE_PASSWORD_SUCCESS]: success,
  [Types.UPDATE_PASSWORD_FAILURE]: failure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)



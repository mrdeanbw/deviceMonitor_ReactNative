import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  deleting: false,
  error: null
})

const attempt = (state, action) => state.merge({ deleting: true })

const success = (state, action) =>
  state.merge({
    deleting: false,
    error: null,
  })

const failure = (state, action) =>
  state.merge({
    deleting: false,
    error: action.error
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.DEVICE_DELETE]: attempt,
  [Types.DEVICE_DELETE_SUCCESS]: success,
  [Types.DEVICE_DELETE_FAILURE]: failure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)




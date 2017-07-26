import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  creating: false,
  error: null
})

const attempt = (state, action) => state.merge({ creating: true })

const success = (state, action) =>
  state.merge({
    creating: false,
    error: null,
  })

const failure = (state, action) =>
  state.merge({
    creating: false,
    error: action.error
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.CREATE_INSTALLATION]: attempt,
  [Types.CREATE_INSTALLATION_SUCCESS]: success,
  [Types.CREATE_INSTALLATION_FAILURE]: failure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)



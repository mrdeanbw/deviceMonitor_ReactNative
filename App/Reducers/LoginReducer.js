import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  attempting: false,
  error: null,
  token: null
})

// login attempts
const attempt = (state, action) => state.merge({ attempting: true })

// successful logins
const success = (state, action) =>
  state.merge({
    attempting: false,
    error: null,
  })

// login failure
const failure = (state, action) =>
  state.merge({
    attempting: false,
    error: action.error
  })

// logout
const logout = (state, action) => state.merge({ attempting: false, error: null })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.LOGIN_ATTEMPT]: attempt,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)

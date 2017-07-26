import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  email: null,
  error: null,
  name: null,
  phoneNumber: null,
  sessionToken: null,
  updating: false,
  userId: null,
  username: null,
  volumeAlertShown: false,
})

// successful logins
const login = (state, action) => {
  const { email, name, objectId, phoneNumber, sessionToken, username, userChannel } = action.user
  return state.merge({ email, name, phoneNumber, sessionToken, userId: objectId, username, userChannel })
}

const logout = (state, action) => (INITIAL_STATE)

const updateSessionToken = (state, action) => {
  return state.merge({ sessionToken: action.newSessionToken })
}

const startUpdating = (state, action) =>
  state.merge({ updating: true })

const updateProfileSuccess = (state, action) =>
  state.merge({ updating: false, error: null, ...action.updates })

const updateProfileFailure = (state, action) =>
  state.merge({ updating: false, error: action.error })

const updateVolumeAlertShown = (state, action) =>
  state.merge({ volumeAlertShown: true })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.USER_CREATE_SUCCESS]: login,
  [Types.LOGIN_SUCCESS]: login,
  [Types.LOGOUT]: logout,
  [Types.UPDATE_PROFILE]: startUpdating,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,
  [Types.DEVICE_CREATE]: updateVolumeAlertShown,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)


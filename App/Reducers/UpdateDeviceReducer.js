import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  error: null,
  updatingDevice: false,
})

const handleUpdateDeviceStart = (state, action) =>
  state.merge({
    updatingDevice: true,
    error: null
  })

const handleUpdateDeviceFailure = (state, action) =>
  state.merge({
    updatingDevice: false,
    error: action.error
  })

const handleUpdateDeviceSuccess = (state, action) =>
  state.merge({
    updatingDevice: false,
    error: null,
  })

const ACTION_HANDLERS = {
  [Types.DEVICE_UPDATE]: handleUpdateDeviceStart,
  [Types.DEVICE_UPDATE_SUCCESS]: handleUpdateDeviceSuccess,
  [Types.DEVICE_UPDATE_FAILURE]: handleUpdateDeviceFailure,
  [Types.SNOOZE_DEVICE]: handleUpdateDeviceStart,
  [Types.SNOOZE_DEVICE_SUCCESS]: handleUpdateDeviceSuccess,
  [Types.SNOOZE_DEVICE_FAILURE]: handleUpdateDeviceFailure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)


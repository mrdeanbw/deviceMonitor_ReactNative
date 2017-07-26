import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  error: null,
  events: [],
  loading: false,
})

const handleFetchActivityStart = (state, action) =>
  state.merge({
    error: null,
    events: [],
    loading: true,
  })

const handleFetchActivityFailure = (state, action) =>
  state.merge({
    loading: false,
    error: action.error
  })

const handleFetchActivitySuccess = (state, action) =>
  state.merge({
    error: null,
    events: action.events,
    loading: false,
  })

const handleResetActivity = (state, action) => INITIAL_STATE

const ACTION_HANDLERS = {
  [Types.FETCH_DEVICE_ACTIVITY]: handleFetchActivityStart,
  [Types.FETCH_DEVICE_ACTIVITY_SUCCESS]: handleFetchActivitySuccess,
  [Types.FETCH_DEVICE_ACTIVITY_FAILURE]: handleFetchActivityFailure,
  [Types.RESET_DEVICE_ACTIVITY]: handleResetActivity,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)



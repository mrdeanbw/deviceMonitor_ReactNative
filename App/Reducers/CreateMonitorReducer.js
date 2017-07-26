import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  error: null,
  creating: false,
  createdMonitorId: null,
})

const attempt = (state, action) => state.merge({ creating: true, createdMonitorId: null })

const failure = (state, action) =>
  state.merge({
    creating: false,
    error: action.error
  })

const success = (state, action) =>
  state.merge({
    creating: false,
    error: null,
    createdMonitorId: action.monitorId
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.CREATE_MONITOR]: attempt,
  [Types.CREATE_MONITOR_SUCCESS]: success,
  [Types.CREATE_MONITOR_FAILURE]: failure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)

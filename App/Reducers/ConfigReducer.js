import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  deviceLate: null,
  deviceVeryLate: null,
  leakDetectorAvailable: true,
  provisioningVersionNo: 5,
  recentUpdate: null,
  setupIncompleteTimeout: null,
})

const updateConfig = (state, action) => {
  return state.merge(action.config)
}

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.FETCH_CONFIG_SUCCESS]: updateConfig,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)



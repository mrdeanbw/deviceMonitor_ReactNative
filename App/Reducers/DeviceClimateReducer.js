import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  error: null,
  data: {
    day: [],
    week: [],
  },
  loading: false,
})

const handleFetchClimateStart = (state, action) =>
  state.merge({
    error: null,
    data: {
      [action.period]: []
    },
    loading: true,
  })

const handleFetchClimateFailure = (state, action) =>
  state.merge({
    loading: false,
    data: {
      [action.period]: []
    },
    error: action.error
  })

const handleFetchClimateSuccess = (state, action) =>
  state.merge({
    error: null,
    data: {
      [action.period]: action.data
    },
    loading: false,
  })

const handleResetClimate = (state, action) => INITIAL_STATE

const ACTION_HANDLERS = {
  [Types.FETCH_DEVICE_CLIMATE]: handleFetchClimateStart,
  [Types.FETCH_DEVICE_CLIMATE_SUCCESS]: handleFetchClimateSuccess,
  [Types.FETCH_DEVICE_CLIMATE_FAILURE]: handleFetchClimateFailure,
  [Types.RESET_DEVICE_CLIMATE]: handleResetClimate,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)




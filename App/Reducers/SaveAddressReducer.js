import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  error: null,
  saving: false,
  createdAddressId: null,
})

const attempt = (state, action) => state.merge({ saving: true, createdAddressId: null })

const success = (state, action) =>
  state.merge({
    saving: false,
    error: null,
  })

const failure = (state, action) =>
  state.merge({
    saving: false,
    error: action.error
  })

const createSuccess = (state, action) =>
  state.merge({
    saving: false,
    error: null,
    createdAddressId: action.addressId,
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.SAVE_ADDRESS]: attempt,
  [Types.SAVE_ADDRESS_SUCCESS]: success,
  [Types.SAVE_ADDRESS_FAILURE]: failure,
  [Types.CREATE_ADDRESS]: attempt,
  [Types.CREATE_ADDRESS_SUCCESS]: createSuccess,
  [Types.CREATE_ADDRESS_FAILURE]: failure,
  [Types.DELETE_ADDRESS]: attempt,
  [Types.DELETE_ADDRESS_SUCCESS]: success,
  [Types.DELETE_ADDRESS_FAILURE]: failure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)

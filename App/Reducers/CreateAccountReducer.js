import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  phoneNumber: null,
  phoneNumberId: null,
  accessCode: null,
  creatingPhoneNumber: false,
  creatingUser: false,
  updating: false,
  creationPhoneNumberError: null,
  creationUserError: null,
  updatingError: null
})

const setPhoneNumber = (state, action) =>
  state.merge({
    phoneNumber: action.phoneNumber
  })

const handleCreatePhoneNumberStart = (state, action) =>
  state.merge({
    creatingPhoneNumber: true,
    creationPhoneNumberError: null
  })

const handleCreatePhoneNumberFailure = (state, action) =>
  state.merge({
    creatingPhoneNumber: false,
    creationPhoneNumberError: action.error
  })

const handleCreatePhoneNumberSuccess = (state, action) =>
  state.merge({
    creatingPhoneNumber: false,
    creationPhoneNumberError: null,
    accessCode: action.accessCode,
    phoneNumberId: action.phoneNumberId
  })

const handleUpdateStart = (state, action) =>
  state.merge({
    updating: true,
    updatingError: null
  })

const handleUpdateFailure = (state, action) =>
  state.merge({
    updating: false,
    updatingError: action.error
  })

const handleUpdateSuccess = (state, action) =>
  state.merge({
    updating: false,
    updatingError: null
  })

const handleCreateUserStart = (state, action) =>
  state.merge({
    creatingUser: true,
    creationUserError: null
  })

const handleCreateUserFailure = (state, action) =>
  state.merge({
    creatingUser: false,
    creationUserError: action.error
  })

const handleCreateUserSuccess = (state, action) =>
  state.merge({
    creatingUser: false,
    creationUserError: null,
    accessCode: action.accessCode,
    phoneNumberId: action.phoneNumberId
  })


const ACTION_HANDLERS = {
  [Types.PHONE_NUMBER_CREATE]: setPhoneNumber,
  [Types.PHONE_NUMBER_CREATE_STARTED]: handleCreatePhoneNumberStart,
  [Types.PHONE_NUMBER_CREATE_FAILURE]: handleCreatePhoneNumberFailure,
  [Types.PHONE_NUMBER_CREATE_SUCCESS]: handleCreatePhoneNumberSuccess,
  [Types.PHONE_NUMBER_UPDATING]: handleUpdateStart,
  [Types.PHONE_NUMBER_UPDATE_FAILURE]: handleUpdateFailure,
  [Types.PHONE_NUMBER_UPDATE_SUCCESS]: handleUpdateSuccess,
  [Types.USER_CREATE_STARTED]: handleCreateUserStart,
  [Types.USER_CREATE_FAILURE]: handleCreateUserFailure,
  [Types.USER_CREATE_SUCCESS]: handleCreateUserSuccess
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)

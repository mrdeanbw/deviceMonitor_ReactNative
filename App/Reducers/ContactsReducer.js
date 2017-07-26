import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  error: null,
  loading: false,
  contactsAccess: false,
  contacts: []
})

const loadAttempt = (state, action) => state.merge({ loading: true })

const loadFailure = (state, action) =>
  state.merge({
    loading: false,
    error: action.error
  })

const loadSuccess = (state, action) =>
  state.merge({
    loading: false,
    error: null,
    contactsAccess: action.contactsAccess,
    contacts: action.contacts
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.LOAD_CONTACTS]: loadAttempt,
  [Types.LOAD_CONTACTS_SUCCESS]: loadSuccess,
  [Types.LOAD_CONTACTS_FAILURE]: loadFailure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)

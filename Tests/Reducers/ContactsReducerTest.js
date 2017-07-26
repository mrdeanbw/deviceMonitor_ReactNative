import test from 'ava'
import Immutable from 'seamless-immutable'
import reducer, { INITIAL_STATE } from '../../App/Reducers/ContactsReducer'
import Actions from '../../App/Actions/Creators'

const stateAfterLoadStart = Immutable({
  loading: true,
  error: null,
  contactsAccess: false,
  contacts: []
})

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, {
    error: null,
    loading: false,
    contactsAccess: false,
    contacts: []
  })
})

test('load contacts attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.loadContacts())
  t.true(state.loading)
  t.falsy(state.error)
})

test('load contacts success', t => {
  const contacts = require('../../App/Fixtures/contacts.json')
  const contactsAccess = true
  const state = reducer(stateAfterLoadStart, Actions.loadContactsSuccess(contactsAccess, contacts))

  t.deepEqual(state, {
    error: null,
    loading: false,
    contactsAccess: contactsAccess,
    contacts: contacts
  })
})

test('load contacts failure', t => {
  const error = 'oh noooo'
  const state = reducer(stateAfterLoadStart, Actions.loadContactsFailure(error))
  t.false(state.loading)
  t.is(state.error, error)
})

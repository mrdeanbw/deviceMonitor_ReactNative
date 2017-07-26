import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/CreateAccountReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  t.deepEqual(reducer(undefined, null), {
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
})

test('update access code', t => {
  const accessCode = 'foo'
  const phoneNumberId = 'bar'
  const state = reducer(
    INITIAL_STATE, Actions.phoneNumberCreateSuccess(accessCode, phoneNumberId))
  t.is(state.accessCode, accessCode)
  t.is(state.phoneNumberId, phoneNumberId)
})

test('set loading', t => {
  const state = reducer(INITIAL_STATE, Actions.updatingPhoneNumber())
  t.is(state.updating, true)
  const nextState = reducer(state, Actions.phoneNumberUpdateSuccess())
  t.is(nextState.updating, false)
})

import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/CreateInstallationReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, { creating: false, error: null })
})

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.createInstallation('ios', 'deviceId12345'))

  t.true(state.creating)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.createInstallationSuccess())

  t.falsy(state.creating)
  t.is(state.error, null)
})

test('failure', t => {
  const error = 'Somethin went wrong'
  const state = reducer(INITIAL_STATE, Actions.createInstallationFailure(error))

  t.falsy(state.creating)
  t.is(state.error, error)
})


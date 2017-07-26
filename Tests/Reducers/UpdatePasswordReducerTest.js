import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/UpdatePasswordReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, { updating: false, error: null })
})

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.updatePassword('password'))

  t.true(state.updating)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.updatePasswordSuccess())

  t.falsy(state.updating)
  t.is(state.error, null)
})

test('failure', t => {
  const error = 'Ya dun goofed'
  const state = reducer(INITIAL_STATE, Actions.updatePasswordFailure(error))

  t.falsy(state.updating)
  t.is(state.error, error)
})


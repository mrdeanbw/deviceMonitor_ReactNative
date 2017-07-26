import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/ResetPasswordReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, { resetting: false, error: null })
})

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.resetPassword('5551234', '1'))

  t.true(state.resetting)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.resetPasswordSuccess())

  t.falsy(state.resetting)
  t.is(state.error, null)
})

test('failure', t => {
  const error = 'Ya dun goofed'
  const state = reducer(INITIAL_STATE, Actions.resetPasswordFailure(error))

  t.falsy(state.resetting)
  t.is(state.error, error)
})

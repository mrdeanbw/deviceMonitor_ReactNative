import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/LoginReducer'
import Actions from '../../App/Actions/Creators'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.attemptLogin('u', 'p'))

  t.true(state.attempting)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.loginSuccess('hi'))

  t.false(state.attempting)
  t.falsy(state.error)
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.loginFailure('nope'))

  t.false(state.attempting)
  t.is(state.error, 'nope')
})

test('logout', t => {
  const loginState = reducer(INITIAL_STATE, Actions.loginSuccess('hi'))
  const state = reducer(loginState, Actions.logout())

  t.false(state.attempting)
  t.falsy(state.error)
})

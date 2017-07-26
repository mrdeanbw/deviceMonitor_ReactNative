import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/CreateMonitorReducer'
import Actions from '../../App/Actions/Creators'

const monitorId = 'bubba'

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, { creating: false, error: null, createdMonitorId: null })
})

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.createMonitor())
  t.true(state.creating)
  t.is(state.error, null)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.createMonitorSuccess(monitorId))
  t.falsy(state.creating)
  t.is(state.error, null)
  t.deepEqual(state.createdMonitorId, monitorId)
})

test('failure', t => {
  const error = 'Ya burned the burgers :/'
  const state = reducer(INITIAL_STATE, Actions.createMonitorFailure(error))
  t.falsy(state.creating)
  t.deepEqual(state.error, error)
})

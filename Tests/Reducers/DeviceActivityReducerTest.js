import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/DeviceActivityReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  t.deepEqual(reducer(undefined, null), {
    error: null,
    events: [],
    loading: false,
  })
})

test('fetch start', t => {
  const state = reducer(
    INITIAL_STATE, Actions.fetchDeviceActivity('1'))
  t.true(state.loading)
  t.is(state.error, null)
})

test('fetch failure', t => {
  const error = 'ya dun goofed'
  const state = reducer(
    INITIAL_STATE, Actions.fetchDeviceActivityFailure(error))
  t.deepEqual(state.error, error)
  t.false(state.loading)
  t.deepEqual(state.events, [])
})

test('fetch success', t => {
  const events = [{ event: 'Good things happened' }]
  const state = reducer(
    INITIAL_STATE, Actions.fetchDeviceActivitySuccess(events))
  t.false(state.loading)
  t.is(state.error, null)
  t.deepEqual(state.events, events)
})

test('reset', t => {
  const initialState = { events: [{ name: 'an event' }], loading: false }
  const state = reducer(initialState, Actions.resetDeviceActivity())
  t.deepEqual(state, INITIAL_STATE)
})

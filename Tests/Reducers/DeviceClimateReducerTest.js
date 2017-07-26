import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/DeviceClimateReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  t.deepEqual(reducer(undefined, null), {
    error: null,
    data: {
      day: [],
      week: []
    },
    loading: false,
  })
})

test('fetch start', t => {
  const state = reducer(
    INITIAL_STATE, Actions.fetchDeviceClimate('1', true))
  t.true(state.loading)
  t.is(state.error, null)
})

test('fetch day failure', t => {
  const error = 'ya dun goofed'
  const state = reducer(
    INITIAL_STATE, Actions.fetchDeviceClimateFailure(error, 'day'))
  t.deepEqual(state.error, error)
  t.false(state.loading)
  t.deepEqual(state.data.day, [])
})

test('fetch day success', t => {
  const events = [{ event: 'Good things happened' }]
  const state = reducer(
    INITIAL_STATE, Actions.fetchDeviceClimateSuccess(events, 'day'))
  t.false(state.loading)
  t.is(state.error, null)
  t.deepEqual(state.data.day, events)
})

test('reset', t => {
  const initialState = { data: { day: [{ name: 'an event' }] }, loading: false }
  const state = reducer(initialState, Actions.resetDeviceClimate())
  t.deepEqual(state, INITIAL_STATE)
})


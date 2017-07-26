import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/UpdateDeviceReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  t.deepEqual(reducer(undefined, null), {
    error: null,
    updatingDevice: false,
  })
})

test('update device start', t => {
  const state = reducer(
    INITIAL_STATE, Actions.updateDevice('1', { }))
  t.true(state.updatingDevice)
  t.is(state.error, null)
})

test('update device failure', t => {
  const error = 'ahem :/'
  const state = reducer(
    INITIAL_STATE, Actions.updateDeviceFailure(error))
  t.deepEqual(state.error, error)
  t.false(state.updatingDevice)
})

test('update device success', t => {
  const device = { check: 123 }
  const state = reducer(
    INITIAL_STATE, Actions.updateDeviceSuccess(device))
  t.false(state.updatingDevice)
  t.is(state.error, null)
})


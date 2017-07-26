import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/DeleteDeviceReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, { deleting: false, error: null })
})

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.deleteDevice('foo'))

  t.true(state.deleting)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.deleteDeviceSuccess('foo'))

  t.falsy(state.deleting)
  t.is(state.error, null)
})

test('failure', t => {
  const error = 'Ya dun goofed'
  const state = reducer(INITIAL_STATE, Actions.deleteDeviceFailure(error))

  t.falsy(state.deleting)
  t.is(state.error, error)
})



import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/ConfigReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, {
    deviceLate: null,
    deviceVeryLate: null,
    leakDetectorAvailable: true,
    provisioningVersionNo: 5,
    recentUpdate: null,
    setupIncompleteTimeout: null,
  })
})

test('update config', t => {
  const mock = {
    deviceLate: 60,
    deviceVeryLate: 120,
    leakDetectorAvailable: false,
    provisioningVersionNo: 5,
    recentUpdate: 1800,
    setupIncompleteTimeout: 180
  }
  const state = reducer(INITIAL_STATE, Actions.fetchConfigSuccess(mock))

  t.deepEqual(state, mock)
})

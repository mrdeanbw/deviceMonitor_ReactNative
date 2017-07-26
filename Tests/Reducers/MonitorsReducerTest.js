import test from 'ava'
import Immutable from 'seamless-immutable'
import reducer, { INITIAL_STATE } from '../../App/Reducers/MonitorsReducer'
import Actions from '../../App/Actions/Creators'

const stateAfterRequestStart = Immutable({
  deleting: false,
  fetching: true,
  error: null,
  invitations: [],
  monitors: {},
  updating: false
})

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, {
    deleting: false,
    fetching: false,
    error: null,
    invitations: [],
    monitors: {},
    updating: false
  })
})

test('fetch monitor start', t => {
  const state = reducer(INITIAL_STATE, Actions.fetchMonitors())

  t.true(state.fetching)
  t.falsy(state.error)
})

test('fetch monitors success', t => {
  const monitors = [
    { objectId: 'foo', address: 'address1' },
    { objectId: 'bar', address: 'address2' },
    { objectId: 'baz', address: 'address1' },
  ]
  const invitations = [
    { objectId: 'tree', address: 'address4' }
  ]

  const state = reducer(stateAfterRequestStart, Actions.fetchMonitorsSuccess(monitors, invitations))
  t.falsy(state.fetching)
  t.falsy(state.error)
  t.deepEqual(state.monitors, {
    address1: [
      { objectId: 'foo', address: 'address1' },
      { objectId: 'baz', address: 'address1' },
    ],
    address2: [
      { objectId: 'bar', address: 'address2' },
    ],
  })
  t.deepEqual(state.invitations, invitations)
})

test('fetch monitors failure', t => {
  const error = "You didn't say the magic word"
  const state = reducer(stateAfterRequestStart, Actions.fetchMonitorsFailure(error))
  t.falsy(state.fetching)
  t.is(state.error, error)
})

const monitorId = 'foo'
test('delete monitor start', t => {
  const state = reducer(INITIAL_STATE, Actions.deleteMonitor(monitorId))

  t.true(state.deleting)
  t.falsy(state.error)
})

test('delete monitor success', t => {
  const monitors = {
    address1: [
      { objectId: 'foo', address: 'address1' },
      { objectId: 'baz', address: 'address1' },
    ],
    address2: [
      { objectId: 'bar', address: 'address2' },
    ]
  }
  const initialState = Immutable({
    ...stateAfterRequestStart,
    deleting: true,
    monitors
  })

  const state = reducer(initialState, Actions.deleteMonitorSuccess(monitorId))
  t.falsy(state.deleting)
  t.falsy(state.error)
  t.deepEqual(state.monitors, {
    address1: [
      { objectId: 'baz', address: 'address1' },
    ],
    address2: [
      { objectId: 'bar', address: 'address2' },
    ],
  })
})

test('delete monitor failure', t => {
  const initialState = Immutable({
    deleting: true,
    error: null
  })
  const error = "You didn't say the magic word"
  const state = reducer(initialState, Actions.deleteMonitorFailure(error))
  t.falsy(state.deleting)
  t.is(state.error, error)
})

const invitationId = 'foo'

test('update attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.acceptInvitation(invitationId))
  t.true(state.updating)
  t.falsy(state.error)
})

test('update invitation success', t => {
  const invitations = [
    { objectId: invitationId, status: 'invite' },
    { objectId: 'other', status: 'invite' }
  ]
  const initialState = Immutable({
    ...INITIAL_STATE,
    invitations
  })
  const state = reducer(initialState, Actions.updateInvitationSuccess(invitationId))
  t.false(state.updating)
  t.falsy(state.error)
  t.deepEqual(state.invitations, [
    { objectId: 'other', status: 'invite' }
  ])
})

test('update invitation fails', t => {
  const error = 'Not so fast'
  const state = reducer(INITIAL_STATE, Actions.updateInvitationFailure(error))
  t.false(state.updating)
  t.is(state.error, error)
})

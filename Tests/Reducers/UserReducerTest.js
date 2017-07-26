import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/UserReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  t.deepEqual(reducer(undefined, null), {
    email: null,
    error: null,
    name: null,
    phoneNumber: null,
    sessionToken: null,
    updating: false,
    userId: null,
    username: null,
    volumeAlertShown: false,
  })
})

test('login sets user data', t => {
  const user = {
    email: 'randy@butternubs.com',
    name: 'Randy Butternubs',
    phoneNumber: '+15551234',
    sessionToken: 'token',
    objectId: 'beef',
    userChannel: 'rbeef',
    username: 'randy'
  }
  const state = reducer(
    INITIAL_STATE, Actions.loginSuccess(user))
  t.deepEqual(state, {
    email: user.email,
    error: null,
    name: user.name,
    phoneNumber: user.phoneNumber,
    sessionToken: user.sessionToken,
    updating: false,
    userId: user.objectId,
    userChannel: user.userChannel,
    username: user.username,
    volumeAlertShown: INITIAL_STATE.volumeAlertShown,
  })
})

test('logout clears user data', t => {
  const state = reducer(
    { name: 'Randy Butternubs', username: 'randy' },
    Actions.logout()
  )
  t.deepEqual(state, INITIAL_STATE)
})

test('start update sets updating', t => {
  const state = reducer(INITIAL_STATE, Actions.updateProfile({}))
  t.true(state.updating)
})

test('update success sets updating and error', t => {
  const state = reducer(INITIAL_STATE, Actions.updateProfileSuccess({}))
  t.false(state.updating)
  t.falsy(state.error)
})

test('update failure sets error', t => {
  const error = 'nah'
  const state = reducer(INITIAL_STATE, Actions.updateProfileFailure(error))
  t.is(state.error, error)
  t.false(state.updating)
})

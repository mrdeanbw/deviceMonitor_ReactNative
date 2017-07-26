import { take, put, select } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import R from 'ramda'

// process STARTUP actions
export function * watchStartup () {
  yield take(Types.STARTUP)
  yield put(Actions.fetchConfig())
  const requestPermissions = false
  yield put(Actions.loadContacts(requestPermissions))
}

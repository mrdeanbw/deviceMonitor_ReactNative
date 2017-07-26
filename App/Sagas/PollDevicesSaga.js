import { put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import Actions from '../Actions/Creators'
import R from 'ramda'

export function * pollDevices () {
  while (true) {
    const interval = 10000 // 10 seconds
    yield delay(interval)
    const { sessionToken } = yield select(state => state.user)
    if (sessionToken) {
      const background = true
      yield put(Actions.fetchAddresses(background))
    }
  }
}


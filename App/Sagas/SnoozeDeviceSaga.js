import {call, put, select, take} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'
import getDevice from '../Lib/Generators/GetDevice'

export default (api) => {

  function * worker (deviceId, bssid, location) {
    const { userId } = yield select(state => state.user)
    const response = yield call(api.snoozeDevice, deviceId, userId, bssid, location)
    if (response.ok) {
      yield put(Actions.snoozeDeviceSuccess(deviceId))
      yield put(Actions.stopNotificationAlarm())
      yield call(getDevice, api, deviceId)
    } else {
      yield put(Actions.snoozeDeviceFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const { deviceId, bssid, location } = yield take(Types.SNOOZE_DEVICE)
      yield call(worker, deviceId, bssid, location)
    }
  }

  return {
    watcher,
    worker
  }
}


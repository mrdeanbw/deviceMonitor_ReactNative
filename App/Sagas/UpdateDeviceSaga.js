import {call, put, select, take} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (deviceId, properties) {
    const response = yield call(api.updateDevice, deviceId, properties)
    if (response.ok) {
      yield put(Actions.updateDeviceSuccess(deviceId, properties))
    } else {
      yield put(Actions.updateDeviceFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.DEVICE_UPDATE)
      const { deviceId, properties } = action
      yield call(worker, deviceId, properties)
    }
  }

  return {
    watcher,
    worker
  }
}

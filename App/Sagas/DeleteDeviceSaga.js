import {call, put, select, take} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (deviceId) {
    const response = yield call(api.deleteDevice, deviceId)
    if (response.ok) {
      yield put(Actions.deleteDeviceSuccess(deviceId))
    } else {
      yield put(Actions.deleteDeviceFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.DEVICE_DELETE)
      const { deviceId } = action
      yield call(worker, deviceId)
    }
  }

  return {
    watcher,
    worker
  }
}

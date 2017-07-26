import {call, put, take} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (deviceId) {
    const response = yield call(api.getDeviceActivity, deviceId)
    if (response.ok) {
      yield put(Actions.fetchDeviceActivitySuccess(response.data.results))
    } else {
      yield put(Actions.fetchDeviceActivityFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.FETCH_DEVICE_ACTIVITY)
      const { deviceId } = action
      yield call(worker, deviceId)
    }
  }

  return {
    watcher,
    worker
  }
}


import {call, fork, put, select, take} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getDeviceStatus } from '../Lib/Device'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (listOfAddressIds) {
    const { userId } = yield select(state => state.user)

    const response = yield call(api.getDevices, userId, listOfAddressIds)
    if (!response.ok) {
      const error = getErrorFromResponse(response)
      yield put(Actions.fetchDevicesFailure(error))
      return
    }

    const config = yield select(state => state.config)
    for (let device of response.data.results) {
      device.status = getDeviceStatus(device, config)
    }

    yield put(Actions.fetchDevicesSuccess(listOfAddressIds, response.data.results))
  }

  function * watcher () {
    while (true) {
      const { listOfAddressIds } = yield take(Types.FETCH_DEVICES)
      yield fork(worker, listOfAddressIds)
    }
  }

  return {
    watcher,
    worker
  }
}



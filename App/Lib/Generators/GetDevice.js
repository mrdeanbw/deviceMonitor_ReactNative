import { select, call, put } from 'redux-saga/effects'
import Actions from '../../Actions/Creators'
import { getDeviceStatus } from '../Device'
import { getErrorFromResponse } from '../Errors'

function * getDevice (api, deviceId) {
  const response = yield call(api.getDevice, deviceId)

  if (response.ok) {
    const device = response.data
    const config = yield select(state => state.config)
    device.status = getDeviceStatus(device, config)
    yield put(Actions.getDeviceSuccess(device))
  } else {
    yield put(Actions.getDeviceFailure(getErrorFromResponse(response)))
  }
}

export default getDevice

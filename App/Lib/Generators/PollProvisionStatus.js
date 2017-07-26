import { select, take, call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import R from 'ramda'
import Types from '../../Actions/Types'
import Actions from '../../Actions/Creators'
import { getErrorFromResponse } from '../Errors'
import getDevice from './GetDevice'


function * pollProvisionStatus (api) {
  yield put(Actions.changeProvisionStep('polling'))
  const { deviceId } = yield select((state) => state.createDevice)

  let count = 60
  let isProvisioned
  while (count > 0) {
    count -= 1

    isProvisioned = yield select((state) => state.createDevice.isProvisioned)

    if (isProvisioned) { break }

    const effects = [ call(delay, 1000), put(Actions.updateTimerCountdown(count)) ]

    if (count % 5 === 0) {
      // TODO: handle errors?
      // although, i should just raise an error in the getDevice call?
      yield [...effects, call(getDevice, api, deviceId)]
      continue
    }

    yield effects
  }

  if (!isProvisioned) {
    yield put(Actions.changeProvisionStep('failure'))
    return
  }

  yield put(Actions.changeProvisionStep('success'))
}

export default pollProvisionStatus

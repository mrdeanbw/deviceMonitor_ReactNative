import {call, put, select, take} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'
import { getInstallationId } from '../Lib/Utilities'

export default (api) => {

  function * worker (deviceType, deviceToken) {
    const { userChannel } = yield select(state => state.user)
    const userChannels = [ userChannel ]
    const installationId = yield call(getInstallationId)
    const response = yield call(api.createInstallation, installationId, deviceToken, userChannels)
    if (response.ok) {
      yield put(Actions.createInstallationSuccess())
    } else {
      yield put(Actions.createInstallationFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.CREATE_INSTALLATION)
      const { deviceType, deviceToken } = action
      yield call(worker, deviceType, deviceToken)
    }
  }

  return {
    watcher,
    worker
  }
}

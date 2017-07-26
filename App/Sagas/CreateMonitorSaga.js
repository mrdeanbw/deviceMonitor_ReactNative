import { take, call, put, select } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (formattedPhoneNumber, addressId) {
    const { userId } = yield select(state => state.user)
    const response = yield call(api.createMonitor, formattedPhoneNumber, addressId, userId)

    const createErrorAction = (response) => {
      const error = getErrorFromResponse(response)
      return Actions.createMonitorFailure(error)
    }

    if (response.ok) {
      const monitorId = response.data.objectId
      yield put(Actions.createMonitorSuccess(monitorId))
    } else {
      yield put(createErrorAction(response))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.CREATE_MONITOR)
      const { formattedPhoneNumber, addressId } = action
      yield call(worker, formattedPhoneNumber, addressId)
    }
  }

  return {
    watcher,
    worker
  }
}

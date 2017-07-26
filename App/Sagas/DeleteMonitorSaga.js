import {call, put, select, take} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (monitorId) {
    const response = yield call(api.updateMonitor, monitorId, 'terminate')
    if (response.ok) {
      yield put(Actions.deleteMonitorSuccess(monitorId))
    } else {
      yield put(Actions.deleteMonitorFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.DELETE_MONITOR)
      const { monitorId } = action
      yield call(worker, monitorId)
    }
  }

  return {
    watcher,
    worker
  }
}

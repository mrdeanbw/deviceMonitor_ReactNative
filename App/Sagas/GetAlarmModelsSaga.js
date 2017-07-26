import {call, put, select, take} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker () {
    const response = yield call(api.getAlarmModels)

    if (!response.ok) {
      const error = getErrorFromResponse(response)
      yield put(Actions.getAlarmModelsFailure(error))
      return
    }

    yield put(Actions.getAlarmModelsSuccess(response.data.results))
  }

  function * watcher () {
    while (true) {
      yield take(Types.GET_ALARM_MODELS)
      yield call(worker)
    }
  }

  return {
    watcher,
    worker
  }
}


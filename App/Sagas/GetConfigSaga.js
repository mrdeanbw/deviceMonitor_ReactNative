import {call, put, select, take} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker () {
    const response = yield call(api.getConfig)
    if (response.ok) {
      if (response.data.results.length) {
        yield put(Actions.fetchConfigSuccess(response.data.results[0]))
      }
    } else {
      yield put(Actions.fetchConfigFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      yield take(Types.FETCH_CONFIG)
      yield call(worker)
    }
  }

  return {
    watcher,
    worker
  }
}


import { AsyncStorage } from 'react-native'
import {call, put, select, take} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (updates) {
    const { userId } = yield select(state => state.user)
    const response = yield call(api.updateUser, userId, updates)

    if (response.ok) {
      yield put(Actions.updateProfileSuccess(updates))
    } else {
      yield put(Actions.updateProfileFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.UPDATE_PROFILE)
      const { updates } = action
      yield call(worker, updates)
    }
  }

  return {
    watcher,
    worker
  }
}

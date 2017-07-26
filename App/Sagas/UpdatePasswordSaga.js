import { AsyncStorage } from 'react-native'
import {call, put, select, take} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (newPassword) {
    const { userId } = yield select(state => state.user)
    const response = yield call(api.updatePassword, userId, newPassword)
    if (response.ok) {
      const { sessionToken } = response.data
      api.setToken(sessionToken)
      AsyncStorage.setItem('sessionToken', sessionToken)
      yield put(Actions.updatePasswordSuccess(sessionToken))
    } else {
      yield put(Actions.updatePasswordFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.UPDATE_PASSWORD)
      const { password } = action
      yield call(worker, password)
    }
  }

  return {
    watcher,
    worker
  }
}

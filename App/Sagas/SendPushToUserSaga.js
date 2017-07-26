import {take, call, put, select} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker () {
    const { userId } = yield select(state => state.user)
    const response = yield call(api.sendPushToUser, userId)
    const sendPushErrorAction = (response) => {
      const error = getErrorFromResponse(response)
      return Actions.sendPushToUserFailure(error)
    }

    if (response.ok) {
      yield put(Actions.sendPushToUserSuccess(userId))
    } else {
      yield put(sendPushErrorAction(response))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.SEND_PUSH_TO_USER)
      const { userId } = action
      yield call(worker, userId)
    }
  }

  return {
    watcher,
    worker
  }
}

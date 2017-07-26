import {take, call, put, select} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker () {
    const { phoneNumber } = yield select((state) => state.user)

    const response = yield call(api.findPhoneNumber, phoneNumber)
    if (!response.ok) {
      const error = getErrorFromResponse(response)
      yield put(Actions.deleteUserFailure(error))
      return
    }

    const { data } = response
    if (!data.results || !data.results.length) {
      yield put(Actions.deleteUserFailure('No account found with that phone number'))
    }

    const { objectId } = data.results[0]
    const deleteResponse = yield call(api.deletePhoneNumber, objectId)
    if (deleteResponse.ok) {
      yield put(Actions.logout())
      yield put(Actions.deleteUserSuccess())
    } else {
      const error = getErrorFromResponse(deleteResponse)
      yield put(Actions.deleteUserFailure(error))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.USER_DELETE)
      yield call(worker)
    }
  }

  return {
    watcher,
    worker
  }
}

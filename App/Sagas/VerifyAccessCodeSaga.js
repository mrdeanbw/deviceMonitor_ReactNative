import {take, call, put, select} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import I18n from '../I18n/I18n.js'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker () {
    yield put(Actions.updatingPhoneNumber())
    const { phoneNumberId } = yield select((state) => state.createAccount)
    const response = yield call(api.verifyCode, phoneNumberId)
    if (response.ok) {
      yield put(Actions.phoneNumberUpdateSuccess())
    } else {
      const error = getErrorFromResponse(response)
      yield put(Actions.phoneNumberUpdateFailed(error))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.ACCESS_CODE_VERIFIED)
      yield call(worker)
    }
  }

  return {
    watcher,
    worker
  }
}

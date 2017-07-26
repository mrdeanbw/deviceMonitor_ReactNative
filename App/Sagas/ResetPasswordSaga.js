import {take, call, put} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (phoneNumber, countryCode) {
    const formattedPhoneNumber = `+${countryCode}${phoneNumber}`
    const response = yield call(api.resetPassword, formattedPhoneNumber)
    console.log(response)
    if (response.ok) {
      yield put(Actions.resetPasswordSuccess())
    } else {
      yield put(Actions.resetPasswordFailure(response.data.error))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.RESET_PASSWORD)
      const { phoneNumber, countryCode } = action
      yield call(worker, phoneNumber, countryCode)
    }
  }

  return {
    watcher,
    worker
  }
}


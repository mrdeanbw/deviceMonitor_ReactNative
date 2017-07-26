import {take, call, put} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import I18n from '../I18n/I18n.js'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (phoneNumber, countryCode) {
    yield put(Actions.startPhoneNumberCreation())

    const formattedPhoneNumber = `+${countryCode}${phoneNumber}`
    const response = yield call(api.createPhoneNumber, formattedPhoneNumber)

    const createErrorAction = (response) => {
      const error = getErrorFromResponse(response)
      return Actions.phoneNumberCreateFailure(error)
    }

    if (response.ok) {
      const phoneNumberId = response.data.objectId
      const verifyResponse = yield call(api.verifyPhoneNumber, phoneNumberId)
      if (verifyResponse.ok) {
        const { accessCode } = verifyResponse.data
        yield put(Actions.phoneNumberCreateSuccess(accessCode, phoneNumberId))
      } else {
        yield put(createErrorAction(verifyResponse))
      }
    } else {
      yield put(createErrorAction(response))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.PHONE_NUMBER_CREATE)
      const { phoneNumber, countryCode } = action
      yield call(worker, phoneNumber, countryCode)
    }
  }

  return {
    watcher,
    worker
  }
}

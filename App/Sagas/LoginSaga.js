import { AsyncStorage } from 'react-native'
import { take, put, call } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * attemptLogin (username, password) {
    const response = yield call(api.login, username, password)
    if (response.ok) {
      const { sessionToken } = response.data
      api.setToken(sessionToken)
      AsyncStorage.setItem('sessionToken', sessionToken)

      yield put(Actions.loginSuccess(response.data))
    } else {
      yield put(Actions.loginFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const { countryCode, phoneNumber, password } = yield take(Types.LOGIN_ATTEMPT)
      const username = `+${countryCode}${phoneNumber}`
      yield call(attemptLogin, username, password)
    }
  }

  return {
    attemptLogin,
    watcher
  }
}

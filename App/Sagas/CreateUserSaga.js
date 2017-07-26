import { AsyncStorage } from 'react-native'
import {take, call, put, select} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import I18n from '../I18n/I18n.js'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (firstName, lastName, email, password) {
    yield put(Actions.creatingUser())

    const { phoneNumber } = yield select((state) => state.createAccount)
    const countryCode = yield select(state => state.selectedCountry.code)
    const response = yield call(api.createUser, countryCode, phoneNumber, firstName, lastName, email, password)
    if (response.ok) {
      const { sessionToken } = response.data
      api.setToken(sessionToken)
      AsyncStorage.setItem('sessionToken', sessionToken)

      const userResponse = yield call(api.getUser)
      yield put(Actions.createUserSuccess(userResponse.data))
    } else {
      const error = getErrorFromResponse(response)
      yield put(Actions.createUserFailure(error))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.USER_CREATE)
      const { firstName, lastName, email, password } = action
      yield call(worker, firstName, lastName, email, password)
    }
  }

  return {
    watcher,
    worker
  }
}

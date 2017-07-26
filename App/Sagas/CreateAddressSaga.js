import {call, put, select, take} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (fields) {
    const { userId } = yield select(state => state.user)
    const response = yield call(api.createAddress, userId, fields)
    if (response.ok) {
      const { objectId } = response.data
      const newAddress = yield call(api.getAddress, objectId)
      yield put(Actions.createAddressSuccess(objectId, newAddress.data))
    } else {
      yield put(Actions.createAddressFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.CREATE_ADDRESS)
      const { fields } = action
      yield call(worker, fields)
    }
  }

  return {
    watcher,
    worker
  }
}

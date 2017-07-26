import {call, put, select, take} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (addressId, updates) {
    const response = yield call(api.saveAddress, addressId, updates)
    if (response.ok) {
      yield put(Actions.saveAddressSuccess(addressId, updates))
    } else {
      yield put(Actions.saveAddressFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.SAVE_ADDRESS)
      const { addressId, updates } = action
      yield call(worker, addressId, updates)
    }
  }

  return {
    watcher,
    worker
  }
}


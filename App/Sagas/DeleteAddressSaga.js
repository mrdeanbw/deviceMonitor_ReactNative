import {call, put, select, take} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (addressId) {
    const response = yield call(api.deleteAddress, addressId)
    if (response.ok) {
      yield put(Actions.deleteAddressSuccess(addressId))
    } else {
      yield put(Actions.deleteAddressFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.DELETE_ADDRESS)
      const { addressId } = action
      yield call(worker, addressId)
    }
  }

  return {
    watcher,
    worker
  }
}


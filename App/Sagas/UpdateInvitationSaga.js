import {call, put, select, take} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (invitationId, status) {
    const response = yield call(api.updateMonitor, invitationId, status)
    if (response.ok) {
      yield put(Actions.fetchAddresses())
      yield put(Actions.updateInvitationSuccess(invitationId))
    } else {
      yield put(Actions.updateInvitationFailure(getErrorFromResponse(response)))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.UPDATE_INVITATION)
      const { invitationId, status } = action
      yield call(worker, invitationId, status)
    }
  }

  return {
    watcher,
    worker
  }
}

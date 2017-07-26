import { select, take, call, put, fork, cancel, cancelled } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'
import createAndUpdateDevice from '../Lib/Generators/CreateAndUpdateDevice'
import generateAndPlayChirp from '../Lib/Generators/GenerateAndPlayChirp'
import pollProvisionStatus from '../Lib/Generators/PollProvisionStatus'

export default (api) => {

  function * worker () {

    try {
      yield call(createAndUpdateDevice, api)
      yield call(generateAndPlayChirp)
      yield call(pollProvisionStatus, api)
    }

    catch (e) {
      console.log('PROVISIONING ERROR: ', e)
    }

    finally {
      if (yield cancelled()) {
        yield put(Actions.cancelProvisionCleanup())
      }
      yield put(Actions.provisionAttemptComplete())
    }
  }

  function * watcher () {
    while (true) {
      yield take(Types.DEVICE_CREATE)
      const task = yield fork(worker)

      const action = yield take([Types.PROVISION_CANCEL, Types.PROVISION_ATTEMPT_COMPLETE])
      if (action.type === Types.PROVISION_CANCEL) {
        yield cancel(task)
      }
    }
  }

  return {
    watcher,
    worker
  }
}

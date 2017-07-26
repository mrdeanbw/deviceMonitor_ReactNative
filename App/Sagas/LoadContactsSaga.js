import { take, call, put } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { updateContacts } from '../Lib/Contacts'

function * worker (requestPermissions) {
  let result

  try {
    result = yield call(updateContacts, requestPermissions)
  } catch (err) {
    yield put(Actions.loadContactsFailure(err))
    return
  }

  yield put(Actions.loadContactsSuccess(result.contactsAccess, result.contacts))
}

function * watcher () {
  while (true) {
    const { requestPermissions } = yield take(Types.LOAD_CONTACTS)
    yield call(worker, requestPermissions)
  }
}

export default {
  watcher,
  worker
}

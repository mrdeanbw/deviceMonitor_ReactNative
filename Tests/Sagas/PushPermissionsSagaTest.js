import test from 'ava'
import { take, call, put } from 'redux-saga/effects'
import PushPermissionsSaga from '../../App/Sagas/PushPermissionsSaga'
import Types from '../../App/Actions/Types'
import PushNotification from 'react-native-push-notification'
import { REHYDRATE } from 'redux-persist/constants'

const saga = PushPermissionsSaga()
const stepper = (fn) => (mock) => fn.next(mock).value

test('watcher for rehydrate, loginSuccess or createUserSuccess', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take([REHYDRATE, Types.LOGIN_SUCCESS, Types.USER_CREATE_SUCCESS]))
  t.deepEqual(step(), call(saga.requestPermissions))
})

test('loginSuccess', t => {
  const step = stepper(saga.requestPermissions())
  const user = { sessionToken: 'foo' }

  step()
  t.deepEqual(step(user), call([PushNotification, PushNotification.requestPermissions]))
})

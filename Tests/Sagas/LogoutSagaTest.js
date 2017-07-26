import test from 'ava'
import { AsyncStorage } from 'react-native'
import { take, call, put } from 'redux-saga/effects'
import LogoutSaga from '../../App/Sagas/LogoutSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'
import channelUnsubscribe from '../../App/Lib/Generators/ChannelUnsubscribe'

const saga = LogoutSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.LOGOUT))
  t.deepEqual(step(), call(saga.worker))
})

test('logout', t => {
  const step = stepper(saga.worker())

  t.deepEqual(step(), call(channelUnsubscribe, FixtureApi))
  t.deepEqual(step(), call(FixtureApi.logout))
  t.deepEqual(step(), call(AsyncStorage.removeItem, 'sessionToken'))
  t.deepEqual(step(), call(FixtureApi.removeToken))
})

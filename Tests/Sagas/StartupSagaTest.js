import test from 'ava'
import { put, take } from 'redux-saga/effects'
import { watchStartup } from '../../App/Sagas/StartupSaga'
import Actions from '../../App/Actions/Creators'
import Types from '../../App/Actions/Types'

const stepper = (fn) => (mock) => fn.next(mock).value

test('watches for the right action', t => {
  const step = stepper(watchStartup())
  t.deepEqual(step(), take(Types.STARTUP))
  t.deepEqual(step(), put(Actions.fetchConfig()))
})

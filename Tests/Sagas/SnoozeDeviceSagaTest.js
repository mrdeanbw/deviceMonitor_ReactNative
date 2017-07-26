import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import SnoozeDeviceSaga from '../../App/Sagas/SnoozeDeviceSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'
import getDevice from '../../App/Lib/Generators/GetDevice'

const saga = SnoozeDeviceSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value

const deviceId = '123'
const userId = '1'
const bssid = '00:00:11:11'
const location = { latitude: 'here', longitude: 'there' }

test('watcher', t => {
  const action = { deviceId, userId, bssid, location }
  const step = stepper(saga.watcher())
  t.deepEqual(step(), take(Types.SNOOZE_DEVICE))
  t.deepEqual(step(action), call(saga.worker, deviceId, bssid, location))
})

test('snooze device successful', t => {
  const step = stepper(saga.worker(deviceId, bssid, location))

  step()
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.snoozeDevice, deviceId, userId, bssid, location)
  )
  const response = FixtureApi.snoozeDevice()
  t.deepEqual(step(response), put(Actions.snoozeDeviceSuccess(deviceId)))
  t.deepEqual(step(), put(Actions.stopNotificationAlarm()))
  t.deepEqual(step(), call(getDevice, FixtureApi, deviceId))
})

test('snooze device failure', t => {
  const step = stepper(saga.worker(deviceId, bssid, location))

  step()
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.snoozeDevice, deviceId, userId, bssid, location)
  )
  const error = 'not from your current location'
  const response = { ok: false, data: { error } }
  t.deepEqual(
    step(response),
    put(Actions.snoozeDeviceFailure(error))
  )
})


import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import UpdateDeviceSaga from '../../App/Sagas/UpdateDeviceSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = UpdateDeviceSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value

const deviceId = 123
const properties = { foo: 'bar' }

test('watcher', t => {
  const update = { deviceId: deviceId, properties: properties }

  const step = stepper(saga.watcher())
  t.deepEqual(step(), take(Types.DEVICE_UPDATE))
  t.deepEqual(step(update), call(saga.worker, deviceId, properties))
})

test('update device successful', t => {
  const step = stepper(saga.worker(deviceId, properties))

  t.deepEqual(
    step(),
    call(FixtureApi.updateDevice, deviceId, properties)
  )
  const response = FixtureApi.updateDevice()
  t.deepEqual(
    step(response),
    put(Actions.updateDeviceSuccess(deviceId, properties))
  )
})

test('update device failure', t => {
  const step = stepper(saga.worker(deviceId, properties))

  t.deepEqual(
    step(),
    call(FixtureApi.updateDevice, deviceId, properties)
  )
  const error = "diamonds are forever"
  const response = { ok: false, data: { error } }
  t.deepEqual(
    step(response),
    put(Actions.updateDeviceFailure(error))
  )
})

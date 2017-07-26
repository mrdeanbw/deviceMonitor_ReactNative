import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import DeleteDeviceSaga from '../../App/Sagas/DeleteDeviceSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = DeleteDeviceSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value

const deviceId = 123

test('watcher', t => {
  const action = { deviceId: deviceId }

  const step = stepper(saga.watcher())
  t.deepEqual(step(), take(Types.DEVICE_DELETE))
  t.deepEqual(step(action), call(saga.worker, deviceId))
})

test('delete device successful', t => {
  const step = stepper(saga.worker(deviceId))

  t.deepEqual(
    step(),
    call(FixtureApi.deleteDevice, deviceId)
  )
  const response = FixtureApi.deleteDevice()
  t.deepEqual(
    step(response),
    put(Actions.deleteDeviceSuccess(deviceId))
  )
})

test('delete device failure', t => {
  const step = stepper(saga.worker(deviceId))

  t.deepEqual(
    step(),
    call(FixtureApi.deleteDevice, deviceId)
  )
  const error = 'diamonds are forever'
  const response = { ok: false, data: { error } }
  t.deepEqual(
    step(response),
    put(Actions.deleteDeviceFailure(error))
  )
})


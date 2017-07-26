
import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import GetDeviceActivitySaga from '../../App/Sagas/GetDeviceActivitySaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = GetDeviceActivitySaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const deviceId = '1'

test('watcher', t => {
  const step = stepper(saga.watcher())

  const action = { deviceId }
  t.deepEqual(step(), take(Types.FETCH_DEVICE_ACTIVITY))
  t.deepEqual(step(action), call(saga.worker, deviceId))
})

test('fetch activity successful', t => {
  const step = stepper(saga.worker(deviceId))

  t.deepEqual(
    step(),
    call(FixtureApi.getDeviceActivity, deviceId)
  )
  const response = FixtureApi.getDeviceActivity(deviceId)
  const events = response.data.results
  t.deepEqual(
    step(response),
    put(Actions.fetchDeviceActivitySuccess(events))
  )
})

test('fetch activity failed', t => {
  const wrongDeviceId = '2'
  const step = stepper(saga.worker(wrongDeviceId))

  t.deepEqual(step(), call(FixtureApi.getDeviceActivity, wrongDeviceId))
  const response = FixtureApi.getDeviceActivity(wrongDeviceId)
  const error = response.data.error
  t.deepEqual(
    step(response),
    put(Actions.fetchDeviceActivityFailure(error))
  )
})

import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import GetDeviceClimateSaga from '../../App/Sagas/GetDeviceClimateSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = GetDeviceClimateSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const deviceId = '1'
const period = 'day'

test('watcher', t => {
  const step = stepper(saga.watcher())

  const action = { deviceId, period }
  t.deepEqual(step(), take(Types.FETCH_DEVICE_CLIMATE))
  t.deepEqual(step(action), call(saga.worker, deviceId, period))
})

const didCallGetDeviceClimate = (t, getClimateStep) => {
  t.truthy(getClimateStep.CALL)
  const getClimateCall = getClimateStep.CALL
  t.is(getClimateCall.fn, FixtureApi.getDeviceClimate)
  t.is(getClimateCall.args[0], deviceId)
}

test('fetch climate successful', t => {
  const step = stepper(saga.worker(deviceId, period))

  didCallGetDeviceClimate(t, step())
  const response = FixtureApi.getDeviceClimate(deviceId, period)
  const events = response.data.results
  t.deepEqual(
    step(response),
    put(Actions.fetchDeviceClimateSuccess(events, period))
  )
})

test('fetch climate failed', t => {
  const step = stepper(saga.worker(deviceId, period))

  didCallGetDeviceClimate(t, step())
  const error = 'Ya goofed'
  const response = { ok: false, data: { error } }
  t.deepEqual(
    step(response),
    put(Actions.fetchDeviceClimateFailure(error, period))
  )
})

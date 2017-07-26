import test from 'ava'
import { call, put } from 'redux-saga/effects'
import GetDevice from '../../App/Lib/Generators/GetDevice'
import FixtureApi from '../../App/Services/FixtureApi'
import Actions from '../../App/Actions/Creators'

const deviceId = 'foo'
const gen = () => GetDevice(FixtureApi, deviceId)
const stepper = (fn) => (mock) => fn.next(mock).value

test('get device failure', t => {
  const step = stepper(gen())

  t.deepEqual(
    step(),
    call(FixtureApi.getDevice, deviceId)
  )
  const error = 'Ya dun goofed'
  const deviceResult = { ok: false, data: { error } }
  t.deepEqual(
    step(deviceResult),
    put(Actions.getDeviceFailure(error))
  )
})

test('get config succeeds', t => {
  const step = stepper(gen())

  t.deepEqual(
    step(),
    call(FixtureApi.getDevice, deviceId)
  )
  const response = FixtureApi.getDevice()
  const device = response.data
  const deviceWithStatus = {
    ...device,
    status: 'BATTERY_CRITICAL',
  }

  // Step through select call to retrieve config
  step(response)

  const config = {}
  t.deepEqual(
    step(config),
    put(Actions.getDeviceSuccess(deviceWithStatus))
  )
})



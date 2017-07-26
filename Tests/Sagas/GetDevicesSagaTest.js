import test from 'ava'
import { call, fork, put, take } from 'redux-saga/effects'
import GetDevicesSaga from '../../App/Sagas/GetDevicesSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'
import DeviceStatus from '../../App/Lib/DeviceStatus'

const saga = GetDevicesSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const addressIds = ['1234', '5678']
const userId = 'beef'

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.FETCH_DEVICES))
  t.deepEqual(step({ listOfAddressIds: addressIds }), fork(saga.worker, addressIds))
})

test('fetch devices successful', t => {
  const step = stepper(saga.worker(addressIds))

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.getDevices, userId, addressIds)
  )
  const devicesResponse = FixtureApi.getDevices(userId, addressIds)
  step(devicesResponse) // step through select config call
  const config = { recentUpdate: 1800 }
  t.deepEqual(
    step(config),
    put(Actions.fetchDevicesSuccess(addressIds, devicesResponse.data.results))
  )
  t.is(devicesResponse.data.results[0].status, DeviceStatus.BATTERY_CRITICAL)
})

test('fetch devices failed', t => {
  const step = stepper(saga.worker(addressIds))

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.getDevices, userId, addressIds)
  )
  const error = 'ya dun goofed'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.fetchDevicesFailure(error))
  )
})

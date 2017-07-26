import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import GetAddressesSaga from '../../App/Sagas/GetAddressesSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = GetAddressesSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const user = { userId: 'foo' }
const monitoredAddresses = FixtureApi.getOwnMonitors().data.results.map(
  (monitor) => (monitor.address))

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.FETCH_ADDRESSES))
  t.deepEqual(step(), call(saga.worker))
})

test('fetch addresses successful', t => {
  const step = stepper(saga.worker())

  step() // step through select call
  t.deepEqual(
    step(user),
    call(FixtureApi.getOwnMonitors, user.userId)
  )

  const monitorsResponse = FixtureApi.getOwnMonitors()
  t.deepEqual(
    step(monitorsResponse),
    call(FixtureApi.getAddresses, user.userId, monitoredAddresses)
  )

  const addressesResponse = FixtureApi.getAddresses()
  const addressIds = [addressesResponse.data.results[0].objectId]
  t.deepEqual(
    step(),
    put(Actions.fetchConfig())
  )
  t.deepEqual(
    step(addressesResponse),
    put(Actions.fetchDevices(addressIds))
  )
  t.deepEqual(
    step(),
    put(Actions.fetchMonitors())
  )
  t.deepEqual(
    step(),
    put(Actions.fetchAddressesSuccess(user.userId, addressesResponse.data.results))
  )
})

test('fetch monitors failed', t => {
  const step = stepper(saga.worker())

  step() // step through select call
  t.deepEqual(
    step(user),
    call(FixtureApi.getOwnMonitors, user.userId)
  )
  const error = 'ya dun goofed'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.fetchAddressesFailure(error))
  )
})

test('fetch addresses failed', t => {
  const step = stepper(saga.worker())

  step() // step through select call
  t.deepEqual(
    step(user),
    call(FixtureApi.getOwnMonitors, user.userId)
  )
  t.deepEqual(
    step(FixtureApi.getOwnMonitors()),
    call(FixtureApi.getAddresses, user.userId, monitoredAddresses)
  )
  const error = 'ya dun goofed'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.fetchAddressesFailure(error))
  )
})




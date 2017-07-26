import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import SaveAddressSaga from '../../App/Sagas/SaveAddressSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = SaveAddressSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const addressId = '1'
const updates = { address: '123 Main Street' }
const mock = { addressId, updates }

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.SAVE_ADDRESS))
  t.deepEqual(step(mock), call(saga.worker, addressId, updates))
})

test('save address successful', t => {
  const step = stepper(saga.worker(addressId, updates))

  t.deepEqual(
    step(),
    call(FixtureApi.saveAddress, addressId, updates)
  )
  t.deepEqual(
    step({ ok: true }),
    put(Actions.saveAddressSuccess(addressId, updates))
  )
})

test('update password failed', t => {
  const step = stepper(saga.worker(addressId, updates))

  t.deepEqual(
    step(),
    call(FixtureApi.saveAddress, addressId, updates)
  )
  const error = 'ya dun goofed'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.saveAddressFailure(error))
  )
})




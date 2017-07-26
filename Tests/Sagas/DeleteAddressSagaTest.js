import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import DeleteAddressSaga from '../../App/Sagas/DeleteAddressSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = DeleteAddressSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value

const addressId = '123'

test('watcher', t => {
  const action = { addressId }

  const step = stepper(saga.watcher())
  t.deepEqual(step(), take(Types.DELETE_ADDRESS))
  t.deepEqual(step(action), call(saga.worker, addressId))
})

test('delete address successful', t => {
  const step = stepper(saga.worker(addressId))

  t.deepEqual(
    step(),
    call(FixtureApi.deleteAddress, addressId)
  )
  const response = FixtureApi.deleteAddress()
  t.deepEqual(
    step(response),
    put(Actions.deleteAddressSuccess(addressId))
  )
})

test('delete address failure', t => {
  const step = stepper(saga.worker(addressId))

  t.deepEqual(
    step(),
    call(FixtureApi.deleteAddress, addressId)
  )
  const error = 'diamonds are forever'
  const response = { ok: false, data: { error } }
  t.deepEqual(
    step(response),
    put(Actions.deleteAddressFailure(error))
  )
})


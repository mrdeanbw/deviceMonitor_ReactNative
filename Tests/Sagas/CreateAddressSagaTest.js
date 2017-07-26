import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import CreateAddressSaga from '../../App/Sagas/CreateAddressSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = CreateAddressSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const newAddressId = '1'
const userId = 'randy'
const fields = { address: '123 Main Street' }

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.CREATE_ADDRESS))
  t.deepEqual(step({ fields }), call(saga.worker, fields))
})

test('create address successful', t => {
  const step = stepper(saga.worker(fields))

  step()
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.createAddress, userId, fields)
  )
  t.deepEqual(
    step({ ok: true, data: { objectId: newAddressId } }),
    call(FixtureApi.getAddress, newAddressId)
  )
  const addressWithOwner = { ...fields, owner: { objectId: 'xyz' }}
  t.deepEqual(
    step({ ok: true, data: addressWithOwner }),
    put(Actions.createAddressSuccess(newAddressId, addressWithOwner))
  )
})

test('create address failed', t => {
  const step = stepper(saga.worker(fields))

  step()
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.createAddress, userId, fields)
  )
  const error = 'ya dun goofed'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.createAddressFailure(error))
  )
})

import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import CreateMonitorSaga from '../../App/Sagas/CreateMonitorSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = CreateMonitorSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const phoneNumber = '+123456'
const addressId = 'xyz'
const userId = 'theRock'
const fields = { formattedPhoneNumber: phoneNumber, addressId: addressId }

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.CREATE_MONITOR))
  t.deepEqual(step(fields), call(saga.worker, phoneNumber, addressId ))
})

test('create monitor successful', t => {
  const step = stepper(saga.worker(phoneNumber, addressId))

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.createMonitor, phoneNumber, addressId, userId)
  )
  const monitorId = 'sneaky'
  t.deepEqual(
    step({ ok: true, data: { objectId: monitorId } }),
    put(Actions.createMonitorSuccess(monitorId))
  )
})

test('create address failed', t => {
  const step = stepper(saga.worker(phoneNumber, addressId))

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.createMonitor, phoneNumber, addressId, userId)
  )
  const error = 'rejected! don\'t you dare bring that weak tot action'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.createMonitorFailure(error))
  )
})

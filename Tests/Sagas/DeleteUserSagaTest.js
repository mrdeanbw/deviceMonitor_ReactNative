import test from 'ava'
import { call, put, select, take } from 'redux-saga/effects'
import DeleteUserSaga from '../../App/Sagas/DeleteUserSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = DeleteUserSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value

const user = { phoneNumber: '+1234' }
const phoneNumberObj = { objectId: 'foo' }

test('watcher', t => {
  const step = stepper(saga.watcher())
  t.deepEqual(step(), take(Types.USER_DELETE))
  t.deepEqual(step(), call(saga.worker))
})

test('find phone number fails', t => {
  const step = stepper(saga.worker())

  // step through select call
  step()

  t.deepEqual(
    step(user),
    call(FixtureApi.findPhoneNumber, user.phoneNumber)
  )
  const response = { ok: false, data: { error: 'nope' } }
  t.deepEqual(
    step(response),
    put(Actions.deleteUserFailure(response.data.error))
  )
})

test('phone number not found', t => {
  const step = stepper(saga.worker())

  // step through select call
  step()

  t.deepEqual(
    step(user),
    call(FixtureApi.findPhoneNumber, user.phoneNumber)
  )
  const response = { ok: true, data: { results: [] } }
  t.deepEqual(
    step(response),
    put(Actions.deleteUserFailure('No account found with that phone number'))
  )
})

test('delete user failure', t => {
  const step = stepper(saga.worker())

  // step through select call
  step()

  t.deepEqual(
    step(user),
    call(FixtureApi.findPhoneNumber, user.phoneNumber)
  )
  const response = { ok: true, data: { results: [phoneNumberObj] } }
  t.deepEqual(
    step(response),
    call(FixtureApi.deletePhoneNumber, phoneNumberObj.objectId)
  )
  const deleteResponse = { ok: false, data: { error: 'nuh-uh' } }
  t.deepEqual(
    step(deleteResponse),
    put(Actions.deleteUserFailure(deleteResponse.data.error))
  )
})

test('delete user success', t => {
  const step = stepper(saga.worker())

  // step through select call
  step()

  t.deepEqual(
    step(user),
    call(FixtureApi.findPhoneNumber, user.phoneNumber)
  )
  const response = { ok: true, data: { results: [phoneNumberObj] } }
  t.deepEqual(
    step(response),
    call(FixtureApi.deletePhoneNumber, phoneNumberObj.objectId)
  )
  const deleteResponse = FixtureApi.deletePhoneNumber()
  t.deepEqual(
    step(deleteResponse),
    put(Actions.logout())
  )
  t.deepEqual(
    step(),
    put(Actions.deleteUserSuccess())
  )
})

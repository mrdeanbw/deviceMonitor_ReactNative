import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import UpdatePasswordSaga from '../../App/Sagas/UpdatePasswordSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = UpdatePasswordSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const newPassword = 'password'
const mock = { password: newPassword }
const userId = 'frank'

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.UPDATE_PASSWORD))
  t.deepEqual(step(mock), call(saga.worker, newPassword))
})

test('update password successful', t => {
  const step = stepper(saga.worker(newPassword))
  const sessionToken = 'foo'

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.updatePassword, userId, newPassword)
  )
  t.deepEqual(
    step({ ok: true, data: { sessionToken } }),
    put(Actions.updatePasswordSuccess(sessionToken))
  )

})

test('update password failed', t => {
  const step = stepper(saga.worker(newPassword))

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.updatePassword, userId, newPassword)
  )
  const error = 'ya dun goofed'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.updatePasswordFailure(error))
  )
})



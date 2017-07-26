import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import UpdateProfileSaga from '../../App/Sagas/UpdateProfileSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = UpdateProfileSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const updates = { name: 'Randy Butternubs' }
const mock = { updates }
const userId = 'frank'

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.UPDATE_PROFILE))
  t.deepEqual(step(mock), call(saga.worker, updates))
})

test('update profile successful', t => {
  const step = stepper(saga.worker(updates))

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.updateUser, userId, updates)
  )
  t.deepEqual(
    step({ ok: true, data: { ...updates } }),
    put(Actions.updateProfileSuccess(updates))
  )

})

test('update profile failed', t => {
  const step = stepper(saga.worker(updates))

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.updateUser, userId, updates)
  )
  const error = 'ya dun goofed'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.updateProfileFailure(error))
  )
})



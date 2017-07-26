import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import UpdateInvitationSaga from '../../App/Sagas/UpdateInvitationSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = UpdateInvitationSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value

const invitationId = '123'
const status = 'accept'

test('watcher', t => {
  const update = { invitationId, status }

  const step = stepper(saga.watcher())
  t.deepEqual(step(), take(Types.UPDATE_INVITATION))
  t.deepEqual(step(update), call(saga.worker, invitationId, status))
})

test('update invitation successful', t => {
  const step = stepper(saga.worker(invitationId, status))

  t.deepEqual(
    step(),
    call(FixtureApi.updateMonitor, invitationId, status)
  )
  const response = FixtureApi.updateMonitor()
  t.deepEqual(
    step(response),
    put(Actions.fetchAddresses())
  )
  t.deepEqual(
    step(),
    put(Actions.updateInvitationSuccess(invitationId))
  )
})

test('update invitation failure', t => {
  const step = stepper(saga.worker(invitationId, status))

  t.deepEqual(
    step(),
    call(FixtureApi.updateMonitor, invitationId, status)
  )
  const error = 'ya dun goofed'
  const response = { ok: false, data: { error } }
  t.deepEqual(
    step(response),
    put(Actions.updateInvitationFailure(error))
  )
})

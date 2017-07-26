import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import DeleteMonitorSaga from '../../App/Sagas/DeleteMonitorSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = DeleteMonitorSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value

const monitorId = '123'

test('watcher', t => {
  const mock = { monitorId }

  const step = stepper(saga.watcher())
  t.deepEqual(step(), take(Types.DELETE_MONITOR))
  t.deepEqual(step(mock), call(saga.worker, monitorId))
})

test('delete monitor successful', t => {
  const step = stepper(saga.worker(monitorId))

  t.deepEqual(
    step(),
    call(FixtureApi.updateMonitor, monitorId, 'terminate')
  )
  const response = FixtureApi.updateMonitor()
  t.deepEqual(
    step(response),
    put(Actions.deleteMonitorSuccess(monitorId))
  )
})

test('delete monitor failure', t => {
  const step = stepper(saga.worker(monitorId))

  t.deepEqual(
    step(),
    call(FixtureApi.updateMonitor, monitorId, 'terminate')
  )
  const error = 'ya dun goofed'
  const response = { ok: false, data: { error } }
  t.deepEqual(
    step(response),
    put(Actions.deleteMonitorFailure(error))
  )
})

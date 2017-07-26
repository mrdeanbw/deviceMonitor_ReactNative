import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import GetConfigSaga from '../../App/Sagas/GetConfigSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = GetConfigSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.FETCH_CONFIG))
  t.deepEqual(step(), call(saga.worker))
})

test('get config successful', t => {
  const step = stepper(saga.worker())

  t.deepEqual(
    step(),
    call(FixtureApi.getConfig)
  )
  const configResults = FixtureApi.getConfig()
  t.deepEqual(
    step(configResults),
    put(Actions.fetchConfigSuccess(configResults.data.results[0]))
  )
})

test('get config failed', t => {
  const step = stepper(saga.worker())

  t.deepEqual(
    step(),
    call(FixtureApi.getConfig)
  )
  const error = 'ya dun goofed'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.fetchConfigFailure(error))
  )
})



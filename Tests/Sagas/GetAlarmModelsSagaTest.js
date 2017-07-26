import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import GetAlarmModelsSaga from '../../App/Sagas/GetAlarmModelsSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = GetAlarmModelsSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const user = { userId: 'foo' }

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.GET_ALARM_MODELS))
  t.deepEqual(step(), call(saga.worker))
})

test('get alarm models success', t => {
  const step = stepper(saga.worker())
  t.deepEqual(
    step(),
    call(FixtureApi.getAlarmModels)
  )
  const alarmModelsResponse = FixtureApi.getAlarmModels()
  t.deepEqual(
    step(alarmModelsResponse),
    put(Actions.getAlarmModelsSuccess(alarmModelsResponse.data.results))
  )
})

test('get alarm models failure', t => {
  const step = stepper(saga.worker())
  t.deepEqual(step(), call(FixtureApi.getAlarmModels))
  const error = 'super epic fail'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.getAlarmModelsFailure(error))
  )
})


import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import PlaySuccessSoundSaga from '../../App/Sagas/PlaySuccessSoundSaga'
import Chirp from '../../App/Lib/Chirp'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = PlaySuccessSoundSaga()
const stepper = (fn) => (mock) => fn.next(mock).value

test("watcher - 'success' step", t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.PROVISION_STEP_CHANGE))
  t.deepEqual(step({ step: 'success' }), call(saga.worker))
})

test("watcher - other steps", t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.PROVISION_STEP_CHANGE))
  // check that execution continues at the top of the loop
  t.deepEqual(step({ step: 'initial' }), take(Types.PROVISION_STEP_CHANGE))
})

test('play success sound', t => {
  const step = stepper(saga.worker())
  const includeBasePath = true
  t.deepEqual(
    step(),
    call(Chirp.load, 'success.mp3', includeBasePath)
  )
  const loadedAudio = {}
  t.deepEqual(
    step(loadedAudio),
    call(Chirp.play, loadedAudio)
  )
})

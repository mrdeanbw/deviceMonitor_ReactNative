import test from 'ava'
import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects'
import { createMockTask } from 'redux-saga/utils'
import PlayNotificationSoundSaga from '../../App/Sagas/PlayNotificationSoundSaga'
import Chirp from '../../App/Lib/Chirp'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = PlayNotificationSoundSaga
const stepper = (fn) => (mock) => fn.next(mock).value

test('watcher - sound succesfully played', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.PLAY_NOTIFICATION_ALARM))
  t.deepEqual(step(), fork(saga.worker))
  t.deepEqual(step(), take([Types.STOP_NOTIFICATION_ALARM, Types.FINISH_NOTIFICATION_ALARM, Types.END_NOTIFICATION_ALARM]))
  t.deepEqual(step({ type: Types.FINISH_NOTIFICATION_ALARM }), take(Types.PLAY_NOTIFICATION_ALARM))
})

test('watcher - sound stopped', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.PLAY_NOTIFICATION_ALARM))
  t.deepEqual(step(), fork(saga.worker))
  const task = createMockTask()
  t.deepEqual(step(task), take([Types.STOP_NOTIFICATION_ALARM, Types.FINISH_NOTIFICATION_ALARM, Types.END_NOTIFICATION_ALARM]))
  t.deepEqual(step({ type: Types.STOP_NOTIFICATION_ALARM }), cancel(task))
})

test('play alarm sound finishes', t => {
  const step = stepper(saga.worker())
  const includeBasePath = true
  const enableInSilenceMode = false
  t.deepEqual(step(), call(Chirp.load, 'alarm.wav', includeBasePath, enableInSilenceMode))
  const loadedAudio = {}
  t.deepEqual(step(loadedAudio), call(Chirp.play, loadedAudio))
  t.deepEqual(step(), put(Actions.finishNotificationAlarm()))
  t.deepEqual(step(), cancelled())
})

test('play alarm sound cancelled', t => {
  const generator = saga.worker()
  const step = stepper(generator)
  const includeBasePath = true
  const enableInSilenceMode = false
  t.deepEqual(step(), call(Chirp.load, 'alarm.wav', includeBasePath, enableInSilenceMode))
  const loadedAudio = {}
  t.deepEqual(step(loadedAudio), call(Chirp.play, loadedAudio))
  t.deepEqual(generator.throw(new Error('stahhp')).value, cancelled())
  t.deepEqual(step(true), call(Chirp.stop, loadedAudio))
})

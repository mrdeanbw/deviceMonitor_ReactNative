import { cancel, cancelled, fork, take, call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import Chirp from '../Lib/Chirp'
import PushNotification from 'react-native-push-notification'

function * worker () {
  let loadedAudio
  try {
    const includeBasePath = true
    const enableInSilenceMode = false  // Don't force alarm sound when phone silenced
    loadedAudio = yield call(Chirp.load, 'alarm.wav', includeBasePath, enableInSilenceMode)
    yield call(Chirp.play, loadedAudio)
    yield put(Actions.finishNotificationAlarm())
  } catch (e) {
    // sound was cancelled
  }

  finally {
    if (yield cancelled()) {
      if(loadedAudio){
        yield call(Chirp.stop, loadedAudio)
      }
    }
  }
}

function * watcher () {
  while (true) {
    yield take(Types.PLAY_NOTIFICATION_ALARM)
    const task = yield fork(worker)
    const stopAction = yield take([Types.STOP_NOTIFICATION_ALARM, Types.FINISH_NOTIFICATION_ALARM, Types.END_NOTIFICATION_ALARM])
    if (stopAction.type === Types.STOP_NOTIFICATION_ALARM) {
      yield cancel(task)
      PushNotification.cancelAllLocalNotifications()
    }
    if(stopAction.type === Types.END_NOTIFICATION_ALARM) {
      yield cancel(task)
    }
  }
}

export default {
  watcher,
  worker
}

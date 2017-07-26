import { select, take, call, put, cancelled } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import Chirp from '../Lib/Chirp'

export default () => {

  function * worker () {
    try {
      const includeBasePath = true
      const loadedAudio = yield call(Chirp.load, 'success.mp3', includeBasePath)
      yield call(Chirp.play, loadedAudio)
    }

    catch (e) {
      console.log('SUCCESS PLAYBACK ERROR: ', e)
    }
  }

  function * watcher () {
    while (true) {
      const { step } = yield take(Types.PROVISION_STEP_CHANGE)
      if (step === 'success') {
        yield call(worker)
      }
    }
  }

  return {
    watcher,
    worker
  }
}

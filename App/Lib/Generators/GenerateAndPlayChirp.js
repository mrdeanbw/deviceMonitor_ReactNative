import { select, take, call, put, cancelled } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import R from 'ramda'
import Types from '../../Actions/Types'
import Actions from '../../Actions/Creators'
import { getErrorFromResponse } from '../Errors'
import Chirp from '../Chirp'
import timer from './Timer'

function * generateAndPlayChirp () {
  let loadedAudio

  try {
    yield put(Actions.changeProvisionStep('chirping'))

    const { wifiName, wifiPassword, deviceId } = yield select((state) => state.createDevice)
    const countryCode = yield select((state) => state.selectedCountry.wicedCode)
    const versionNum = yield select((state) => state.config.provisioningVersionNo)
    const chirpFile = yield call(Chirp.generate, wifiName, wifiPassword, deviceId, countryCode, versionNum)

    //TODO: handle errors from any of these promises
    loadedAudio = yield call(Chirp.load, chirpFile)
    const playbackDuration = Math.round(loadedAudio.getDuration())

    yield [
      call(timer, playbackDuration),
      call(Chirp.play, loadedAudio)
    ]
  } finally {
    if (yield cancelled()) {
      yield call(Chirp.stop, loadedAudio)
    }
  }
}

export default generateAndPlayChirp

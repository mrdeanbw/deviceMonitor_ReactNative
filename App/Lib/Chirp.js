import { NativeModules, Platform } from 'react-native'
import Sound from 'react-native-sound'

const generate = (wifiName, wifiPassword, deviceId, countryCode, versionNum) => {
  return new Promise((resolve, reject) => {
    NativeModules.Provision.generateChirp(wifiName, wifiPassword, deviceId, countryCode, versionNum, (error, chirpFile) => {
      if (error) {
          console.log('failed to generate chirp', error);
          reject(error)
        } else {
          console.log('successfully generated chirp')
          resolve(chirpFile)
        }
    })
  })
}

const load = (audioFile, includeBasePath = false, enableInSilenceMode = true) => {
  return new Promise((resolve, reject) => {
    const basePath = includeBasePath ? Sound.MAIN_BUNDLE : null
    const player = new Sound(audioFile, basePath, (error) => {
      if (error) {
        console.log('error: ', error)
        reject(error)
      } else {
        console.log('audio loaded')
        if (enableInSilenceMode) {
          Sound.enableInSilenceMode(enableInSilenceMode)
        } else if (Platform.OS === 'ios') {
          player.setCategory('SoloAmbient')
        }
        resolve(player)
      }
    })
  })
}

const play = (loadedAudio) => {
  return new Promise((resolve, reject) => {
    loadedAudio.play((success) => {
      if (success) {
        console.log('audio playback successful')
        resolve()
      } else {
        console.log('audio playback failed')
        reject()
      }
    })
  })
}

let silentSoundPlayer = null
const playSilentSound = () => {
  return new Promise((resolve, reject) => {
    const player = new Sound('silence.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        reject(error)
      } else {
        player.setNumberOfLoops(-1)
        silentSoundPlayer = player
        resolve()
        player.play((success) => {})
      }
    })
  })
}

const stopSilentSound = () => silentSoundPlayer && stop(silentSoundPlayer)

// the release method stops the audio and releases
// the audio player resource
const stop = (loadedAudio) => loadedAudio.release()

export default {
  generate,
  load,
  play,
  playSilentSound,
  stop,
  stopSilentSound
}

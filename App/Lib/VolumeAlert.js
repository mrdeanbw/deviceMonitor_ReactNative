import { Actions as Nav } from 'react-native-router-flux'
import { Alert, NativeModules } from 'react-native'

const MIN_REQUIRED_VOLUME = 0.8

const alertTitle = 'Turn Up Volume'
const alertText = 'Your phone uses sound to communicate with the Roost Smart Device. Please increase your speaker volume to it\'s maximum setting to proceed'

const volumeAlert = () => {
  const nextScreen = Nav.deviceProvision

  NativeModules.Volume.getSystemVolume((error, volume) => {
    if (error) {
      Alert.alert(
        alertTitle, alertText, [
          { text: 'Cancel', onPress: () => {} },
          { text: 'OK', onPress: nextScreen }
        ]
      )
    }

    if (volume >= MIN_REQUIRED_VOLUME) {
      nextScreen()
    } else {
      Alert.alert(
        alertTitle, alertText, [
          { text: 'OK', onPress: () => {} }
        ]
      )
    }
  })
}

export default volumeAlert

import { Actions as Nav } from 'react-native-router-flux'
import { Alert, NativeModules } from 'react-native'

const MIN_REQUIRED_VOLUME = 0.8

const alertTitle = ''
const alertText = 'You can customize these default temperature and humidity settings now or at any time in your "Alert Settings"'

const alertSettingsPopup = () => {
  const nextScreen = Nav.alertsSetup

      Alert.alert(
        alertTitle, alertText, [
          { text: 'Cancel', onPress: () => {} },
          { text: 'OK', onPress: nextScreen }
        ]
      )
}

export default alertSettingsPopup

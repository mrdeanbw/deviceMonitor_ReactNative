import React from 'react'
import { Linking, Platform, Text } from 'react-native'
import { Fonts, Images } from '../Themes'
import { Actions as Nav } from 'react-native-router-flux'
import DeviceSetup from '../Components/DeviceSetup'
import styles from './Styles/SetupInstructionsStyle'
import volumeAlert from '../Lib/VolumeAlert'

class BatterySetupInstructionsFour extends React.Component {

  render () {
    let instructions
    switch (Platform.OS) {
      case 'ios':
        instructions = <Text style={styles.text}>Place your iPhone to the left of the battery, with the speakers 1/2 inch (~1 cm) away and facing the battery sound hole</Text>
        break
      case 'android':
        instructions = [
          <Text key='0' style={styles.text}>Face your phone screen-side up on the table with the speakers 1/2 inch (~1cm) away from the battery sound hole</Text>,
          <Text key='1' style={[styles.text, { fontSize: Fonts.size.small }]}>For help with other Android models, go to <Text style={styles.link} onPress={() => Linking.openURL('http://getroost.com/android.html')}>getroost.com/android</Text></Text>
        ]
    }

    return (
      <DeviceSetup nextScene={volumeAlert} image={Images.smokeAlarmFour}>
        { instructions }
      </DeviceSetup>
    )
  }
}

export default BatterySetupInstructionsFour

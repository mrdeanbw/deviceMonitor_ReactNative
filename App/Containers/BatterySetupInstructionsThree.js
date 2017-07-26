import React from 'react'
import { Platform, Text } from 'react-native'
import { Images } from '../Themes'
import { Actions as Nav } from 'react-native-router-flux'
import DeviceSetup from '../Components/DeviceSetup'
import styles from './Styles/SetupInstructionsStyle'

class BatterySetupInstructionsThree extends React.Component {

  render () {
    let instructions
    switch (Platform.OS) {
      case 'ios':
        instructions = <Text style={styles.text}>Next, locate the speakers on the bottom of your iPhone. Remove your phone cover for best performance</Text>
        break
      case 'android':
        instructions = <Text style={styles.text}>Next, locate the speakers on your smartphone. Speaker location varies by Android model</Text>
    }

    return (
      <DeviceSetup nextScene={Nav.batterySetupInstructionsFour} image={Images.smokeAlarmThree}>
        { instructions }
      </DeviceSetup>
    )
  }
}

export default BatterySetupInstructionsThree

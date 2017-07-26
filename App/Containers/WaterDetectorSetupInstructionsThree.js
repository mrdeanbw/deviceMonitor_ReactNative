import React from 'react'
import { Text, View } from 'react-native'
import { Images } from '../Themes'
import { Actions as Nav } from 'react-native-router-flux'
import DeviceSetup from '../Components/DeviceSetup'
import styles from './Styles/SetupInstructionsStyle'
import volumeAlert from '../Lib/VolumeAlert'

class WaterDetectorSetupInstructionsThree extends React.Component {

  render () {
    return (
      <DeviceSetup nextScene={volumeAlert} image={Images.poseidonThree}>
        <Text style={styles.title}>We’re almost ready to go</Text>
        <View style={ styles.column }>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                  <Text>Your phone uses sound to communicate with your device</Text>
                </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text>Turn up your phone volume to its maximum level</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text>Don’t touch or move your phone or device once the sound starts</Text>
              </Text>
            </View>
          </View>
        </View>
      </DeviceSetup>
    )
  }
}

export default WaterDetectorSetupInstructionsThree

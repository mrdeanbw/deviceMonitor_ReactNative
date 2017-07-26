import React from 'react'
import { Linking, Text, View } from 'react-native'
import { Images } from '../Themes'
import { Actions as Nav } from 'react-native-router-flux'
import DeviceSetup from '../Components/DeviceSetup'
import styles from './Styles/SetupInstructionsStyle'
import Chirp from '../Lib/Chirp'

class WaterDetectorSetupInstructionsOne extends React.Component {

  componentDidMount () {
    Chirp.playSilentSound().then(() => null)
  }

  render () {
    return (
      <DeviceSetup nextScene={Nav.waterDetectorSetupInstructionsTwo} image={Images.poseidonOne}>
        <Text style={styles.title}>Start the Setup Process</Text>
        <View style={ styles.column }>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                  <Text>Remove the red tab to power the device</Text>
                </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text>You will hear a beep</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text>The LED next to the Roost logo will blink green</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text>If the LED is not blinking green, <Text style={styles.link} onPress={() => Linking.openURL('https://getroost.zendesk.com/hc/en-us/articles/115001595747')}>see here</Text></Text>
              </Text>
            </View>
          </View>
        </View>
      </DeviceSetup>
    )
  }
}

export default WaterDetectorSetupInstructionsOne

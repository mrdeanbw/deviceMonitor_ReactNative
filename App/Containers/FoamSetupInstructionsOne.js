import React from 'react'
import { Text, View } from 'react-native'
import { Images } from '../Themes'
import { Actions as Nav } from 'react-native-router-flux'
import DeviceSetup from '../Components/DeviceSetup'
import styles from './Styles/SetupInstructionsStyle'
import Chirp from '../Lib/Chirp'

class FoamSetupInstructionsOne extends React.Component {

  componentDidMount () {
    Chirp.playSilentSound().then(() => null)
  }

  render () {
    return (
      <DeviceSetup nextScene={Nav.foamSetupInstructionsTwo} image={Images.foamOne}>
        <Text style={styles.title}>Start the setup process</Text>
        <View style={ styles.column }>
            <View style={ styles.row }>
              <View style={ styles.bullet }>
                <Text>{'\u2022' + " "}</Text>
              </View>
              <View style={ styles.bulletText }>
                <Text>
                    <Text>Remove the battery from its shipping compartment</Text>
                  </Text>
              </View>
            </View>
            <View style={ styles.row }>
              <View style={ styles.bullet }>
                <Text>{'\u2022' + " "}</Text>
              </View>
              <View style={ styles.bulletText }>
                <Text>
                    <Text>Remove the pull tab</Text>
                  </Text>
              </View>
            </View>
            <View style={ styles.row }>
              <View style={ styles.bullet }>
                <Text>{'\u2022' + " "}</Text>
              </View>
              <View style={ styles.bulletText }>
                <Text>
                  <Text>You will hear a single beep</Text>
                </Text>
              </View>
            </View>
            <View style={ styles.row }>
              <View style={ styles.bullet }>
                <Text>{'\u2022' + " "}</Text>
              </View>
              <View style={ styles.bulletText }>
                <Text>
                  <Text>Your battery is ready for set up</Text>
                </Text>
              </View>
            </View>
        </View>
      </DeviceSetup>
    )
  }
}

export default FoamSetupInstructionsOne

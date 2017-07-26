import React from 'react'
import { Linking, Platform, Text, View } from 'react-native'
import { Images } from '../Themes'
import { Actions as Nav } from 'react-native-router-flux'
import DeviceSetup from '../Components/DeviceSetup'
import styles from './Styles/SetupInstructionsStyle'
import volumeAlert from '../Lib/VolumeAlert'

class FoamSetupInstructionsTwo extends React.Component {

  render () {
    return (
      <DeviceSetup nextScene={volumeAlert} image={Images.foamTwo}>
        <Text style={styles.title}>Place your battery in the speaker slot</Text>
        <View style={ styles.column }>
            <View style={ styles.row }>
              <View style={ styles.bullet }>
                <Text>{'\u2022' + " "}</Text>
              </View>
              <View style={ styles.bulletText }>
                <Text>
                    <Text>Place the battery, logo side up, on top of the speaker in foam packaging</Text>
                  </Text>
              </View>
            </View>
            <View style={ styles.row }>
              <View style={ styles.bullet }>
                <Text>{'\u2022' + " "}</Text>
              </View>
              <View style={ styles.bulletText }>
                <Text>
                    <Text>{"Plug the Roost speaker jack into your smartphone" + '\u0027' +"s headset plug"}</Text>
                  </Text>
              </View>
            </View>
            <View style={ styles.row }>
              <View style={ styles.bullet }>
                <Text>{'\u2022' + " "}</Text>
              </View>
              <View style={ styles.bulletText }>
                <Text>
                  <Text>{"Don" + '\u0027' +"t have this plug on your phone? "} <Text style={styles.link} onPress={() => Linking.openURL('https://getroost.zendesk.com/hc/en-us/articles/115006359928')}>See here</Text></Text>
                </Text>
              </View>
            </View>
        </View>
      </DeviceSetup>
    )
  }
}

export default FoamSetupInstructionsTwo

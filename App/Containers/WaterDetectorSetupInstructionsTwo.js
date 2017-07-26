import React from 'react'
import { Text, View, Platform, Linking } from 'react-native'
import { Images } from '../Themes'
import { Actions as Nav } from 'react-native-router-flux'
import DeviceSetup from '../Components/DeviceSetup'
import styles from './Styles/SetupInstructionsStyle'

class WaterDetectorSetupInstructionsTwo extends React.Component {

  render () {
    let instructions
      switch (Platform.OS) {
        case 'ios':
        instructions = (
          <View style={ styles.column }>
              <View style={ styles.row }>
                <View style={ styles.bullet }>
                  <Text>{'\u2022' + " "}</Text>
                </View>
                <View style={ styles.bulletText }>
                  <Text>
                      <Text>Place the device on a solid surface</Text>
                    </Text>
                </View>
              </View>
              <View style={ styles.row }>
                <View style={ styles.bullet }>
                  <Text>{'\u2022' + " "}</Text>
                </View>
                <View style={ styles.bulletText }>
                  <Text>
                    <Text>For best results, remove your phone cover</Text>
                  </Text>
                </View>
              </View>
              <View style={ styles.row }>
                <View style={ styles.bullet }>
                  <Text>{'\u2022' + " "}</Text>
                </View>
                <View style={ styles.bulletText }>
                  <Text>
                    <Text>Place your smartphone speaker, touching the device near the sound holes (see blue arrow)</Text>
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
        )
        break
        case 'android':
        instructions = (
          <View style={ styles.column }>
              <View style={ styles.row }>
                <View style={ styles.bullet }>
                  <Text>{'\u2022' + " "}</Text>
                </View>
                <View style={ styles.bulletText }>
                  <Text>
                      <Text>Place the device on a solid surface</Text>
                    </Text>
                </View>
              </View>
              <View style={ styles.row }>
                <View style={ styles.bullet }>
                  <Text>{'\u2022' + " "}</Text>
                </View>
                <View style={ styles.bulletText }>
                  <Text>
                      <Text>Locate the speaker on your Android phone.<Text style={styles.link} onPress={() => Linking.openURL('https://getroost.zendesk.com/hc/en-us/articles/212185638')}>See here</Text></Text>
                    </Text>
                </View>
              </View>
              <View style={ styles.row }>
                <View style={ styles.bullet }>
                  <Text>{'\u2022' + " "}</Text>
                </View>
                <View style={ styles.bulletText }>
                  <Text>
                    <Text>For best results, remove your phone cover</Text>
                  </Text>
                </View>
              </View>
              <View style={ styles.row }>
                <View style={ styles.bullet }>
                  <Text>{'\u2022' + " "}</Text>
                </View>
                <View style={ styles.bulletText }>
                  <Text>
                    <Text>{"Place your smartphone speaker as close as possible to the device" + '\u0027' +"s sound holes (see blue arrow)."}</Text>
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
        )
      }

    return (
      <DeviceSetup nextScene={Nav.waterDetectorSetupInstructionsThree} image={Images.poseidonTwo}>
        <Text style={styles.title}>Prepare to connect your device to Wi-Fi</Text>
        { instructions }
      </DeviceSetup>
    )
  }
}

export default WaterDetectorSetupInstructionsTwo

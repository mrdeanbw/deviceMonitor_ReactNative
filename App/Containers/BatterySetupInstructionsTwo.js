import React from 'react'
import { Linking, Platform, Text, View } from 'react-native'
import { Images } from '../Themes'
import { Actions as Nav } from 'react-native-router-flux'
import DeviceSetup from '../Components/DeviceSetup'
import styles from './Styles/SetupInstructionsStyle'
import volumeAlert from '../Lib/VolumeAlert'

class BatterySetupInstructionsTwo extends React.Component {

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
                    <Text>Locate the speaker on the bottom of your iPhone</Text>
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
                  <Text>Turn up your phone volume to its maximum level</Text>
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
                  <Text>Turn up your phone volume to its maximum level</Text>
                </Text>
              </View>
            </View>
          </View>
        )
    }

    return (
      <DeviceSetup nextScene={volumeAlert} image={Images.smokeAlarmThree}>
        <Text style={styles.title}>Prepare to connect your battery to Wi-Fi</Text>
        { instructions }
      </DeviceSetup>
    )
  }
}

export default BatterySetupInstructionsTwo

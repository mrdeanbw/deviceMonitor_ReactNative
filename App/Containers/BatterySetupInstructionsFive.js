import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import { Actions as Nav } from 'react-native-router-flux'
import DeviceSetup from '../Components/DeviceSetup'
import styles from './Styles/SetupInstructionsStyle'

class BatterySetupInstructionsFive extends React.Component {

  static propTypes = {
    deviceId: React.PropTypes.string
  }

  render () {
    return (
      <DeviceSetup nextScene={() => Nav.deviceAlarmInfo({ deviceId: this.props.deviceId })} image={Images.smokeAlarmFive}>
        <Text style={styles.title}>Install battery and test</Text>
        <View style={ styles.column }>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                  <Text>Install battery in alarm</Text>
                </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text>Press alarm test button for 10 seconds</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text>Confirm receipt of alarm notification on smartphone</Text>
              </Text>
            </View>
          </View>
        </View>
      </DeviceSetup>
    )
  }
}

const mapStateToProps = (state) => {
  return { deviceId } = state.createDevice
}

export default connect(mapStateToProps)(BatterySetupInstructionsFive)

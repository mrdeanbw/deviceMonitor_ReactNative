import React from 'react'
import { Image, Text, View } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as Nav } from 'react-native-router-flux'
import RoundedButton from '../Components/RoundedButton'
import styles from './Styles/SetupInstructionsStyle'

class WaterDetectorSetupInstructionsFive extends React.Component {

  static propTypes = {
    deviceId: React.PropTypes.string
  }

  render () {
    return (
      <View style={styles.container}>
        <Image resizeMode='cover' style={styles.image} />
        <Text style={styles.text}>Final setup instructions for the water detector</Text>
        <View style={styles.row}>
          <RoundedButton style={styles.button} onPress={() => Nav.alertsSetup({ deviceId: this.props.deviceId })}>Next</RoundedButton>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { deviceId } = state.createDevice
}

export default connect(mapStateToProps)(WaterDetectorSetupInstructionsFive)

import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
import R from 'ramda'

// Styles
import styles from './Styles/DeviceTechnicalInfoScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

class DeviceTechnicalInfoScreen extends React.Component {

  static propTypes = {
    deviceId: React. PropTypes.string,
    firmwareRevision: React.PropTypes.string,
    lastOta: React.PropTypes.shape({
      iso: React.PropTypes.string
    }),
    macAddress: React.PropTypes.string,
    ssid: React.PropTypes.string
  }

  render () {
    const formatDate = (isoString) => I18n.strftime(
      new Date(Date.parse(isoString)),
      '%b %-d %Y'
    )
    const updateDate = this.props.lastOta ? formatDate(this.props.lastOta.iso) : 'N/A'

    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>SSID</Text>
          <Text style={styles.value}>{ this.props.ssid }</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>MAC Address</Text>
          <Text style={styles.value}>{ this.props.macAddress }</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Firmware Version</Text>
          <Text style={styles.value}>{ this.props.firmwareRevision }</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Firmware Update Date</Text>
          <Text style={styles.value}>{ updateDate }</Text>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { deviceId } = ownProps
  const { devices } = state.devices
  const device = R.find(R.propEq('objectId', deviceId), R.flatten(R.values(devices)))
  const { firmwareRevision, lastOta, macAddress, ssid } = device

  return {
    firmwareRevision,
    lastOta,
    macAddress,
    ssid
  }
}

export default connect(mapStateToProps)(DeviceTechnicalInfoScreen)

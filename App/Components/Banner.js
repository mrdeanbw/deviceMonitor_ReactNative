import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/BannerStyle'
import DeviceStatus from '../Lib/DeviceStatus'
import { Actions as NavigationActions } from 'react-native-router-flux'
import R from 'ramda'

const Alert = () => (
  <View style={[styles.container, styles.containerAlert]}>
    <Text style={[styles.bannerText, styles.bannerTextAlert]}>
      Alarm detected
    </Text>
  </View>
)

const Warning = ({addressId,name}) => (
  <TouchableOpacity onPress={() => NavigationActions.warningDetail({
                                                                        addressId: addressId, name: name
                                                                      })}>
  <View style={[styles.container, styles.containerWarning]}>
    <Text style={[styles.bannerText, styles.bannerTextWarning]}>
      Your devices need attention! Tap here
    </Text>
  </View>
  </TouchableOpacity>
)

const OK = () => (
  <View style={[styles.container, styles.containerOk]}>
    <Text style={[styles.bannerText, styles.bannerTextOk]}>
      Everything is fine
    </Text>
  </View>
)

export default class Banner extends React.Component {

  static propTypes = {
    devices: React.PropTypes.array,
  }

  render () {
    const { devices, addressId} = this.props

    const alertingStatuses = [
      DeviceStatus.ALERT, DeviceStatus.WATER_ALERT,
      DeviceStatus.TEMP_ALERT, DeviceStatus.HUMIDITY_ALERT
    ]

    const isAlerting = R.any(
      (device) => alertingStatuses.includes(device.status),
      devices
    )
    if (isAlerting) {
      return <Alert />
    }

    const allOk = R.all(
      (device) => [DeviceStatus.OK, DeviceStatus.RECENT_CHECK_IN].includes(device.status),
      devices
    )
    if (allOk) {
      return <OK />
    }
    return <Warning addressId={this.props.addressId} name={this.props.name} />
  }
}

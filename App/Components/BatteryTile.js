import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import AnimatedAlert from '../Components/AnimatedAlert'
import DeviceStatus from '../Lib/DeviceStatus'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'

import styles from './Styles/BatteryTileStyles'

class BatteryTile extends React.Component {

  static propTypes = {
    batteryPower: React.PropTypes.number,
    event: React.PropTypes.string,
    isAlarmOn: React.PropTypes.bool,
    lastEventTime: React.PropTypes.shape({
      iso: React.PropTypes.string
    }),
    status: React.PropTypes.string,
  }

  static defaultProps = {
    setupIncompleteTimeout: 1800,
    deviceLate: 86400,
    deviceVeryLate: 172800
  }

  getIconName () {
    switch(this.props.status) {
      case DeviceStatus.ALERT:
        return 'iconAlert'
      case DeviceStatus.SNOOZED:
        return 'iconSnooze'
      case DeviceStatus.BATTERY_CRITICAL:
        return 'iconBatteryCritical'
      case DeviceStatus.BATTERY_LOW:
        return 'iconBatteryLow'
      case DeviceStatus.VERY_LATE:
        return 'iconVeryLate'
      case DeviceStatus.LATE:
        return 'iconLate'
      case DeviceStatus.INCOMPLETE:
        return 'iconSetupIncomplete'
      default:
        return 'iconOk'
    }
  }

  getStatusIcon () {
    if (this.props.status === DeviceStatus.ALERT || this.props.status === DeviceStatus.MOTION_ALERT) {
      return <AnimatedAlert/>
    }
    const iconSource = Images[this.getIconName()]
    return <Image source={iconSource} style={styles.batteryStatus} resizeMode='cover'/>
  }

  render () {
    const tileStyles = [
      styles.deviceTile,
      this.props.status === DeviceStatus.ALERT && styles.alarming,
      this.props.status === DeviceStatus.MOTION_ALERT && styles.alarming,
      this.props.status === DeviceStatus.SNOOZED && styles.snoozed,
    ]
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={tileStyles}>
          <Image source={Images.batterySmall} style={styles.batteryIcon} resizeMode='cover'/>
          {this.getStatusIcon()}
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(BatteryTile)

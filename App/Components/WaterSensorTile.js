import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import DeviceStatus from '../Lib/DeviceStatus'
import AnimatedWater from '../Components/AnimatedWater'
import { getTimeString, tempToString } from '../Lib/Utilities'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'

import styles from './Styles/WaterSensorTileStyles'

class WaterSensorTile extends React.Component {

  static propTypes = {
    event: React.PropTypes.string,
    isAlarmOn: React.PropTypes.bool,
    lastEventTime: React.PropTypes.shape({
      iso: React.PropTypes.string
    }),
    lastHum: React.PropTypes.number,
    lastTemp: React.PropTypes.number,
    name: React.PropTypes.string,
    status: React.PropTypes.string,
    tempUnitsFahrenheit: React.PropTypes.bool
  }

  isWaterAlarm () {
    return this.isAlarming() && this.props.event === 'water'
  }

  renderIcon () {
    const iconSource = this.isAlarming() ? Images.leakDetectorUprightWhite : Images.leakDetectorUpright
    const showImage = !(this.isWaterAlarm())
    return showImage && <Image source={iconSource} style={styles.sensorIcon} resizeMode='contain'/>
  }

  renderFirstRow () {
    const showImage = !(this.isWaterAlarm())
    const textStyles = [styles.text, styles.sensorName]
    const rowStyles = [styles.row]
    if (this.isAlarming()) {
      textStyles.push(styles.whiteText)
    }
    if (!showImage) {
      textStyles.push(styles.centerText)
    } else {
      rowStyles.push(styles.withIcon)
    }
    return (
      <View style={rowStyles}>
        <Text style={textStyles} numberOfLines={1}>{this.props.name}</Text>
      </View>
    )
  }

  renderSecondRow () {
    if (this.isWaterAlarm()) {
      return (
        <View style={styles.row}>
          <AnimatedWater />
        </View>
      )
    }

    const shouldShowTempAndHum = [
        DeviceStatus.RECENT_CHECK_IN, DeviceStatus.RECENT_MOTION, DeviceStatus.TEMP_ALERT,
        DeviceStatus.HUMIDITY_ALERT, DeviceStatus.MOTION_ALERT
      ].includes(this.props.status)
    if (shouldShowTempAndHum && (this.props.lastTemp !== undefined && this.props.lastHum !== undefined)) {
      let textStyles = [styles.text, styles.recentText]
      if (this.isAlarming()) {
        textStyles.push(styles.whiteText)
      }
      return (
        <View style={styles.row}>
          <Text style={textStyles}>{tempToString(this.props.lastTemp, this.props.tempUnitsFahrenheit)}</Text>
          <Text style={textStyles}>|</Text>
          <Text style={textStyles}>{this.props.lastHum}%</Text>
        </View>
      )
    }
  }

  renderThirdRow () {
    const lastEventTime = this.props.lastEventTime && this.props.lastEventTime.iso
    if ([DeviceStatus.MOTION_ALERT, DeviceStatus.RECENT_MOTION].includes(this.props.status)) {
      const time = new Date(Date.parse(lastEventTime))
      const timeString = getTimeString(time)
      return (
        <View style={styles.row}>
          <Image source={Images.movingPerson} style={styles.motionIcon} resizeMode='contain' />
          <Text style={styles.text}>{timeString}</Text>
        </View>
      )
    }
  }

  isAlarming () {
    return ([
      DeviceStatus.HUMIDITY_ALERT, DeviceStatus.TEMP_ALERT, DeviceStatus.WATER_ALERT
    ].includes(this.props.status) || this.props.isAlarmOn)
  }

  render () {
    let viewStyles = [styles.deviceTile]
    const isWarning = [
      DeviceStatus.MOTION_ALERT, DeviceStatus.RECENT_MOTION, DeviceStatus.LATE,
      DeviceStatus.VERY_LATE, DeviceStatus.INCOMPLETE,DeviceStatus.BATTERY_CRITICAL,DeviceStatus.BATTERY_LOW
    ].includes(this.props.status)
    if (this.isAlarming()) {
      viewStyles.push(styles.alarming)
    } else if (isWarning) {
      viewStyles.push(styles.warning)
    }
    if ([DeviceStatus.MOTION_ALERT, DeviceStatus.RECENT_MOTION].includes(this.props.status)) {
      viewStyles.push(styles.tall)
    }
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={viewStyles}>
          { this.renderIcon() }
          { this.renderFirstRow() }
          { this.renderSecondRow() }
          { this.renderThirdRow() }
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(WaterSensorTile)

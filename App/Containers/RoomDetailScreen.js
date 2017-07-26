import React from 'react'
import {
  InteractionManager, PermissionsAndroid, Platform, Text, TouchableOpacity,
  Image, ScrollView, View, Alert
} from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Images, Metrics } from '../Themes'
import AddressHeader from '../Containers/AddressHeader'
import AnimatedAlert from '../Components/AnimatedAlert'
import AnimatedWater from '../Components/AnimatedWater'
import NoDevicesMessage from '../Components/NoDevicesMessage'
import RoundedButton from '../Components/RoundedButton'
import { getTimeString, tempToString } from '../Lib/Utilities'
import { sortByStatus } from '../Lib/Device'
import DeviceStatus from '../Lib/DeviceStatus'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'
import { createTypes } from 'reduxsauce'
import R from 'ramda'
import NetworkInfo from 'react-native-network-info'

// Styles
import styles from './Styles/RoomDetailScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

const STATUS = createTypes(`
  CRITICAL
  LOW
  GOOD
`)
const batteryIcons = {
  [STATUS.CRITICAL]: Images.batteryEmpty,
  [STATUS.LOW]: Images.batteryHalf,
  [STATUS.GOOD]: Images.batteryFull,
}
const wifiIcons = {
  [STATUS.CRITICAL]: Images.wifiEmpty,
  [STATUS.LOW]: Images.wifiHalf,
  [STATUS.GOOD]: Images.wifiFull,
}
const statusText = {
  [STATUS.CRITICAL]: 'Critical',
  [STATUS.LOW]: 'Low',
  [STATUS.GOOD]: 'Good',
}


class DeviceDetail extends React.Component {
  static propTypes = {
    batteryPower: React.PropTypes.number,
    deviceType: React.PropTypes.string,
    isAlarmOn: React.PropTypes.bool,
    lastEventTime: React.PropTypes.shape({
      iso: React.PropTypes.string
    }),
    lastHum: React.PropTypes.number,
    lastTemp: React.PropTypes.number,
    name: React.PropTypes.string,
    onPress: React.PropTypes.func.isRequired,
    onSnooze: React.PropTypes.func.isRequired,
    showChevron: React.PropTypes.bool,
    rssi: React.PropTypes.number,
    tempUnitsFahrenheit: React.PropTypes.bool,
  }

  static defaultProps = {
    showChevron: true
  }

  getBatteryStatus () {
    const { batteryPower } = this.props
    if (batteryPower >= 3) {
      return STATUS.CRITICAL
    }
    if (batteryPower === 2) {
      return STATUS.LOW
    }
    return STATUS.GOOD
  }

  getWifiStatus () {
    const { rssi } = this.props
    if (rssi <= 1) {
      return STATUS.CRITICAL
    }
    if (rssi === 2) {
      return STATUS.LOW
    }
    return STATUS.GOOD
  }

  getStatusIcon () {
    const { isAlarmOn, status, deviceType } = this.props
    if (isAlarmOn) {
      if (deviceType && deviceType.toLowerCase() === 'water') {
        return <AnimatedWater />
      }
      return <AnimatedAlert />
    }

    const batteryStatus = this.getBatteryStatus()
    const wifiStatus = this.getWifiStatus()
    if (status === DeviceStatus.SNOOZED) {
      iconSource = Images.iconSnooze
    } else if (batteryStatus === STATUS.CRITICAL) {
      iconSource = Images.iconBatteryCritical
    } else if (status === DeviceStatus.VERY_LATE) {
      iconSource = Images.iconVeryLate
    } else if (batteryStatus === STATUS.LOW) {
      iconSource = Images.iconBatteryLow
    } else if (status === DeviceStatus.LATE) {
      iconSource = Images.iconLate
    } else if (status === DeviceStatus.INCOMPLETE) {
      iconSource = Images.iconSetupIncomplete
    } else {
      iconSource = Images.iconOk
    }

    return <Image style={styles.statusIcon} source={iconSource} resizeMode='contain' />
  }

  getDeviceIcon () {
    const { deviceType } = this.props
    if (deviceType && deviceType.toLowerCase() === 'water') {
      return Images.leakDetectorUpright
    }
    return Images.batterySmall
  }

  getCheckInText () {
    const lastEventTime = new Date(Date.parse(this.props.lastEventTime.iso))
    const aDayAgo = new Date()
    aDayAgo.setDate(aDayAgo.getDate() - 1)
    var monthNames = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"]
    var day = lastEventTime.getDate()
    var monthIndex = lastEventTime.getMonth()
    var time = getTimeString(lastEventTime)
    var checkInText = monthNames[monthIndex] + ' '+ day + ' at ' + time
    return checkInText
  }

  render () {
    const batteryStatus = this.getBatteryStatus()
    const wifiStatus = this.getWifiStatus()
    const batteryIcon = batteryIcons[batteryStatus]
    const batteryText = statusText[batteryStatus]
    const wifiIcon = wifiIcons[wifiStatus]
    const wifiText = statusText[wifiStatus]

    const { lastHum, lastTemp } = this.props
    let lastTempContent = null
    if (lastHum && lastTemp) {
      lastTempContent = (
        <View style={styles.row}>
          <Text style={styles.tempHumText}>
            { tempToString(lastTemp, this.props.tempUnitsFahrenheit) }
          </Text>
          <Text style={[styles.tempHumText, styles.textSeparator]}>
            |
          </Text>
          <Text style={styles.tempHumText}>
            {this.props.lastHum}%
          </Text>
        </View>
      )
    }

    const canSnooze = (this.props.deviceType.toLowerCase() === 'battery' || this.props.deviceType.toLowerCase() === 'pixie') && this.props.isAlarmOn

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.deviceContainer}>
          <View style={[styles.row, styles.topRow]}>
            <View style={styles.row}>
              <Image style={styles.deviceIcon} source={this.getDeviceIcon()} resizeMode='contain' />
              <Text style={[styles.deviceName, styles.text]}>{this.props.name}</Text>
            </View>

            <View style={styles.batteryWifi}>
              <View style={styles.indicator}>
                <Text style={[styles.text, styles.indicatorText]}>{batteryText}</Text>
                <Image style={styles.indicatorIcon} source={batteryIcon} />
              </View>
              <View style={styles.indicator}>
                <Text style={[styles.text, styles.indicatorText]}>Wi-Fi</Text>
                <Image style={styles.indicatorIcon} source={wifiIcon} />
              </View>
            </View>
            { this.props.showChevron && <Image source={Images.arrowForward} style={styles.chevron}/> }
          </View>

          <View style={[styles.row, canSnooze ? styles.spaceBetween : null]}>
            { this.getStatusIcon() }
            { canSnooze ? (
                <View style={styles.snoozeContainer}>
                  <RoundedButton
                    text='Snooze'
                    onPress={this.props.onSnooze}
                    style={styles.snoozeButton}
                    touchableProps={{ delayPressOut: 3000 }}
                  />
                </View>
              ) : (
                <View style={styles.tempAndTime}>
                  <View style={styles.tempContainer}>
                    {lastTempContent}
                  </View>
                  <View style={styles.lastChecked}>
                    <Text style={styles.text}>Last checked: {this.getCheckInText()}</Text>
                  </View>
                </View>
              )
            }
          </View>

        </View>
      </TouchableOpacity>
    )
  }
}

class RoomDetailScreen extends React.Component {

  static propTypes = {
    addressId: React.PropTypes.string,
    devices: React.PropTypes.array,
    error: React.PropTypes.string,
    name: React.PropTypes.string,
    showChevron: React.PropTypes.bool,
    updating: React.PropTypes.bool
  }

  static defaultProps = {
    showChevron: true
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.updating && !nextProps.updating) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      }
    }
  }

  render () {
    let content = R.map(
      (device) => (
        <DeviceDetail
          key={device.objectId}
          onPress={() => NavigationActions.deviceMenu({
            objectId: device.objectId, addressId: this.props.addressId
          })}
          onSnooze={() => this.props.snooze(device.objectId,device.owner.objectId)}
          {...device}
        />
      ),
      this.props.devices
    )
    if (!content.length) {
      NavigationActions.dashboard()
    }
    return (
      <ScrollView style={styles.container}>
        <AddressHeader addressId={this.props.addressId} />
        <View style={styles.hr}/>
        <Text style={styles.roomName}>{ this.props.name }</Text>
        { content }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { devices } = state.devices
  const devicesAtAddress = devices[ownProps.addressId] || []
  const matchingDevices = R.filter(
    device => (device.location === ownProps.name && device.isProvisioned),
    devicesAtAddress
  )
  const { error, updatingDevice } = state.updateDevice

  return {
    devices: sortByStatus(matchingDevices),
    error,
    updating: updatingDevice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    snooze: (deviceId,userId) => {
        InteractionManager.runAfterInteractions(async () => {
            let getLocation = true
            if (Platform.OS === 'android' && Platform.Version >= 23) {
                try {
                    const granted = await PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                    if (!granted) {
                        getLocation = false
                    }
                } catch (err) {
                    getLocation = false
                }
            }
            if (getLocation) {
                NetworkInfo.getBSSID((bssid) => {
//                bssid = "50:6A:03:AA:CE:41"
                    navigator.geolocation.getCurrentPosition((data) => {
                        dispatch(Actions.snoozeDevice(deviceId, userId, bssid, data.coords))
                    }, () => {
                        dispatch(Actions.snoozeDevice(deviceId, userId, bssid, {}))
                    }, { enableHighAccuracy: true })
                })
            }
            else{
                NetworkInfo.getBSSID((bssid) => {
//                    bssid = "50:6A:03:AA:CE:41"
                    dispatch(Actions.snoozeDevice(deviceId, userId, bssid, {}))
                })
            }
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetailScreen)

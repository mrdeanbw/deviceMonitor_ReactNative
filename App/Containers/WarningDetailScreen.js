import React from 'react'
import {
  InteractionManager, PermissionsAndroid, Platform, Text, TouchableOpacity,
  Image, ScrollView, View, Alert, Linking
} from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Images, Metrics } from '../Themes'
import AddressHeader from '../Containers/AddressHeader'
import AnimatedAlert from '../Components/AnimatedAlert'
import AnimatedWater from '../Components/AnimatedWater'
import NoDevicesMessage from '../Components/NoDevicesMessage'
import RoundedButton from '../Components/RoundedButton'
import { sortByStatus } from '../Lib/Device'
import DeviceStatus from '../Lib/DeviceStatus'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'
import { createTypes } from 'reduxsauce'
import R from 'ramda'
import NetworkInfo from 'react-native-network-info'

// Styles
import styles from './Styles/WarningDetailScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

const STATUS = createTypes(`
  CRITICAL
  LOW
  GOOD
  LATE
`)

const statusText = {
  [STATUS.CRITICAL]: 'Critical',
  [STATUS.LOW]: 'Low',
  [STATUS.GOOD]: 'Good',
  [STATUS.LATE]: 'Late',
}

class DeviceDetail extends React.Component {
    static propTypes = {
        batteryPower: React.PropTypes.number,
        deviceType: React.PropTypes.string,
        name: React.PropTypes.string,
        lastEventTime: React.PropTypes.shape({
          iso: React.PropTypes.string
        }),
        location: React.PropTypes.string,
        config: React.PropTypes.object,
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

    getCheckinStatus () {
        const { lastEventTime,config } = this.props
        const incompleteCutoff = new Date()
        incompleteCutoff.setSeconds(incompleteCutoff.getSeconds() - config.setupIncompleteTimeout)
        const lateCutoff = new Date()
        lateCutoff.setSeconds(lateCutoff.getSeconds() - config.deviceLate)
        const veryLateCutoff = new Date()
        veryLateCutoff.setSeconds(veryLateCutoff.getSeconds() - config.deviceVeryLate)
        if(Date.parse(lastEventTime.iso) < incompleteCutoff || Date.parse(device.lastEventTime.iso) < lateCutoff || Date.parse(device.lastEventTime.iso) < veryLateCutoff)
        {
            return STATUS.LATE
        }
        return STATUS.GOOD
    }

    getStatusText () {
        const { status } = this.props
        const batteryStatus = this.getBatteryStatus()
        const checkinStatus = this.getCheckinStatus()
        let statusText =""
        if (status === DeviceStatus.VERY_LATE || status === DeviceStatus.LATE || status === DeviceStatus.INCOMPLETE || checkinStatus === STATUS.LATE) {
            if(batteryStatus === STATUS.LOW){
                statusText = " has not checked in since "+this.getCheckInText()+". It reported low battery level at that time."
            } else if (batteryStatus === STATUS.CRITICAL){
                statusText = " has not checked in since "+this.getCheckInText()+". It reported critical battery level at that time."
            } else {
                statusText = " has not checked in since "+this.getCheckInText()+"."
            }
        } else {
            if (batteryStatus === STATUS.LOW) {
                statusText = " reported low battery level."
            }else if (batteryStatus === STATUS.CRITICAL) {
                statusText = " reported critical battery level."
            }
        }
        return (statusText)
    }

    getUrl () {
        const { status, deviceType  } = this.props
        const batteryStatus = this.getBatteryStatus()
        const checkinStatus = this.getCheckinStatus()
        let theUrl = 'https://getroost.zendesk.com/hc/en-us/'
        if (status === DeviceStatus.VERY_LATE || status === DeviceStatus.LATE || status === DeviceStatus.INCOMPLETE || checkinStatus === STATUS.LATE) {
            if(batteryStatus === STATUS.LOW){
                if (deviceType && deviceType.toLowerCase() === 'water') {
                    theUrl = 'https://getroost.zendesk.com/hc/en-us/articles/115010569748'
                } else {
                    theUrl = 'https://getroost.zendesk.com/hc/en-us/articles/115010405487'
                }
            } else if (batteryStatus === STATUS.CRITICAL){
                if (deviceType && deviceType.toLowerCase() === 'water') {
                    theUrl = 'https://getroost.zendesk.com/hc/en-us/articles/115010406367'
                } else {
                    theUrl = 'https://getroost.zendesk.com/hc/en-us/articles/115010405587'
                }
            } else {
                if (deviceType && deviceType.toLowerCase() === 'water') {
                    theUrl = 'https://getroost.zendesk.com/hc/en-us/articles/115010405687'
                } else {
                    theUrl = 'https://getroost.zendesk.com/hc/en-us/articles/216723138'
                }
            }
        } else {
            if (batteryStatus === STATUS.LOW) {
                if (deviceType && deviceType.toLowerCase() === 'water') {
                    theUrl = 'https://getroost.zendesk.com/hc/en-us/articles/115001623787'
                } else {
                    theUrl = 'https://getroost.zendesk.com/hc/en-us/articles/207748558'
                }
            } else if (batteryStatus === STATUS.CRITICAL) {
                if (deviceType && deviceType.toLowerCase() === 'water') {
                    theUrl = 'https://getroost.zendesk.com/hc/en-us/articles/115010404967'
                } else {
                    theUrl = 'https://getroost.zendesk.com/hc/en-us/articles/115010568088'
                }
            }
        }
        return (
            <View>
                <View style={styles.helpContainer} >
                    <Text style={styles.link} onPress={() => Linking.openURL(theUrl)}>Get help</Text>
                </View>
            </View>
        )
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
        var monthNames = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"]
        var day = lastEventTime.getDate()
        var monthIndex = lastEventTime.getMonth()
        var checkInText = monthNames[monthIndex] + ' '+ day
        return checkInText
    }

    render () {
        const batteryStatus = this.getBatteryStatus()
        return (
            <View style={styles.deviceContainer}>
                <View style={styles.row}>
                    <Text style={[styles.deviceName, styles.text, {flexDirection:'row', flex: 1, flexWrap: 'wrap'}]}>{this.props.location} {this.props.name}{this.getStatusText()}</Text>
                </View>
                <View>
                    { this.getUrl() }
                </View>
            </View>
        )
    }
}

class WarningDetailScreen extends React.Component {

    static propTypes = {
        addressId: React.PropTypes.string,
        devices: React.PropTypes.array,
        error: React.PropTypes.string,
        name: React.PropTypes.string,
        updating: React.PropTypes.bool
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
                    config={this.props.config}
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
                { content }
            </ScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { devices } = state.devices
    const { config } = state
    const devicesAtAddress = devices[ownProps.addressId] || []
    const matchingDevices = R.filter(
        device => (device.isProvisioned && !device.isAlarmOn && device.status !== "OK"),
            devicesAtAddress
        )
    const { error, updatingDevice } = state.updateDevice

    return {
        devices: sortByStatus(matchingDevices),
        config,
        error,
        updating: updatingDevice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarningDetailScreen)

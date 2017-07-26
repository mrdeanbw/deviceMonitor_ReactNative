import React from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Images } from '../Themes'
import AddressHeader from '../Containers/AddressHeader'
import LoadingIndicator from '../Components/LoadingIndicator'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import { createTypes } from 'reduxsauce'
import R from 'ramda'

// Styles
import styles from './Styles/DeviceMenuScreenStyle'

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

class Row extends React.Component {

  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    icon: React.PropTypes.any,
    iconStyle: React.PropTypes.any,
    rowStyle: React.PropTypes.any,
    showChevron: React.PropTypes.bool,
    text: React.PropTypes.string.isRequired,
    textStyle: React.PropTypes.any,

  }

  static defaultProps = {
    showChevron: true
  }

  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.row, this.props.rowStyle]}>
          <View style={styles.textContainer}>
            <Icon name={this.props.icon} style={[styles.icon, this.props.iconStyle]} />
            <Text style={[styles.rowText, this.props.textStyle]}>{this.props.text}</Text>
          </View>
          { this.props.showChevron && <Image source={Images.arrowForward} style={styles.chevron}/> }
        </View>
      </TouchableOpacity>
    )
  }
}

class DeviceMenuScreen extends React.Component {

  static propTypes = {
    addressId: React.PropTypes.string.isRequired,
    deleteDevice: React.PropTypes.func.isRequired,
    error: React.PropTypes.string,
    objectId: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool,
    location: React.PropTypes.string,
    name: React.PropTypes.string,
    batteryPower: React.PropTypes.number,
    rssi: React.PropTypes.number,
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loading && !nextProps.loading) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      } else {
        NavigationActions.pop()
      }
    }
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

  handleActivity () {
    NavigationActions.deviceActivity({ deviceId: this.props.objectId })
  }

  handleAlarmInfo () {
    NavigationActions.editAlarmInfo({ deviceId: this.props.objectId })
  }

  handleAlertSettings () {
    NavigationActions.editAlerts({ deviceId: this.props.objectId })
  }

  handleChangeLocation () {
    NavigationActions.editDeviceLocation({ deviceId: this.props.objectId, addressId: this.props.addressId })
  }

  handleTechnicalInfo () {
    NavigationActions.deviceTechnicalInfo({ deviceId: this.props.objectId })
  }

  handleDelete () {
    Alert.alert(
      'Delete device?',
      'Are you sure you want to delete this device? This action cannot be undone',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Delete', onPress: this.props.deleteDevice, style: 'destructive' }
      ]
    )
  }

  render () {
    if (this.props.loading) {
      return <LoadingIndicator />
    }
    const batteryStatus = this.getBatteryStatus()
    const wifiStatus = this.getWifiStatus()
    const batteryIcon = batteryIcons[batteryStatus]
    const batteryText = statusText[batteryStatus]
    const wifiIcon = wifiIcons[wifiStatus]
    const isWaterDevice = this.props.deviceType && this.props.deviceType.toLowerCase() === 'water'
    const renderIfEditable = (component) => this.props.editable ? component : null
    return (
      <View style={styles.container}>
        <AddressHeader addressId={this.props.addressId} />
        <View style={styles.hr}/>

        <View style={[styles.detailRow, styles.topRow]}>
            <View style={styles.detailRow}>
                <Text style={styles.deviceName}>{this.props.location}, {this.props.name}</Text>
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
        </View>


        <View style={styles.buttonList}>
          <Row
            text='Activity'
            icon='ios-trending-up-outline'
            onPress={this.handleActivity.bind(this)}
          />
          { !isWaterDevice &&
            renderIfEditable(<Row
              text='Alarm Information'
              icon='ios-information-circle-outline'
              onPress={this.handleAlarmInfo.bind(this)}
              />)
          }
          { renderIfEditable(<Row
              text='Change Location & Name'
              icon='ios-pin-outline'
              onPress={this.handleChangeLocation.bind(this)}
            />) }
          <Row
            text='Technical Information'
            icon='ios-build-outline'
            onPress={this.handleTechnicalInfo.bind(this)}
          />
          { isWaterDevice &&
            renderIfEditable(<Row
              text='Alert Settings'
              icon='ios-alert-outline'
              onPress={this.handleAlertSettings.bind(this)}
              />)
          }
          { renderIfEditable(<Row
              text='Delete'
              icon={'ios-trash-outline'}
              iconStyle={styles.delete}
              rowStyle={styles.deleteRow}
              showChevron={false}
              textStyle={styles.delete}
              onPress={this.handleDelete.bind(this)}
            />) }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { addressId, objectId } = ownProps
  const { devices } = state.devices
  const device = R.find(R.propEq('objectId', objectId), devices[addressId] || [])

  const { addresses } = state.addresses
  const address = R.find(R.propEq('objectId', addressId), addresses)

  const { deleting, error } = state.deleteDevice

  return {
    ...device,
    editable: address.isOwner,
    loading: deleting,
    error,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteDevice: () => dispatch(Actions.deleteDevice(ownProps.objectId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceMenuScreen)

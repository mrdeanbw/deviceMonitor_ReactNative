import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View, Alert, AppState, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Colors, Images, Metrics } from '../Themes'
import AddressHeader from '../Containers/AddressHeader'
import LoadingIndicator from '../Components/LoadingIndicator'
import Banner from '../Components/Banner'
import BatteryTile from '../Components/BatteryTile'
import NoDevicesMessage from '../Components/NoDevicesMessage'
import Pagination from '../Components/Pagination'
import WaterSensorTile from '../Components/WaterSensorTile'
import DeviceStatus from '../Lib/DeviceStatus'
import { sortByStatus } from '../Lib/Device'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import R from 'ramda'
import PushNotification from 'react-native-push-notification'

// Styles
import styles from './Styles/DashboardScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

class Device extends React.Component {
  static propTypes = {
    deviceType: React.PropTypes.oneOf(['Battery', 'Pixie','Water','battery','pixie','water'])
  }

  render () {
    if (!this.props.deviceType) {
      return null
    }

    if (this.props.deviceType.toLowerCase() === 'battery' || this.props.deviceType.toLowerCase() === 'pixie') {
      return <BatteryTile {...this.props}/>
    } else if (this.props.deviceType.toLowerCase() === 'water') {
      return <WaterSensorTile {...this.props}/>
    }

    // Unknown device type
    return null
  }
}

class Room extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    devices: React.PropTypes.array
  }

  constructor (props) {
    super(props)

    this.state = {
      showLeftArrow: false,
      showRightArrow: props.devices.length >= 0
    }
  }

  handleScroll = (event) => {
    if (this.props.devices.length >= 3) {
      const totalSize = event.nativeEvent.contentSize.width
      const offset = event.nativeEvent.contentOffset.x
      const displayWidth = event.nativeEvent.layoutMeasurement.width
      const showRightArrow = !(displayWidth + offset >= totalSize)
      const showLeftArrow = offset > 0
      this.setState({ showRightArrow, showLeftArrow })
    }
  }


  render () {
    const navigateToRoomDetails = () => NavigationActions.roomDetail({
      addressId: this.props.addressId, name: this.props.name
    })
    const deviceTiles = R.map(
      (device) => (<Device key={device.objectId} onPress={navigateToRoomDetails} {...device}/>),
      this.props.devices
    )
    if (!deviceTiles.length) {
      return null;
    }

    // If the recent motion is shown in the tile, the tiles are a bit taller and
    // we need to make the arrows taller as well.
    const arrowStyle = [styles.arrow]
    const showMotionDevices = R.filter(
      device => [DeviceStatus.MOTION_ALERT, DeviceStatus.RECENT_MOTION].includes(device.status),
      this.props.devices
    )
    if (showMotionDevices.length) {
      arrowStyle.push([styles.tallArrow])
    }



    return (
      <TouchableOpacity onPress={navigateToRoomDetails}>
        <View style={styles.roomContainer}>
          <Text style={styles.roomName}>{ this.props.name }</Text>
          <View style={{flexDirection: 'row'}}>
            <ScrollView
              style={styles.devicesContainer}
              horizontal={true}
              onScroll={this.handleScroll}
              scrollEventThrottle={1}
            >
              { deviceTiles }
            </ScrollView>
              { this.state.showLeftArrow && <Image source={Images.arrowBack} resizeMode='contain' style={[...arrowStyle, styles.leftArrow]}/>}
              { this.state.showRightArrow && <Image source={Images.arrowForward} resizeMode='contain' style={[...arrowStyle, styles.rightArrow]}/>}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class MonitorTile extends React.Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.monitorTile}>
          <Text numberOfLines={1} style={styles.monitorName}>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class MonitorList extends React.Component {

  static propTypes = {
    addressId: React.PropTypes.string,
    monitors: React.PropTypes.array,
  }

  render () {
    let monitors = []

    const viewMonitors = () => NavigationActions.monitors({ addressId: this.props.addressId })
    for (const monitor of this.props.monitors) {
      monitors.push(<MonitorTile key={monitor.invitee} name={monitor.firstName || monitor.invitee} onPress={viewMonitors} />)
    }

    return (
      <TouchableOpacity onPress={viewMonitors}>
        <View style={styles.roomContainer}>
          <Text style={styles.roomName}>Monitors</Text>
          <View style={{flexDirection: 'row'}}>
            <ScrollView
              style={[styles.devicesContainer, styles.monitorsContainer]}
              horizontal={true}
            >
              { monitors }
            </ScrollView>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class Owner extends React.Component {

  static propTypes = {
    owner: React.PropTypes.shape({
      phoneNumber: React.PropTypes.string,
    })
  }

  render () {
    return (
      <View style={styles.roomContainer}>

      </View>
    )
  }
}

class Address extends React.Component {

  static propTypes = {
    objectId: React.PropTypes.string,
    devices: React.PropTypes.array,
    isOwner: React.PropTypes.bool,
    enableEditAddress: React.PropTypes.bool,
    monitors: React.PropTypes.array,
    owner: React.PropTypes.object,
  }

  render () {
    const { devices = [] } = this.props
    const devicesByRoom = R.groupBy(device => device.location)(devices)
    const sortedDevices = sortByStatus(devices)
    const sortedRooms = R.pluck('location', R.uniqBy(R.prop('location'), sortedDevices))

    const rooms = R.map(
      (room) => <Room key={room} name={room} devices={sortByStatus(devicesByRoom[room])} addressId={this.props.objectId} />,
      sortedRooms
    )
    const content = devices.length > 0 ? rooms : [
      <View key={'hr'} style={styles.hr} />,
      <NoDevicesMessage key={'noDevices'} showPromo={this.props.isOwner} onPress={() => NavigationActions.newItem({ addressId: this.props.objectId })}/>
    ]
    if (this.props.monitors && this.props.monitors.length) {
      content.push(<MonitorList key={'monitorList'} monitors={this.props.monitors} addressId={this.props.objectId} />)
    } else if (this.props.isOwner) {
      content.push(<View key={'padding'} style={styles.noMonitorsBottomPadding} />)
    }
    if (!this.props.isOwner) {
      content.push(<Owner key={'owner'} owner={this.props.owner} />)
    }
    return (
      <View style={styles.addressContainer}>
        <AddressHeader addressId={this.props.objectId} enableEditAddress = {true} ownerNumber = {this.props.owner.phoneNumber}/>
        <Pagination total={this.props.numPages} index={this.props.index} />
        { devices.length > 0 && <Banner devices={this.props.devices} addressId={this.props.objectId}/> }
        { content }
      </View>
    )
  }
}

class DashboardScreen extends React.Component {

  static propTypes = {
    loading: React.PropTypes.bool,
    initialAddress: React.PropTypes.string,
    initialIndex: React.PropTypes.number,
    addresses: React.PropTypes.array,
    devices: React.PropTypes.object,
    monitors: React.PropTypes.object,
    currentAppState: React.PropTypes.string,
  }

  static defaultProps = {
    addresses: []
  }

  constructor () {
    super()
    this.state = { index: 0 , currentAppState:'active' }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    currState = { appState: AppState.currentState}
    this.setState({currentAppState : currState.appState, popupClicked:false})
    this.props.fetchAddresses()
    this.updateOnRight()
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  componentWillReceiveProps (nextProps) {
    let alertDevices =[]
    if (nextProps.error === 'There is no internet access. Please check the connectivity' || nextProps.error === 'NETWORK_ERROR') {
      Alert.alert('Error', 'There is no internet access. Please check the connectivity',
      )
    }else {
      if (this.state.currentAppState === 'active'){
        this.props.stopNotificationAlarm()
        PushNotification.cancelAllLocalNotifications()
      }
      const { addresses, devices } = this.props
      this.props.addresses.forEach((address, index) => {
        alertDevices = R.filter(
          device => [DeviceStatus.ALERT, DeviceStatus.WATER_ALERT].includes(device.status),devices[address.objectId] || [])
          if (alertDevices.length && !this.state.popupClicked){
//            Alert.alert(
//              'Alert',
//              'Roost detected a possible alert at '+address.address,
//              [
//                {text: 'OK', onPress: () => this.props.stopNotificationAlarm()},
//              ]
//              )
//            this.props.playNotificationAlarm()
            this.setState({currentAppState : 'done',popupClicked:true})
            alertDevices =[]
          } else {
            this.setState({currentAppState : 'done'})
          }
      })

      if (nextProps.onRight !== this.onRight) {
          this.updateOnRight()
      }

      if (nextProps.initialIndex) {
          this.setState({ index: nextProps.initialIndex })
          NavigationActions.refresh({ initialAddress: null })
      } else {
          this.setState({ index: this.swiper ? this.swiper.state.index : this.state.index })
      }
    }
  }

  updateOnRight () {
    NavigationActions.refresh({
      onRight: this.onRight
    })
  }

  onRight = () => {
    const displayedAddress = this.props.addresses[this.swiper.state.index]
    NavigationActions.newItem({ addressId: displayedAddress.objectId })
  }

  render () {
    if (this.props.loading) {
      return <LoadingIndicator />
    }

    if (!this.props.addresses.length) {
      return (
        <ScrollView style={styles.container}>
            <View style={styles.addressContainer}>
                <NoDevicesMessage key={'noDevices'} showPromo={this.props.isOwner} onPress={this.props.onPress}/>
            </View>
            <LoadingIndicator />
        </ScrollView>
      )
    }

    let addressComponents = []
    const { devices } = this.props



    this.props.addresses.forEach((address, index) => {
      const provisionedDevices = R.filter(device => device.isProvisioned, devices[address.objectId] || [])
      const monitors = this.props.monitors[address.objectId] || []
      addressComponents.push(
        <ScrollView key={address.objectId} style={styles.container}>
          <Address {...address} devices={provisionedDevices} monitors={monitors} index={index} numPages={this.props.addresses.length} />
        </ScrollView>
      )
    })



    return (
      <Swiper
        style={styles.wrapper}
        loop={true}
        ref={(swiper) => this.swiper = swiper}
        showsPagination={false}
        index={this.props.initialIndex || this.state.index}>
        {addressComponents}
      </Swiper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { addresses, fetching, error } = state.addresses
  const { devices } = state.devices
  const { monitors } = state.monitors

  let initialIndex
  if (ownProps.initialAddress) {
    initialIndex = R.findIndex(R.propEq('objectId', ownProps.initialAddress), addresses)
    if (initialIndex < 0) {
      initialIndex = 0
    }
  }

  return {
    addresses,
    devices,
    initialIndex,
    loading: fetching,
    monitors,
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAddresses: () => dispatch(Actions.fetchAddresses()),
    playNotificationAlarm: () => dispatch(Actions.playNotificationAlarm()),
    stopNotificationAlarm: () => dispatch(Actions.stopNotificationAlarm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)

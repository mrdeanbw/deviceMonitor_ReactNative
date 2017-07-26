import React, {PropTypes} from 'react'
import {
  InteractionManager, PermissionsAndroid, Platform, Text, TouchableOpacity,
  Image, ScrollView, View, Alert
} from 'react-native'
import styles from './Styles/NewItemScreenStyle'
import { Colors, Images } from '../Themes'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import R from 'ramda'

const Row = ({ onPress, image, text }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.row}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} resizeMode='contain' />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  </TouchableOpacity>
)

class NewItemScreen extends React.Component {

  static propTypes = {
    addressId: React.PropTypes.string,
    addressIsEditable: React.PropTypes.bool,
    onAddressSelect: React.PropTypes.func.isRequired,
    onDeviceSelect: React.PropTypes.func.isRequired
  }

  getGeoLocation () {
    InteractionManager.runAfterInteractions(async () => {
      let getLocation = true
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        try {
          const granted = await PermissionsAndroid.requestPermission(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Enable location',
              'message': 'Your location is used when adding new devices',
            },
          );

          if (!granted) {
            getLocation = false
          }
        } catch (err) {
          getLocation = false
        }
      }
      if (getLocation) {
        navigator.geolocation.getCurrentPosition(
          this.geoSuccess.bind(this),
          this.geoError,
          { enableHighAccuracy: true }
        )
      }
    })
  }

  geoSuccess (data) {
    this.props.setLatLong(data.coords)
  }

  geoError () {}

  componentDidMount () {
    this.props.resetProvisionState()
    this.getGeoLocation()
  }

  onLeakDetectorSelect () {
//    if (this.props.leakDetectorAvailable) {
      this.props.onDeviceSelect('Water')
//    } else {
//      Alert.alert('Coming Soon')
//    }
  }

  onAddressSelect () {
    const MAX_ADDRESSES = 6
    if (this.props.numOwnedAddresses >= MAX_ADDRESSES) {
      Alert.alert('Cannot Add Address', `This app supports up to ${MAX_ADDRESSES} addresses.`)
    } else {
      this.props.onAddressSelect()
    }
  }

  render () {
    const renderIfEditable = (component) => this.props.addressIsEditable ? component : null
    return (
      <ScrollView style={styles.container}>
        { renderIfEditable(<Row onPress={() => this.props.onDeviceSelect('Battery')} image={Images.battery} text='Smart battery' />) }
        { renderIfEditable(<Row onPress={this.onLeakDetectorSelect.bind(this)} image={Images.leakDetector} text='Smart leak detector' />) }
        <Row onPress={this.onAddressSelect.bind(this)} image={Images.address} text='Address' />
        { renderIfEditable(<Row onPress={this.props.onMonitorSelect} image={Images.monitor} text='Monitor' />) }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { addresses } = state.addresses
  const address = R.find(R.propEq('objectId', ownProps.addressId), addresses)
  const { leakDetectorAvailable } = state.config
  return {
    addressIsEditable: address.isOwner,
    leakDetectorAvailable,
    numOwnedAddresses: R.filter(R.prop('isOwner'), addresses).length
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetProvisionState: () => {
      dispatch(Actions.resetProvisionState())
    },
    onAddressSelect: () => {
      NavigationActions.addAddress()
    },
    onDeviceSelect: (deviceType) => {
      dispatch(Actions.selectDeviceAddress(ownProps.addressId))
      dispatch(Actions.selectDeviceType(deviceType))
      NavigationActions.deviceLocation()
    },
    onMonitorSelect: () => {
      NavigationActions.addMonitor({ addressId: ownProps.addressId })
    },
    setLatLong: ({ latitude, longitude }) => {
      dispatch(Actions.setLatLong(latitude, longitude))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItemScreen)

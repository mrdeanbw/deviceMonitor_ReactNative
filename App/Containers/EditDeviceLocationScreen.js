import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import DeviceLocation from '../Components/DeviceLocation'
import R from 'ramda'

// Styles
import styles from './Styles/DeviceLocationScreenStyle'

class DeviceLocationScreen extends React.Component {

  static propTypes = {
    deviceId: React.PropTypes.string.isRequired,
    deviceType: React.PropTypes.string,
    onLocationSelect: React.PropTypes.func.isRequired
  }

  onLocationSelect (location) {
    this.props.onLocationSelect(location)
  }

  render () {
    return (
      <DeviceLocation
        deviceType={this.props.deviceType}
        onCustomLocation={this.props.onCustomLocation}
        onLocationSelect={this.onLocationSelect.bind(this)} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { addressId, deviceId } = ownProps
  const { devices } = state.devices
  const device = R.find(R.propEq('objectId', deviceId), devices[addressId] || [])
  return { ...device }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { deviceId } = ownProps

  return {
    onCustomLocation: () => NavigationActions.editCustomLocation({ deviceId }),
    onLocationSelect: (location) => {
      dispatch(Actions.selectDeviceLocation(location))
      NavigationActions.editDeviceName({ deviceId, selectedLocation: location })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceLocationScreen)


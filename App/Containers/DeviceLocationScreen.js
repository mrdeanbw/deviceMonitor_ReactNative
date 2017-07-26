import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import DeviceLocation from '../Components/DeviceLocation'
// Styles
import styles from './Styles/DeviceLocationScreenStyle'

class DeviceLocationScreen extends React.Component {

  static propTypes = {
    deviceType: React.PropTypes.string,
    onLocationSelect: React.PropTypes.func.isRequired
  }

  onLocationSelect (location) {
    this.props.onLocationSelect(location, this.props.deviceType)
  }

  render () {
    return (
      <DeviceLocation
        deviceType={this.props.deviceType}
        onLocationSelect={this.onLocationSelect.bind(this)}
        onCustomLocation={NavigationActions.deviceCustomLocation} />
    )
  }
}

const mapStateToProps = (state) => {
  return { deviceType } = state.createDevice
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLocationSelect: (location, deviceType) => {
      dispatch(Actions.selectDeviceLocation(location))
      if (deviceType == 'Water') {
        NavigationActions.deviceName()
        return
      }
      NavigationActions.deviceWifiInfo()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceLocationScreen)

import React from 'react'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CustomLocation from '../Components/CustomLocation'

import styles from './Styles/DeviceCustomLocationScreenStyle'

class DeviceCustomLocationScreen extends React.Component {

  static propTypes = {
    deviceType: React.PropTypes.string,
    onLocationSelect: React.PropTypes.func.isRequired,
  }

  onContinue (location) {
    this.props.onLocationSelect(location, this.props.deviceType)
  }

  render () {
    return (
      <CustomLocation onContinue={this.onContinue.bind(this)} />
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
        NavigationActions.deviceCustomName()
        return
      }
      NavigationActions.deviceWifiInfo()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceCustomLocationScreen)

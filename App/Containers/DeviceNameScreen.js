import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import DeviceName from '../Components/DeviceName'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/DeviceNameScreenStyle'

class DeviceNameScreen extends React.Component {

  static propTypes = {
    location: React.PropTypes.string,
    onNameSelect: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <DeviceName deviceType={this.props.deviceType} location={this.props.location} onNameSelect={this.props.onNameSelect}/>
    )
  }
}

const mapStateToProps = (state) => {
  return { deviceType, location } = state.createDevice
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameSelect: (name) => {
      dispatch(Actions.selectDeviceName(name))
      NavigationActions.deviceWifiInfo()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceNameScreen)

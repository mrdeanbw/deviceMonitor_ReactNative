import React from 'react'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CustomName from '../Components/CustomName'

import styles from './Styles/DeviceCustomNameScreenStyle'

class DeviceCustomNameScreen extends React.Component {

  static propTypes = {
    onContinue: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <CustomName onContinue={this.props.onContinue} />
    )
  }
}

const mapStateToProps = (state) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onContinue: (name) => {
      dispatch(Actions.selectDeviceName(name))
      NavigationActions.deviceWifiInfo()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceCustomNameScreen)

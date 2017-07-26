import React from 'react'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CustomLocation from '../Components/CustomLocation'

import styles from './Styles/EditCustomLocationScreenStyle'

class EditCustomLocationScreen extends React.Component {

  static propTypes = {
    deviceId: React.PropTypes.string.isRequired,
    onLocationSelect: React.PropTypes.func.isRequired,
  }

  onContinue (location) {
    this.props.onLocationSelect(location)
  }

  render () {
    return (
      <CustomLocation onContinue={this.onContinue.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { deviceId } = ownProps
  return {
    onLocationSelect: (location) => {
      NavigationActions.editDeviceName({ deviceId, selectedLocation: location })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomLocationScreen)


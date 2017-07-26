import React from 'react'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CustomName from '../Components/CustomName'
import LoadingIndicator from '../Components/LoadingIndicator'
import R from 'ramda'
import { Alert} from 'react-native'

import styles from './Styles/EditDeviceNameScreenStyle'

class EditDeviceNameScreen extends React.Component {

  static propTypes = {
    deviceId: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    initialName: React.PropTypes.string,
    loading: React.PropTypes.bool,
    onContinue: React.PropTypes.func.isRequired,
    selectedLocation: React.PropTypes.string
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loading && !nextProps.loading) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      } else {
        NavigationActions.popTo('deviceMenu')
      }
    }
  }

  render () {
    if (this.props.loading) {
      return <LoadingIndicator />
    }
    return (
      <CustomName initialName={this.props.initialName} onContinue={this.props.onContinue} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { error, updatingDevice } = state.updateDevice
  const { deviceId } = ownProps
  const { devices } = state.devices
  const device = R.find(R.propEq('objectId', deviceId), R.flatten(R.values(devices)))
  const { name } = device

  return {
    error,
    loading: updatingDevice,
    initialName: name
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { deviceId, selectedLocation } = ownProps
  return {
    onContinue: (name) => {
      dispatch(Actions.updateDevice(deviceId, { location: selectedLocation, name }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeviceNameScreen)


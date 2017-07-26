import React from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import AddressForm from '../Components/AddressForm'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'
import R from 'ramda'

// Styles
import styles from './Styles/AddAddressScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

class AddAddressScreen extends React.Component {

  static propTypes = {
    createdAddressId: React.PropTypes.string,
    error: React.PropTypes.string,
    saving: React.PropTypes.bool,
    phoneNumber: React.PropTypes.string,
  }

  componentDidMount () {
    NavigationActions.refresh({
      rightTitle: 'Save',
      onRight: this.saveAddress,
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.saving && !nextProps.saving) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      } else {
        NavigationActions.loggedInContent({
          initialAddress: nextProps.createdAddressId
        })
      }
    }
  }

  saveAddress = () => {
    const fields = this.addressForm.state
    const {phoneNumber} = this.props
    fields['phoneNumber'] = phoneNumber
    if (!fields.address) {
      Alert.alert('', 'You must enter a nickname')
    } else {
      this.props.saveAddress(fields)
    }
  }

  render () {
    return (
      <AddressForm
        ref={(obj) => this.addressForm = obj}
        loading={this.props.saving}
        saveAddress={this.props.saveAddress} />
    )
  }
}

const mapStateToProps = (state) => {
    const { createdAddressId, error, saving } = state.saveAddress
    const { phoneNumber } = state.user
    return { createdAddressId, error, saving,phoneNumber }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAddress: (fields) => dispatch(Actions.createAddress(fields))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressScreen)

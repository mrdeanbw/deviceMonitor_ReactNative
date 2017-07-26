import React from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import AddressForm from '../Components/AddressForm'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'
import R from 'ramda'

// Styles
import styles from './Styles/EditAddressScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

class EditAddressScreen extends React.Component {

  static propTypes = {
    addressId: React.PropTypes.string,
    address: React.PropTypes.shape({
      address: React.PropTypes.string,
      city: React.PropTypes.string,
      country: React.PropTypes.string,
      emergencyName: React.PropTypes.string,
      emergencyNumber: React.PropTypes.string,
      state: React.PropTypes.string,
      zipCode: React.PropTypes.string,
    }),
    deletable: React.PropTypes.bool,
    editable: React.PropTypes.bool,
    saving: React.PropTypes.bool,
    error: React.PropTypes.string
  }

  constructor () {
    super()

    this.state = {
      deleting: false
    }
  }

  componentDidMount () {
    if (this.props.editable) {
      NavigationActions.refresh({
        rightTitle: 'Save',
        onRight: () => this.saveAddress(this.addressForm.state)
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.saving && !nextProps.saving) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      } else {
        if (this.state.deleting) {
          NavigationActions.dashboard({ type: 'reset' })
        } else {
          NavigationActions.pop()
        }
      }
    }
  }

  deleteAddress = () => {
    Alert.alert(
      'Delete Address?',
      'Are you sure you want to delete this address and all devices associated with it? This action cannot be undone',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'Delete', style: 'destructive', onPress: () => {
          this.setState({ deleting: true })
          this.props.deleteAddress()
        } },
      ]
    )
  }

  saveAddress = (fields) => {
    if (!fields.address) {
      Alert.alert('', 'You must enter a label')
    } else {
      this.props.saveAddress(fields)
    }
  }

  render () {
    return (
      <AddressForm
        ref={(obj) => this.addressForm = obj}
        address={this.props.address}
        editable={this.props.editable}
        loading={this.props.saving}
        onDelete={this.props.deletable ? this.deleteAddress : null}
        saveAddress={this.saveAddress} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { addresses } = state.addresses
  const { error, saving } = state.saveAddress
  const ownerAddresses = addresses || [] 
  const matchingAddresses = R.filter( 
    address => (address.isOwner === true), 
    ownerAddresses 
  )
  return {
    address: R.find(R.propEq('objectId', ownProps.addressId))(addresses),
    deletable: matchingAddresses.length > 1,
//    deletable: addresses.length > 1,
    error,
    saving
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteAddress: () => dispatch(Actions.deleteAddress(ownProps.addressId)),
    saveAddress: (updates) => dispatch(Actions.saveAddress(ownProps.addressId, updates)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAddressScreen)

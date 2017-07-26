import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { Colors, Metrics, Images } from '../Themes'
import styles from './Styles/AddressHeaderStyle'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions as NavigationActions } from 'react-native-router-flux'
import R from 'ramda'

export class AddressHeader extends React.Component {

  static propTypes = {
    address: React.PropTypes.string,
    addressId: React.PropTypes.string,
    editable: React.PropTypes.bool,
    ownerNumber: React.PropTypes.string,
    enableEditAddress: React.PropTypes.bool,
    contacts: React.PropTypes.array,
  }

  static defaultProps = {
      enableEditAddress: false
    }

    getOwner(){
        const { contacts,countryCode } = this.props
        let owner = this.props.ownerNumber
        for(const contact of contacts){
            for(const number of contact.phoneNumbers){
                if(owner.includes(number['number'])){
                    owner = contact['firstName'] + ' ' + contact['lastName']
                    return owner
                }
            }
        }
        return owner
    }

  render () {
    const { addressId, editable, enableEditAddress } = this.props
    if(enableEditAddress){
        return (
          <View style={styles.addressContainer}>
            <View style={styles.streetAddressContainer}>
              <Text style={styles.streetAddress} numberOfLines={1}>{editable ? this.props.address : this.getOwner() + ', ' + this.props.address }</Text>
            </View>
            <View style={styles.editIcon}>
              <TouchableOpacity onPress={() => NavigationActions.editAddress({ addressId, editable })}>
                <Icon name={ editable ? 'md-create' : 'ios-pin' } size={Metrics.icons.small} color={Colors.blue} />
              </TouchableOpacity>
            </View>
          </View>
        )
    }

    return (
      <View style={styles.addressContainer}>
        <View style={styles.streetAddressContainer}>
          <Text style={styles.streetAddress} numberOfLines={1}>{this.props.address}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { addresses } = state.addresses
  const address = R.find(R.propEq('objectId', ownProps.addressId), addresses)
  const { contacts } = state.contacts
  return {
    address: address.address,
    editable: address.isOwner,
    contacts,
  }
}

export default connect(mapStateToProps)(AddressHeader)

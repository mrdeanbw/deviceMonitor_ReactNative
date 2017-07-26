import React from 'react'
import { Text, View } from 'react-native'
import TextInput from '../Components/TextInput'
import TouchableRow from '../Components/TouchableRow'
import styles from './Styles/PhoneNumberStyle'

export default class PhoneNumber extends React.Component {

  static propTypes = {
    country: React.PropTypes.shape({
      name: React.PropTypes.string,
      code: React.PropTypes.number
    }),
    onPressCountry: React.PropTypes.func.isRequired,
    phoneNumber: React.PropTypes.string,
    onChangePhoneNumber: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <View>
        <View style={styles.row}>
          <TouchableRow
            onPress={this.props.onPressCountry}
            text={this.props.country.name}
            textStyle={styles.countryTextStyle}
            icon='ios-arrow-forward'
            iconStyle={styles.icon}
            style={[styles.item, styles.countrySelect]}
          />
        </View>
        <View style={styles.row}>
          <View style={[styles.borderRight, styles.item]}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCode}>+{this.props.country.code}</Text>
            </View>
          </View>
          <TextInput
            onChange={this.props.onChangePhoneNumber}
            keyboardType='phone-pad'
            placeholder='Phone Number'
            style={[styles.phoneNumber, styles.item]}
            value={this.props.phoneNumber}
          />
        </View>
      </View>
    )
  }
}

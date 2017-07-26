import React from 'react'
import { Alert, Linking, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import TouchableRow from '../Components/TouchableRow'
import LoadingIndicator from '../Components/LoadingIndicator'
import { Actions as NavigationActions } from 'react-native-router-flux'
import PlainButton from '../Components/PlainButton'
import PhoneNumber from '../Components/PhoneNumber'
import TextInput from '../Components/TextInput'
import { sanitizePhoneNumber } from '../Lib/Utilities'

// Styles
import styles from './Styles/EnterPhoneNumberStyle'

class EnterPhoneNumber extends React.Component {

  static propTypes = {
    country: React.PropTypes.shape({
      name: React.PropTypes.string,
      code: React.PropTypes.number
    }),
    error: React.PropTypes.string,
    loading: React.PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loading && !nextProps.loading) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      } else {
        NavigationActions.verifyPhoneNumber()
      }
    }
  }

  updatePhoneNumber (event) {
    this.setState({
      phoneNumber: event.nativeEvent.text
    })
  }

  render () {
    if (this.props.loading) {
      return <LoadingIndicator />
    }

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={true}>
        <PhoneNumber
          country={this.props.country}
          onPressCountry={NavigationActions.selectCountry}
          phoneNumber={this.state.phoneNumber}
          onChangePhoneNumber={this.updatePhoneNumber.bind(this)}
        />
        <View style={styles.conditionsContainer}>
          <Text style={styles.conditions} numberOfLines={2}>
            By clicking Continue, you agree to the Roost
            <Text onPress={() => Linking.openURL('http://getroost.com/terms')} style={styles.linkText}> Terms and Conditions </Text>
            and
            <Text onPress={() => Linking.openURL('http://getroost.com/privacy')} style={styles.linkText}> Privacy Policy</Text>.
          </Text>
        </View>
        <View style={styles.buttonRow}>
          <PlainButton onPress={() => this.props.onContinue(this.state.phoneNumber, this.props.country.code)} textStyle={styles.continueText}>Continue</PlainButton>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { creationPhoneNumberError, creatingPhoneNumber } = state.createAccount
  return {
    country: state.selectedCountry,
    error: creationPhoneNumberError,
    loading: creatingPhoneNumber
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onContinue: (phoneNumber, countryCode) => {
      const sanitizedNumber = sanitizePhoneNumber(phoneNumber)
      if (!sanitizedNumber || !countryCode) {
        Alert.alert('', 'Please enter a phone number')
      } else if (countryCode === 1 && sanitizedNumber.startsWith('1')) {
        Alert.alert('Invalid phone number', 'Your phone number cannot begin with a 1')
      } else if (sanitizedNumber.startsWith('0')) {
        Alert.alert('Invalid phone number', 'Your phone number cannot begin with a 0')
      } else {
        dispatch(Actions.createPhoneNumber(sanitizedNumber, countryCode))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterPhoneNumber)

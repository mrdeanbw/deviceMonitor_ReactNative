import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import TouchableRow from '../Components/TouchableRow'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoadingIndicator from '../Components/LoadingIndicator'
import PlainButton from '../Components/PlainButton'
import PhoneNumber from '../Components/PhoneNumber'
import TextInput from '../Components/TextInput'

// Styles
import styles from './Styles/ForgotPasswordScreenStyle'

class ForgotPassword extends React.Component {

  static propTypes = {
    country: React.PropTypes.shape({
      name: React.PropTypes.string,
      code: React.PropTypes.number
    }),
    error: React.PropTypes.string,
    loading: React.PropTypes.bool,
    resetPassword: React.PropTypes.func.isRequired
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
        NavigationActions.login()
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
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            A temporary password will be sent to you by SMS
          </Text>
        </View>
        <View style={styles.buttonRow}>
          <PlainButton onPress={() => this.props.resetPassword(this.state.phoneNumber, this.props.country.code)} textStyle={styles.continueText}>Reset Password</PlainButton>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { error, resetting } = state.resetPassword
  return {
    country: state.selectedCountry,
    error,
    loading: resetting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (phoneNumber, countryCode) => {
      if (!phoneNumber || !countryCode) {
        Alert.alert('', 'Please enter a phone number')
      } else {
        dispatch(Actions.resetPassword(phoneNumber, countryCode))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)

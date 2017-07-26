import React from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import LoadingIndicator from '../Components/LoadingIndicator'
import PhoneNumber from '../Components/PhoneNumber'
import PlainButton from '../Components/PlainButton'
import TextInput from '../Components/TextInput'
import { sanitizePhoneNumber } from '../Lib/Utilities'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/LoginScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

class LoginScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: null,
      password: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loading && !nextProps.loading) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      } else {
        NavigationActions.loggedInContent()
      }
    }
  }

  update (key, event) {
    this.setState({
      [key]: event.nativeEvent.text
    })
  }

  submit () {
    const { phoneNumber, password } = this.state
    if (!password) {
      Alert.alert('', 'You must enter your password')
    } else {
      this.props.login(this.props.selectedCountry.code, sanitizePhoneNumber(phoneNumber), password)
    }
  }

  render () {
    if (this.props.loading) {
      return <LoadingIndicator />
    }
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={true}>
        <KeyboardAvoidingView behavior='position'>
          <PhoneNumber
            country={this.props.selectedCountry}
            onPressCountry={NavigationActions.selectCountry}
            phoneNumber={this.state.phoneNumber}
            onChangePhoneNumber={this.update.bind(this, 'phoneNumber')}
          />
          <TextInput
            value={this.state.password}
            onChange={this.update.bind(this, 'password')}
            placeholder='Password'
            secureTextEntry={true}
            style={styles.input}
            returnKeyType='done'
            onSubmitEditing={this.submit.bind(this)}
          />
          <View style={styles.buttonRow}>
            <PlainButton style={styles.loginButton} onPress={this.submit.bind(this)} buttonStyle={styles.loginButton} textStyle={styles.loginText}>
              Login
            </PlainButton>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={NavigationActions.forgotPassword}>
              <Text style={styles.forgotPassword} >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { attempting, error } = state.login
  return {
    error,
    loading: attempting,
    selectedCountry: state.selectedCountry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (countryCode, phoneNumber, password) => {
      dispatch(Actions.attemptLogin(countryCode, phoneNumber, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

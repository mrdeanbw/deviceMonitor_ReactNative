import React from 'react'
import { Alert, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import LoadingIndicator from '../Components/LoadingIndicator'
import RoundedButton from '../Components/RoundedButton'
import TextInput from '../Components/TextInput'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/ChangePasswordScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

class ChangePasswordScreen extends React.Component {

  static propTypes = {
    error: React.PropTypes.string,
    loading: React.PropTypes.bool,
    updatePassword: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      password: null,
      showPassword: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loading && !nextProps.loading) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      } else {
        NavigationActions.pop()
      }
    }
  }

  showHidePassword = () =>{
    this.refs.textInput.blur()
    this.setState({showPassword: !this.state.showPassword})
  }

  onPasswordChange = (event) => this.setState({password: event.nativeEvent.text })

  updatePassword = () => {
    const { password } = this.state
    if (!password || password.length < 8) {
      Alert.alert('', 'Password must be at least 8 characters')
    } else if (password) {
      return this.props.updatePassword(password)
    }
  }

  render () {
    const { password, showPassword } = this.state
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text style={styles.description}>Enter your new password</Text>
          <TextInput
            ref='textInput'
            onChange={this.onPasswordChange}
            style={styles.passwordInput}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={this.showHidePassword}>
            <Text style={styles.showHideLink}>{ showPassword ? 'Hide' : 'Show' } password</Text>
          </TouchableOpacity>
          <View>
            { this.props.loading
              ? <LoadingIndicator />
              : <RoundedButton style={styles.button} text='Save' onPress={this.updatePassword}/> }
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { error, updating } = state.updatePassword
  return {
    error,
    loading: updating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (newPassword) => dispatch(Actions.updatePassword(newPassword))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)

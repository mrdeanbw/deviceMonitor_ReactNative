import React from 'react'
import {
  Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View
} from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import LoadingIndicator from '../Components/LoadingIndicator'
import PlainButton from '../Components/PlainButton'
import TextInput from '../Components/TextInput'

// Styles
import styles from './Styles/CompleteProfileScreenStyle'

const makeInput = (placeholder, value, onChange, secureTextEntry = false, autoCapitalize = null) => (
  <View style={styles.inputContainer}>
    <TextInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      autoCapitalize={autoCapitalize}
    />
  </View>
)

class CompleteProfileScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
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

  handleInput (key, event) {
    this.setState({
      [key]: event.nativeEvent.text
    })
  }

  submit () {
    const { firstName, lastName, email, password } = this.state
    if (!firstName || !lastName || !email) {
      Alert.alert('', 'Name and email are required')
    } else if (!password || password.length < 8) {
      Alert.alert('', 'Password must be at least 8 characters')
    } else {
      this.props.submitProfile(this.state)
    }
  }

  render () {
    if (this.props.loading) {
      return <LoadingIndicator />
    }
    const { firstName, lastName, email, password } = this.state

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={true}>
        <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={25}>
          <View style={styles.description}>
            <View style={styles.iconContainer}>
              <Icon name={'ios-person-outline'} size={40} style={styles.icon}/>
            </View>
            <Text style={styles.completeText}>Complete your Roost profile</Text>
          </View>
          { makeInput('First Name', firstName, this.handleInput.bind(this, 'firstName')) }
          { makeInput('Last Name', lastName, this.handleInput.bind(this, 'lastName')) }
          { makeInput('Email', email, this.handleInput.bind(this, 'email'), false, 'none') }
          { makeInput('Password', password, this.handleInput.bind(this, 'password'), true) }
          <View style={styles.buttonRow}>
            <PlainButton onPress={this.submit.bind(this)} textStyle={styles.buttonText}>Complete</PlainButton>
          </View>
          <View style={styles.smallTextContainer}>
            <Text>All fields are required</Text>
            <Text>Password must be at least 8 characters</Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { creationUserError, creatingUser } = state.createAccount
  return {
    error: creationUserError,
    loading: creatingUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitProfile: ({ firstName, lastName, email, password }) => {
      dispatch(Actions.createUser(firstName, lastName, email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfileScreen)

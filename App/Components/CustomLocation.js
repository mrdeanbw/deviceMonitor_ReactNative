import React from 'react'
import dismissKeyboard from 'dismissKeyboard'
import { KeyboardAvoidingView, ScrollView, Text, View, Alert } from 'react-native'
import RoundedButton from '../Components/RoundedButton'
import TextInput from '../Components/TextInput'

import styles from './Styles/CustomLocationStyle'

export default class CustomLocation extends React.Component {

  static propTypes = {
    onContinue: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      location: ''
    }
  }

  submit () {
    const { location } = this.state
    if (!location) {
      Alert.alert('', 'You must enter a location name')
    } else {
      dismissKeyboard()
      this.props.onContinue(location)
    }
  }

  render () {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={true}>
        <KeyboardAvoidingView style={styles.content} behavior='position'>
          <Text style={styles.text}>Enter custom room location</Text>
          <TextInput
            value={this.state.location}
            onChange={(event) => this.setState({ location: event.nativeEvent.text })}
            style={styles.input}
            returnKeyType='done'
            onSubmitEditing={this.submit.bind(this)}
          />
          <RoundedButton onPress={this.submit.bind(this)}>Continue</RoundedButton>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

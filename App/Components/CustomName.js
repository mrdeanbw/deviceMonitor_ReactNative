import React from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View, Alert } from 'react-native'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RoundedButton from '../Components/RoundedButton'
import TextInput from '../Components/TextInput'

import styles from './Styles/CustomNameStyle'

export default class CustomName extends React.Component {

  static propTypes = {
    initialName: React.PropTypes.string,
    onContinue: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    initialName: ''
  }

  constructor (props) {
    super(props)
    this.state = {
      name: this.props.initialName
    }
  }

  submit () {
    const { name } = this.state
    if (!name) {
      Alert.alert('', 'You must enter a name')
    } else {
      this.props.onContinue(name)
    }
  }

  render () {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={true}>
        <KeyboardAvoidingView style={styles.content} behavior='position'>
          <Text style={styles.text}>Enter custom appliance name</Text>
          <TextInput
            value={this.state.name}
            onChange={(event) => this.setState({ name: event.nativeEvent.text })}
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

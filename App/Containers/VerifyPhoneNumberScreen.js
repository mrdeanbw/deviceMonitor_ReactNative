import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoadingIndicator from '../Components/LoadingIndicator'
import PlainButton from '../Components/PlainButton'
import TextInput from '../Components/TextInput'

// Styles
import styles from './Styles/VerifyPhoneNumberScreenStyle'

class VerifyPhoneNumberScreen extends React.Component {

  static propTypes = {
    phoneNumber: React.PropTypes.string,
    accessCode: React.PropTypes.string,
    loading: React.PropTypes.bool,
    error: React.PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state ={
      enteredCode: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loading && !nextProps.loading) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      } else {
        NavigationActions.completeProfile()
      }
    }
  }

  verifyAccessCode () {
    if (this.state.enteredCode === this.props.accessCode) {
      this.props.codeVerified()
    } else {
      Alert.alert('Error', 'The code you have entered is incorrect', [
        { text: 'Try Again', onPress: () => null }
      ])
    }
  }

  render () {
    if (this.props.loading) {
      return <LoadingIndicator />
    }

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={true}>
        <View style={styles.description}>
          <Text style={styles.text}>We have sent an SMS with an access code to +{this.props.country.code}{this.props.phoneNumber}</Text>
          <Text style={styles.text}>Please enter your access code</Text>
        </View>
        <TextInput
          keyboardType='numeric'
          style={styles.codeInput}
          value={this.state.enteredCode}
          placeholder={'Your access code'}
          onChange={(event) => this.setState({ enteredCode: event.nativeEvent.text })}
        />
        <View style={styles.buttonRow}>
          <PlainButton textStyle={styles.continue} onPress={this.verifyAccessCode.bind(this)}>Continue</PlainButton>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { accessCode, phoneNumber, updating, updatingError } = state.createAccount
  return {
    accessCode,
    error: updatingError,
    loading: updating,
    phoneNumber,
    country: state.selectedCountry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    codeVerified: () => {
      dispatch(Actions.accessCodeVerified())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneNumberScreen)

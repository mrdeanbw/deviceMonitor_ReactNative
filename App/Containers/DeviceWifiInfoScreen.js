import React from 'react'
import {
  NativeModules,
  Platform,
  Linking,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Alert
} from 'react-native'
import dismissKeyboard from 'dismissKeyboard'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RoundedButton from '../Components/RoundedButton'
import TextInput from '../Components/TextInput'
import NetworkInfo from 'react-native-network-info'
import { Colors, Images, Fonts } from '../Themes'
import DeviceInfo from 'react-native-device-info'
import CheckBox from 'react-native-checkbox'
import Keychain from 'react-native-keychain'

// Styles
import styles from './Styles/DeviceWifiInfoScreenStyle'

class DeviceWifiInfoScreen extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      wifiName: '',
      wifiPassword: '',
      showPassword: true,
      savePassword: false,
    }
  }

  componentWillMount () {
    // Attempt to fetch previously saved creds
    Keychain.getGenericPassword()
      .then(
        (creds) => {
          const { password, username } = creds
          this.setState({ wifiPassword: password, wifiName: username, savePassword: true })
          this.startPollingWifiName()
        },
        (error) => {
          console.log(error)
          this.startPollingWifiName()
        }
      )
  }

  componentWillUnmount () {
    this.stopPollingWifiName()
  }

  componentWillReceiveProps (props) {
    // restart polling when user presses 'back'
    // from battery setup instructions one scene
    if (props.startPollingWifiName) {
      this.startPollingWifiName()
    }
  }

  startPollingWifiName () {
    this.getWifiName()
    this.timerId = setInterval(this.getWifiName, 500)
  }

  stopPollingWifiName () {
    clearInterval(this.timerId)
    this.timerId = null
  }

  getWifiName = () => {
    NetworkInfo.getSSID(ssid => this.updateWifiState(ssid))
  }

  updateWifiState (name) {
    // check if we're running on the Simulator and fake the wifi name
    if (this.timerId && __DEV__ && DeviceInfo.isEmulator()) {
      this.setState({ wifiName: 'fake-dev-wifi-name' })
      return
    }

    if (this.timerId && (name !== this.state.wifiName)) {
      this.setState({ wifiName: name, wifiPassword: '' })
    }
  }

  wifiUnavailable () {
    const wifiUnavailableCodes = ['error', '<unknown ssid>', 'Ox', 'OX']
    return wifiUnavailableCodes.includes(this.state.wifiName)
  }

  submit () {
    const { wifiName, wifiPassword, savePassword } = this.state
    if(wifiName.includes("5G") || wifiName.includes("5g") || wifiName.includes("5 G") || wifiName.includes("5 g")){
        Alert.alert(
              '',
              "Your Wi-Fi has '5G' in it. It could be a 5 GHz Wi-Fi. Roost works ONLY with 2.4 GHz."+'\n'+ "Are you sure you want to continue?",
              [
                { text: 'No', onPress: () => {}},
                { text: 'Yes', onPress: () => {
                        if (savePassword) {
                            Keychain
                                .setGenericPassword(wifiName, wifiPassword)
                                .then(() => {}, (error) => { console.log('Keychain set error: ', error) })
                        } else {
                            Keychain.resetGenericPassword()
                                .then(() => {}, (error) => { console.log('Keychain reset error: ', error) })
                        }
                            this.stopPollingWifiName()
                            this.props.onContinue(wifiName, wifiPassword, this.props.deviceType)
                    }
                }
              ]
            )
    } else {
        if (savePassword) {
          Keychain
            .setGenericPassword(wifiName, wifiPassword)
            .then(() => {}, (error) => { console.log('Keychain set error: ', error) })
        } else {
          Keychain.resetGenericPassword()
            .then(() => {}, (error) => { console.log('Keychain reset error: ', error) })
        }
        this.stopPollingWifiName()
        this.props.onContinue(wifiName, wifiPassword, this.props.deviceType)
    }
  }

  openSettings () {
    if (Platform.OS === 'android') {
      NativeModules.Settings.openWifiSettings()
      return
    }
    Linking.openURL('app-settings:').catch(error => console.log('error : ', error))
  }

  showHidePassword = () => {
    this.refs.textInput.blur()
    this.setState({showPassword: !this.state.showPassword})
  }

  render () {
    const settingsButton = (
      <TouchableOpacity style={styles.button} onPress={() => this.openSettings()}>
        <Text style={[styles.text, styles.settingsButton]}>Go to phone settings</Text>
      </TouchableOpacity>
    )

    if (this.wifiUnavailable()) {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.text}>Your phone is not currently connected to a Wi-Fi network. Please connect to a Wi-Fi network to continue setting up your Roost device</Text>
            <Text style={styles.text}>Go to phone settings</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container} keyboardShouldPersistTaps={true}>
        <View style={styles.content}>
          <Text style={styles.text}>Your Roost device will connect to {'\n'}Wi-Fi network:</Text>
          <Text style={[styles.text, styles.wifiName]}>{this.state.wifiName}</Text>
          <Text style={styles.label}>Enter Wi-Fi password</Text>
          <KeyboardAvoidingView behavior='position'>
            <TextInput
              ref='textInput'
              value={this.state.wifiPassword}
              onChange={(event) => this.setState({ wifiPassword: event.nativeEvent.text })}
              style={styles.input}
              placeholder='Wi-Fi Password'
              returnKeyType='done'
              onSubmitEditing={this.submit.bind(this)}
              secureTextEntry={!this.state.showPassword}
            />
            <TouchableOpacity onPress={this.showHidePassword}>
              <Text style={[styles.text, styles.showHideButton]}>{ this.state.showPassword ? 'Hide' : 'Show' }</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <CheckBox
            label='Remember Wi-Fi password?'
            labelStyle={styles.checkboxLabelStyle}
            checked={this.state.savePassword}
            checkedImage={Images.checkboxFilled}
            uncheckedImage={Images.checkboxEmpty}
            containerStyle={styles.checkboxContainer}
            underlayColor={Colors.lightGray}
            onChange={(checked) => this.setState({ savePassword: checked })}
          />
          <Text style={styles.rememberPwdInfoText}>The password will be saved locally in this smartphone for the purpose of making future setup easier</Text>
          <RoundedButton onPress={this.submit.bind(this)} style={styles.button}>Continue</RoundedButton>
          <View style={ styles.column }>
              <View style={ styles.row }>
                <View style={ styles.bullet }>
                  <Text>{'\u2022' + " "}</Text>
                </View>
                <View style={ styles.bulletText }>
                  <Text>
                      <Text>Roost works ONLY with <Text style={styles.link} onPress={() => Linking.openURL('https://getroost.zendesk.com/hc/en-us/articles/115003491928-How-can-I-tell-if-my-Wi-Fi-is-2-4-GHz-')}>2.4 GHz Wi-Fi networks</Text></Text>
                    </Text>
                </View>
              </View>
              <View style={ styles.row }>
                <View style={ styles.bullet }>
                  <Text>{'\u2022' + " "}</Text>
                </View>
                <View style={ styles.bulletText }>
                  <Text>
                    <Text>To select another Wi-Fi network go to phone settings</Text>
                  </Text>
                </View>
              </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { deviceType } = state.createDevice
}

const mapDispatchToProps = (dispatch) => {
  return {
    onContinue: (wifiName, wifiPassword, deviceType) => {
      dispatch(Actions.enterWifiInfo(wifiName, wifiPassword))
      dismissKeyboard()
      if (deviceType == 'Water') {
        NavigationActions.waterDetectorSetupInstructionsOne()
        return
      }
      NavigationActions.batteryPackageSelection()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceWifiInfoScreen)

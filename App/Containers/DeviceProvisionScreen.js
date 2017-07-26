import React from 'react'
import { Linking, Image, Alert, ActivityIndicator, Text, ScrollView, View, NativeModules } from 'react-native'
import { Images, Fonts } from '../Themes'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RoundedButton from '../Components/RoundedButton'
import TextInput from '../Components/TextInput'
import { Colors, Metrics } from '../Themes/'
import styles from './Styles/DeviceProvisionScreenStyle'
import Chirp from '../Lib/Chirp'
import NavItems from '../Navigation/NavItems'

class DeviceProvisionScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      disableConnectButton: false
    }
  }

    componentWillReceiveProps (nextProps) {
        if (nextProps.step !== this.props.step) {
            this.setState({ disableConnectButton: false })
            if(nextProps.step === 'success'){
                NavigationActions.refresh({
                    renderBackButton: NavItems.emptyButton
                })
            }
        }

        if (nextProps.error) {
            Alert.alert(
                'Provisioning Error',
                nextProps.error,
                [
                    { text: 'OK', onPress: () => this.props.resetError() }
                ]
            )
        }
    }

  deviceTypeIsWater () {
    if (this.props.deviceType.toLowerCase() === 'water') { return true }
    return false
  }

    provMechIsFoam () {
        if (this.props.provMech.toLowerCase() === 'earphones') { return true }
        return false
    }

  componentDidMount () {
    const title = this.deviceTypeIsWater() ? 'Step 4 of 4' : 'Step 3 of 4'
    NavigationActions.refresh({
      title: title,
      onBack: () => this.onBack(),
      onRight: () => this.cancelProvisioningAlert()
    })

    Chirp.stopSilentSound()
  }

  cancelProvisioningAlert () {
    Alert.alert(
      'Stop provisioning device?',
      'Press \'OK\' to reset your progress and return to the home screen',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'OK', onPress: this.goHome.bind(this) }
      ]
    )
  }

  onBack () {
    this.props.cancel()
    NavigationActions.pop()
  }

  goHome () {
    this.props.cancel()
    NavigationActions.loggedInContent()
  }

  provision () {
    this.setState({ disableConnectButton: true })
    this.props.provision()
  }

  volumeAlert () {
    if (this.props.showVolumeAlert) {
      Alert.alert(
        'Get Ready!',
        'During setup, your phone will play a loud tone. If you\'re ready to play the tone, tap OK',
        [
            { text: 'Cancel', onPress: () => {} },
            { text: 'OK', onPress: () => this.checkVolume() }
        ]
      )
    } else {
        this.checkVolume()
    }

  }

  checkVolume (){
    const MIN_REQUIRED_VOLUME = 0.4
    console.log('checking volume')
    NativeModules.Volume.getSystemVolume((error, volume) => {
      if (error || volume < MIN_REQUIRED_VOLUME) {
        Alert.alert(
          'Turn Up Volume', 'Your phone uses sound to communicate with the Roost Smart Device. Please increase your speaker volume to it\'s maximum setting to proceed', [
            { text: 'OK', onPress: () => {} }
          ]
        )
      } else {
        this.provision()
      }
    })
  }

  imageForDeviceType () {
    if (this.deviceTypeIsWater()) {
      return Images.poseidonFour
    }
    if (this.provMechIsFoam()) {
        return Images.foamTwo
    }
    return Images.smokeAlarmFour
  }

  troubleshootingUrl () {
    let tsUrl = ''
    if (this.deviceTypeIsWater()) {
//      tsUrl = 'https://getroost.zendesk.com/hc/en-us/sections/115000431347-My-Leak-Detector-is-Beeping-During-Setup'
      tsUrl = 'http://getroost.com/leakhelp'
    } else {
//      tsUrl = 'https://getroost.zendesk.com/hc/en-us/sections/204654208-My-Battery-is-Beeping-During-Setup'
      tsUrl = 'http://getroost.com/batteryhelp'
    }
    return tsUrl
  }

  onNext () {
    this.props.onNext(this.deviceTypeIsWater(), this.props.deviceId)
  }

  render () {
    const step = this.props.step

    let content, button
    switch (step) {
      case 'initial':
        if(this.deviceTypeIsWater()){
            content = [
              <Text key='0' style={styles.title}>Now you’re ready!</Text>,
//              <Text key='1' style={styles.bullets}>{'\u2022'} Tap connect and you will hear a loud audio tone{'\n\u2022'} Wait for the connection to complete with a success screen{'\n\u2022'} Connection may take up to 60 seconds</Text>
              <View key='1' style={ styles.bcolumn }>
                  <View style={ styles.brow }>
                    <View style={ styles.bullet }>
                      <Text>{'\u2022' + " "}</Text>
                    </View>
                    <View style={ styles.bulletText }>
                      <Text>
                          <Text>Tap connect and you will hear a loud audio tone</Text>
                        </Text>
                    </View>
                  </View>
                  <View style={ styles.brow }>
                    <View style={ styles.bullet }>
                      <Text>{'\u2022' + " "}</Text>
                    </View>
                    <View style={ styles.bulletText }>
                      <Text>
                        <Text>Wait for the connection to complete with a success screen</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={ styles.brow }>
                    <View style={ styles.bullet }>
                      <Text>{'\u2022' + " "}</Text>
                    </View>
                    <View style={ styles.bulletText }>
                      <Text>
                        <Text>Connection may take up to 60 seconds</Text>
                      </Text>
                    </View>
                  </View>
              </View>
            ]
        } else if(this.provMechIsFoam()){
            content = [
                <Text key='0' style={styles.title}>Prepare to connect to Wi-Fi</Text>,
                <View key='1' style={ styles.bcolumn }>
                    <View style={ styles.brow }>
                        <View style={ styles.bullet }>
                            <Text>{'\u2022' + " "}</Text>
                        </View>
                        <View style={ styles.bulletText }>
                        <Text>
                            <Text>Tap connect to continue the setup process</Text>
                        </Text>
                        </View>
                    </View>
                </View>
            ]
        }else{
            content = [
              <Text key='0' style={styles.title}>Now you’re ready!</Text>,
              <View key='1' style={ styles.bcolumn }>
                  <View style={ styles.brow }>
                    <View style={ styles.bullet }>
                      <Text>{'\u2022' + " "}</Text>
                    </View>
                    <View style={ styles.bulletText }>
                      <Text>
                          <Text>Place phone speaker 1⁄2 inch (1 cm) from the battery sound hole</Text>
                        </Text>
                    </View>
                  </View>
                  <View style={ styles.brow }>
                    <View style={ styles.bullet }>
                      <Text>{'\u2022' + " "}</Text>
                    </View>
                    <View style={ styles.bulletText }>
                      <Text>
                        <Text>Don{'\''}t move your phone or battery once the sound starts</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={ styles.brow }>
                    <View style={ styles.bullet }>
                      <Text>{'\u2022' + " "}</Text>
                    </View>
                    <View style={ styles.bulletText }>
                      <Text>
                        <Text>Tap Connect and you will hear a loud audio tone</Text>
                      </Text>
                    </View>
                  </View>
              </View>
            ]
        }
        const disabled = this.state.disableConnectButton
        console.log(disabled)
        onPress = disabled ? () => null : () => this.volumeAlert()
        button = <RoundedButton onPress={onPress} style={[styles.button, disabled && styles.disabledButton]}>Connect</RoundedButton>
        break
      case 'chirping':
        content = (
          <View style={styles.content}>
            <Text style={[styles.text, { marginHorizontal: 0 }]}>Connecting to device... {this.props.timer}</Text>
            <ActivityIndicator style={styles.activityIndicator} size='large' color={Colors.blue}/>
          </View>
        )
        button = <RoundedButton onPress={() => this.props.cancel()} style={[styles.button, { backgroundColor: Colors.red }]}>Cancel</RoundedButton>
        break
      case 'polling':
        content = (
          <View style={styles.content}>
            <Text style={[styles.text, { marginHorizontal: 0 }]}>Connecting to cloud... {this.props.timer}</Text>
            <ActivityIndicator style={styles.activityIndicator} size='large' color={Colors.blue}/>
          </View>
        )
        button = <RoundedButton onPress={() => this.props.cancel()} style={[styles.button, { backgroundColor: Colors.red }]}>Cancel</RoundedButton>
        break
      case 'success':
        content = [
          <Image key='0' style={styles.image} source={Images.checkmarkFilled} />,
          <Text key='1' style={styles.text}>Success!</Text>,
          <Text key='2' style={styles.text}>Your Roost smart device is connected</Text>
        ]
        button = <RoundedButton onPress={() => this.onNext()} style={styles.button}>Next</RoundedButton>

        break
      case 'failure':
        content = [
          <Text key='0' style={[styles.text, { fontSize: Fonts.size.regular, color:Colors.red }]}>{'Something went wrong.'+'\n'+'Before trying again read'+'\n'}<Text style={[styles.link, { fontSize: Fonts.size.regular}]} onPress={()=>Linking.openURL(this.troubleshootingUrl())}>Troubleshooting tips</Text></Text>,
        ]
        button = <RoundedButton onPress={() => this.props.provision()} style={styles.button}>Try Again</RoundedButton>
    }

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image resizeMode='cover' style={styles.instructionImage} source={this.imageForDeviceType()} />
          <View style={styles.contentContainer}>
            <View style={styles.placeholder}/>
              { content }
            <View style={styles.placeholder}/>
          </View>
          <View style={styles.row}>
            { button }
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { volumeAlertShown } = state.user
  const { creationDeviceError, location, step, timer, deviceType, provMech, deviceId } = state.createDevice
  return {
    creationDeviceError, location, step, timer, deviceType, provMech, deviceId,
    showVolumeAlert: !volumeAlertShown
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    provision: () => {
      dispatch(Actions.createDevice())
    },
    cancel: () => {
      dispatch(Actions.cancelProvisioning())
    },
    resetError: () => {
      dispatch(Actions.resetProvisioningError())
    },
    onNext: (deviceTypeIsWater, deviceId) => {
      if (deviceTypeIsWater) {
        NavigationActions.alertsSetup({ deviceId: deviceId })
        return
      }
      NavigationActions.batterySetupInstructionsFive()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceProvisionScreen)

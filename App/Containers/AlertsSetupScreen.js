import React, {PropTypes} from 'react'
import R from 'ramda'
import { Alert, ScrollView, Text, View } from 'react-native'
import styles from './Styles/AlertsSetupScreenStyle'
import { Images, Metrics, Colors } from '../Themes'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoadingIndicator from '../Components/LoadingIndicator'
import RoundedButton from '../Components/RoundedButton'
import { convertToCelsius, convertToFahrenheit } from '../Lib/Utilities'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import MaterialSwitch from 'react-native-material-switch'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'

const updatableProperties = [
  'tempUnitsFahrenheit',
  'tempAlert',
  'tempMin',
  'tempMax',
  'humAlert',
  'humMin',
  'humMax',
  'motionAlert'
]

const Switch = (props) => (
  <MaterialSwitch
    activeButtonColor={Colors.white}
    activeBackgroundColor={Colors.appleGreen}
    inactiveButtonColor={Colors.white}
    inactiveBackgroundColor={Colors.gray}
    style={styles.tempUnitSwitch}
    { ...props }
  />
)

var radio_props = [
  {label: '°C', value: 0 },
  {label: '°F', value: 1 }
];


class AlertsSetupScreen extends React.Component {

  static propTypes = {
    addressId: React.PropTypes.string,
    deviceId: React.PropTypes.string,
    initialValues: React.PropTypes.object,
    nextScreen: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    error: React.PropTypes.string
  }

  static defaultProps = {
    initialValues: {}
  }

  constructor (props) {
    super(props)

    const defaults = {
      tempSliderMin: 32,
      tempSliderMax: 122,
      humSliderMin: 0,
      humSliderMax: 100,
      sliderLength: (Metrics.screenWidth - 60),
      tempUnitsFahrenheit: true,
      prevUnit: true,
      tempAlert: true,
      motionAlert: false,
      humAlert: true,
      tempMin: 40,
      tempMax: 90,
      humMin: 30,
      humMax: 70
    }
    const initialValues = R.pick(updatableProperties, this.props.initialValues)

    this.state = {
      ...defaults,
      ...initialValues
    }

    // Read default values from cloud if it doesn't exist use default values set by App.
    if(this.state.tempMin === undefined || this.state.tempMax === undefined || this.state.tempUnitsFahrenheit === undefined || this.state.tempAlert === undefined){
        this.state = {
            ...this.state,
            tempMin: defaults.tempMin,
            tempMax: defaults.tempMax,
            tempUnitsFahrenheit: defaults.tempUnitsFahrenheit,
            prevUnit: defaults.prevUnit,
            tempAlert: defaults.tempAlert
        }
    }

    if(this.state.humMin === undefined || this.state.humMax === undefined || this.state.humAlert === undefined){
        this.state = {
           ...this.state,
           humMin: defaults.humMin,
           humMax: defaults.humMax,
           humAlert: defaults.humAlert
        }
    }

    // If this.props.initialValues.tempUnitsFahrenheit is false, convert the
    // temp slider min/max to celsius to match temp min/max.
    if (!this.state.tempUnitsFahrenheit) {
      this.state = {
        ...this.state,
        prevUnit:this.state.tempUnitsFahrenheit,
        tempSliderMax: convertToCelsius(this.state.tempSliderMax),
        tempSliderMin: convertToCelsius(this.state.tempSliderMin)
      }
    } else if (this.state.tempMin !== defaults.tempMin && this.state.tempMax !== defaults.tempMax) {
      // In this case, we have data coming from the API, which stores everything in C, so convert to F
      this.state = {
        ...this.state,
        prevUnit:this.state.tempUnitsFahrenheit,
        tempMin: Math.round(convertToFahrenheit(this.state.tempMin)),
        tempMax: Math.round(convertToFahrenheit(this.state.tempMax))
      }
    }
  }

  tempValuesChange = (values) => {
    this.setState({tempMin: values[0], tempMax: values[1]})
  }

  humValuesChange = (values) => {
    this.setState({humMin: values[0], humMax: values[1]})
  }

  onSave () {
    const updates = R.pick(updatableProperties, this.state)
    this.props.updateDevice(this.props.deviceId, updates)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loading && !nextProps.loading) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      } else {
        this.props.nextScreen({ initialAddress: nextProps.addressId })
      }
    }
  }

  // If tempUnitsFahrenheit is true, convert current state's temp min/max
  // from Celsius to Fahrenheit. If false, convert Fahrenheit to Celsius.
  // Returns an object containing `tempMin`, `tempMax`, `tempSliderMin`, and
  // `tempSliderMax` keys.
  getTempValues (tempUnitsFahrenheit) {
    let { tempSliderMin, tempSliderMax, tempMin, tempMax } = this.state

    if (tempUnitsFahrenheit) {
      tempMin = convertToFahrenheit(tempMin)
      tempMax = convertToFahrenheit(tempMax)
      tempSliderMax = convertToFahrenheit(tempSliderMax)
      tempSliderMin = convertToFahrenheit(tempSliderMin)
    } else {
      tempMin = convertToCelsius(tempMin)
      tempMax = convertToCelsius(tempMax)
      tempSliderMax = convertToCelsius(tempSliderMax)
      tempSliderMin = convertToCelsius(tempSliderMin)
    }

    // Only show round numbers
    tempMin = Math.round(tempMin)
    tempMax = Math.round(tempMax)

    tempSliderMin = Math.min(tempSliderMin, tempMin)
    tempSliderMax = Math.max(tempSliderMax, tempMax)

    return {
      tempMin,
      tempMax,
      tempSliderMin,
      tempSliderMax,
    }
  }

  handleUnitsChange (tempUnitsFahrenheit) {
    if(tempUnitsFahrenheit === 1){
        tempUnitsFahrenheit = true
    } else {
        tempUnitsFahrenheit = false
    }
    if(this.state.prevUnit === tempUnitsFahrenheit){
        const prevUnit = tempUnitsFahrenheit
        this.setState({
            tempUnitsFahrenheit,
            prevUnit
        })
    } else {
        const newTemps = this.getTempValues(tempUnitsFahrenheit)
        const prevUnit = tempUnitsFahrenheit
        this.setState({
            ...newTemps,
            tempUnitsFahrenheit,
            prevUnit
        })
    }
  }

  render () {
    let i=0
    if (this.props.loading) {
      return <LoadingIndicator />
    }
    const showTempSettings = this.state.tempAlert
    const showHumSettings = this.state.humAlert
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}> Set custom temperature and humidity levels for alerts </Text>
        <View style={[styles.settingsRow, { marginTop: Metrics.doubleBaseMargin}]}>
          <View style={styles.switchRow}>
            <Text style={styles.text}>Temperature alert</Text>
            <View style={styles.switchRow}>
              <Text style={[styles.switchLabel, {marginRight: Metrics.baseMargin}]}>  </Text>
              <Switch
                onChangeState={(value) => this.setState({tempAlert: value})}
                active={this.state.tempAlert} />
                <Text style={[styles.switchLabel, {marginLeft: Metrics.baseMargin}]}>  </Text>
            </View>
          </View>
          {showTempSettings && (
          <View>
              <View style={styles.tempUnitsRow}>
                <RadioForm
                    radio_props={radio_props}
                    initial={this.state.tempUnitsFahrenheit ? 1 : 0}
                    labelStyle={[styles.switchLabel, {marginRight: Metrics.smallMargin}]}
                    labelHorizontal={true}
                    formHorizontal={true}
                    buttonSize={12}
                    buttonOuterSize={24}
                    onPress={this.handleUnitsChange.bind(this)}
                />
              </View>
             <Text style={styles.sliderText}>Desired range: {this.state.tempMin}° - {this.state.tempMax}° {this.state.tempUnitsFahrenheit ? 'F' : 'C'}</Text>
             <View style={styles.multiSliderContainer}>
               <MultiSlider
                 key={this.state.tempUnitsFahrenheit ? 'fahrenheit' : 'celsius'}
                 min={this.state.tempSliderMin}
                 max={this.state.tempSliderMax}
                 values={[this.state.tempMin, this.state.tempMax]}
                 sliderLength={this.state.sliderLength}
                 selectedStyle={styles.selectedTrackStyle}
                 markerStyle={styles.markerStyle}
                 pressedMarkerStyle={styles.pressedMarkerStyle}
                 onValuesChange={this.tempValuesChange} />
             </View>
         </View>
          )}
          {!showTempSettings && (
            <View style={[styles.switchRow,{margin:Metrics.baseMargin}]}>
                <Text style={styles.text}>
                    Temperature alerts are turned off
                </Text>
            </View>
          )}
        </View>
        <View style={styles.settingsRow}>
          <View style={styles.switchRow}>
            <Text style={styles.text}>Humidity alert</Text>
            <View style={styles.switchRow}>
              <Text style={[styles.switchLabel, {marginRight: Metrics.baseMargin}]}>  </Text>
              <Switch
                onChangeState={(value) => this.setState({humAlert: value})}
                active={this.state.humAlert} />
                <Text style={[styles.switchLabel, {marginLeft: Metrics.baseMargin}]}>  </Text>
            </View>
          </View>
          {showHumSettings && ( <View>
          <Text style={styles.sliderText}>Desired range: {this.state.humMin}% - {this.state.humMax}%</Text>
          <View style={styles.multiSliderContainer}>
            <MultiSlider
              min={this.state.humSliderMin}
              max={this.state.humSliderMax}
              values={[this.state.humMin, this.state.humMax]}
              sliderLength={this.state.sliderLength}
              selectedStyle={styles.selectedTrackStyle}
              markerStyle={styles.markerStyle}
              pressedMarkerStyle={styles.pressedMarkerStyle}
              onValuesChange={this.humValuesChange} />
          </View>
          </View>)}
          {!showHumSettings && (
              <View style={[styles.switchRow,{margin:Metrics.baseMargin}]}>
                  <Text style={styles.text}>
                      Humidity alerts are turned off
                  </Text>
              </View>

            )}
        </View>
        {/* Comment out motion alert setting for now
        <View style={[styles.settingsRow, { paddingBottom: Metrics.doubleBaseMargin }]}>
          <View style={styles.switchRow}>
            <Text style={styles.text}>Motion alert</Text>
            <Switch
              onChangeState={(value) => this.setState({motionAlert: value})}
              active={this.state.motionAlert} />
          </View>
        </View>
        */}
        <View style={styles.buttonRow}>
          <RoundedButton style={styles.button} onPress={() => this.onSave()}>Save</RoundedButton>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { deviceId } = ownProps
  const { devices } = state.devices
  const device = R.find(R.propEq('objectId', deviceId), R.flatten(R.values(devices)))
  const { error, updatingDevice } = state.updateDevice

  return {
    addressId: device.pAddress.objectId,
    deviceId,
    initialValues: device,
    error,
    loading: updatingDevice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateDevice: (deviceId, properties) => {
      if (properties.tempUnitsFahrenheit) {
        properties.tempMin = Math.round(convertToCelsius(properties.tempMin))
        properties.tempMax = Math.round(convertToCelsius(properties.tempMax))
      }
      dispatch(Actions.updateDevice(deviceId, properties))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertsSetupScreen)

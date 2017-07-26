import React from 'react'
import {
  Modal,
  Platform,
  AlertIOS,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Alert
} from 'react-native'
import dismissKeyboard from 'dismissKeyboard'
import Picker from 'react-native-picker'
import DialogAndroid from 'react-native-dialogs'
import RadioForm from 'react-native-simple-radio-button'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Metrics, Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import PlainButton from '../Components/PlainButton'
import TextInput from '../Components/TextInput'
import LoadingIndicator from '../Components/LoadingIndicator'
import R from 'ramda'

// Styles
import styles from './Styles/DeviceAlarmInfoScreenStyle'

const updatableProperties = [
  'alarmBrand',
  'alarmModel',
  'alarmMFDMonth',
  'alarmMFDYear',
  'alarmPowerSource'
]

class DeviceAlarmInfoScreen extends React.Component {

  static propTypes = {
    alarmModels: React.PropTypes.array,
    addressId: React.PropTypes.string,
    deviceId: React.PropTypes.string,
    initialValues: React.PropTypes.object,
    nextScreen: React.PropTypes.func.isRequired,
    showSkip: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    updating: React.PropTypes.bool,
    error: React.PropTypes.string
  }

  static defaultProps = {
    initialValues: {}
  }

  constructor (props) {
    super(props)

    const aspectRatio = 1.33
    const width = Metrics.screenWidth - Metrics.largeMargin
    const height = width / aspectRatio

    const defaults = {
      alarmBrand: 'Select',
      alarmModel: 'Select',
      alarmMFDMonth: null,
      alarmMFDYear: null,
      alarmPowerSource: null,
      showModal: false,
      imageWidth: width,
      imageHeight: height,
    }

    const initialValues = R.pick(updatableProperties, this.props.initialValues)

    this.state = {
      ...defaults,
      ...initialValues
    }
  }

  componentDidMount () {
    this.props.getAlarmModels()
  }

  componentWillUnmount () {
    Picker.hide()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.updating && !nextProps.updating) {
      if (nextProps.error) {
        Alert.alert('', 'There was an error saving your alarm information. Please try again')
      } else {
        this.props.resetProvisionState()
        this.props.nextScreen({ initialAddress: nextProps.addressId })
      }
    }
  }

  caseInsensitiveSort (names) {
    return R.sortBy(R.toLower)(names)
  }

  showPicker (data, selectedValueArray, pickerTitle, confirmCallback) {
    Picker.init({
      pickerData: data,
      selectedValue: selectedValueArray,
      pickerConfirmBtnText: 'Done',
      pickerConfirmBtnColor: [3, 124, 3, 1],
      pickerCancelBtnText: 'Cancel',
      pickerCancelBtnColor: [255, 0, 0, 0.6],
      pickerBg:[255,255,255,1],
      pickerTitleText: pickerTitle,
      onPickerConfirm: confirmCallback
    })

    Picker.show()
  }

  customNamePrompt (title, stateField) {
    const inputCallback = (input) => { this.setState({ [stateField]: input }) }
    switch (Platform.OS) {
      case 'ios':
        const message = null
        const type = 'plain-text'
        AlertIOS.prompt(title, message, inputCallback, type)
        break
      case 'android':
        const options = {
          title: title,
          positiveText: 'Done',
          negativeText: 'Cancel',
          input: {
            allowEmptyInput: true,
            callback: inputCallback
          }
        }
        const dialog = new DialogAndroid()
        dialog.set(options)
        dialog.show()
    }
  }

  showBrandsPicker () {
    const customInputOption = 'Add custom manufacturer'
    const brandNames = R.uniq(R.pluck('brand')(this.props.alarmModels))
    const sortedBrandNames = this.caseInsensitiveSort(brandNames)
    const pickerSelectionCallback = (selection) => {
      text = selection[0].toString()
      if (['Select', customInputOption].includes(text)) {
        this.customNamePrompt('Enter manufacturer name', 'alarmBrand')
        return
      }
      this.setState({ alarmBrand: text })
      this.setState({ alarmModel: 'Select' })
    }
    const selectedValueArray = [this.state.alarmBrand]
    const pickerTitle = 'Manufacturer'
    this.showPicker([customInputOption, ...sortedBrandNames], selectedValueArray, pickerTitle, pickerSelectionCallback)
  }

  showModelsPicker () {
    const customInputOption = 'Add custom model'
    const models = R.filter(R.propEq('brand', this.state.alarmBrand), this.props.alarmModels)
    const modelNames = R.uniq(R.pluck('model')(models))
    const sortedModelNames = this.caseInsensitiveSort(modelNames)
    const pickerSelectionCallback = (selection) => {
      text = selection[0].toString()
      if (['Select', customInputOption].includes(text)) {
        this.customNamePrompt('Enter model name', 'alarmModel')
        return
      }
      this.setState({ alarmModel: text })
    }
    const selectedValueArray = [this.state.alarmModel]
    const pickerTitle = 'Model'
    this.showPicker([customInputOption, ...sortedModelNames], selectedValueArray, pickerTitle, pickerSelectionCallback)
  }

  calendarMonthNames () {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }

  showDatePicker () {
    const monthNames =  this.calendarMonthNames()
    const yearNumbers = R.reverse(R.range(1990, new Date().getFullYear() + 1))
    const calendarData = [
      ['Unavailable', ...monthNames],
      ['Unavailable', ...yearNumbers]
    ]
    const selectionCallback = (selection) => {
      const month = selection[0]
      const year = selection[1]
      this.setState({ alarmMFDMonth: month, alarmMFDYear: year })

      if ([month, year].includes('Unavailable')) { return }

      const years = this.calculateElapsedYears(year, month)
      if (years > 10) {
        Alert.alert('', 'Your smoke alarm is more than 10 years old. Most manufacturers recommend replacing such alarms')
      }
    }
    const { alarmMFDMonth, alarmMFDYear } = this.state
    const selectedValuesArray = [alarmMFDMonth, alarmMFDYear]
    const pickerTitle = 'Manufacturing date'
    this.showPicker(calendarData, selectedValuesArray, pickerTitle, selectionCallback)
  }

  calculateElapsedYears (year, month) {
    const monthNumber = R.indexOf(month, this.calendarMonthNames()) + 1
    const manufactureDate = new Date(year, monthNumber)
    const now = new Date()
    const secondsInYear = 31540000
    const elapsedMilliseconds = now - manufactureDate
    const elapsedSeconds = Math.round(elapsedMilliseconds / 1000)
    return elapsedSeconds / secondsInYear
  }

  manufactureDate () {
    const { alarmMFDMonth, alarmMFDYear } = this.state
    const monthYear = [alarmMFDMonth, alarmMFDYear]
    if (monthYear.includes(null)) { return 'Select' }
    if (monthYear.includes('Unavailable')) { return 'Unavailable' }

    return `${alarmMFDMonth}, ${alarmMFDYear}`
  }

  sanitize (value, key, obj) {
    if (value === 'Select') {
      return null
    }
    if (key === 'alarmMFDYear' && value) {
      return value.toString()
    }
    return value
  }

  onSave () {
    const updatables = R.pick(updatableProperties, this.state)
    const updates = R.mapObjIndexed(this.sanitize, updatables)
    this.props.onSave(this.props.deviceId, updates)
  }

  render () {
    if (this.props.loading || this.props.updating) {
      return <LoadingIndicator/>
    }

    return (
      <View style={styles.container} keyboardShouldPersistTaps={true}>
        <View style={styles.content}>
          <View>
            <Text style={styles.header}>Tell us about your alarm</Text>
            <PlainButton onPress={() => this.setState({ showModal: true })} textStyle={styles.plainButtonText}>Where can I find this?</PlainButton>
            <View style={styles.buttonRow}>
              <Text style={styles.pickerLabel}>Manufacturer</Text>
              <TouchableOpacity style={styles.dropdownButton}onPress={this.showBrandsPicker.bind(this)}>
                <Text style={styles.pickerSelection}>{this.state.alarmBrand}</Text>
                <Image source={Images.arrowDown}/>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <Text style={styles.pickerLabel}>Model</Text>
              <TouchableOpacity style={styles.dropdownButton} onPress={this.showModelsPicker.bind(this)}>
                <Text style={styles.pickerSelection}>{this.state.alarmModel}</Text>
                <Image source={Images.arrowDown}/>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <Text style={styles.pickerLabel}>Manufacturing date</Text>
              <TouchableOpacity style={styles.dropdownButton}onPress={this.showDatePicker.bind(this)}>
                <Text style={styles.pickerSelection}>{this.manufactureDate()}</Text>
                <Image source={Images.arrowDown}/>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <Text style={styles.powerSourceLabel}>Power source</Text>
              <RadioForm
                radio_props={[{ label: 'Battery only', value: 0 }, { label: 'Hardwired with battery backup', value: 1 }]}
                initial={this.state.alarmPowerSource}
                onPress={(value) => {this.setState({ alarmPowerSource: value })}}
              />
            </View>
          </View>
          <View>
            { this.props.showSkip && <PlainButton onPress={() => this.props.onSkip(this.props.addressId)} textStyle={styles.plainButtonText}>
              Skip this step
            </PlainButton> }
            <RoundedButton style={styles.roundedButton} onPress={() => this.onSave()}>Save</RoundedButton>
          </View>
          <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this.setState({ showModal: false })}
            supportedOrientations={['portrait']}
            >
            <View style={styles.modal}>
              <View style={styles.modalContainer}>
                <Image style={{ width: this.state.imageWidth, height: this.state.imageHeight }} source={Images.alarmInfo} />
                <View style={styles.innerModalContainer}>
                  <Text style={styles.text}>Remove your smoke alarm from the ceiling. Locate the manufacturer information on the back of the alarm</Text>
                  <RoundedButton onPress={() => this.setState({ showModal: false })}>OK</RoundedButton>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { loading, alarmModels } = state.createDevice
  const { updatingDevice, error } = state.updateDevice
  const { devices } = state.devices
  const { deviceId } = ownProps
  const device = R.find(R.propEq('objectId', deviceId), R.flatten(R.values(devices)))

  return {
    addressId: device.pAddress.objectId,
    updating: updatingDevice,
    initialValues: device,
    loading,
    error,
    alarmModels,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAlarmModels: () => {
      dispatch(Actions.getAlarmModels())
    },
    onSave: (deviceId, updates) => {
      dispatch(Actions.updateDevice(deviceId, updates))
    },
    onSkip: (addressId) => {
      dispatch(Actions.resetProvisionState())
      NavigationActions.loggedInContent({ initialAddress: addressId })
    },
    resetProvisionState: () => {
      dispatch(Actions.resetProvisionState())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceAlarmInfoScreen)

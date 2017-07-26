import React from 'react'
import {
  KeyboardAvoidingView, Linking, ScrollView, Text, View, findNodeHandle, Keyboard,TouchableOpacity,
} from 'react-native'
import TextInput from '../Components/TextInput'
import LoadingIndicator from '../Components/LoadingIndicator'
import DrawerButton from '../Components/DrawerButton'
import { Images } from '../Themes'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import R from 'ramda'
import Communications from 'react-native-communications'

// Styles
import styles from './Styles/AddressFormStyle'

// I18n
import I18n from '../I18n/I18n.js'

const labels = {
  address: 'Nickname',
  city: 'City',
  country: 'Country',
  emergencyName: 'Name',
  emergencyNumber: 'Number',
  street: 'Street',
  state: 'State',
  zipCode: 'Zip Code',
}

const editableFields = [
  'address', 'city', 'country', 'emergencyName', 'emergencyNumber', 'state', 'street', 'zipCode'
]

export default class AddressForm extends React.Component {

  static propTypes = {
    address: React.PropTypes.shape({
      address: React.PropTypes.string,
      city: React.PropTypes.string,
      country: React.PropTypes.string,
      emergencyName: React.PropTypes.string,
      emergencyNumber: React.PropTypes.string,
      state: React.PropTypes.string,
      street: React.PropTypes.string,
      zipCode: React.PropTypes.string,
    }),
    editable: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    onDelete: React.PropTypes.func,
    saveAddress: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    address: {},
    editable: true
  }

  constructor (props) {
    super(props)
    this.state = this.getStateFromProps(props)

    // When keyboard hides scroll to top of view
    this.keyboardListener = Keyboard.addListener('keyboardDidHide', (frames) => {
      if (this.refs.scrollView) {
        this.refs.scrollView.scrollTo({ y: 0 })
      }
    });
  }

  getStateFromProps (props) {
    return R.pick(editableFields, props.address)
  }

  componentWillUnmount () {
    this.keyboardListener.remove()
  }

  updateField = (fieldName, value) => {
    this.setState({ [fieldName]: value })
  }

  inputFocused (refName) {
    // Scroll to input
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        110, // additional offset
        true
      );
    }, 50);
  }

  makeEmergencyNumber () {
    let emergencyNumberView
    if (this.props.address.emergencyNumber !== '' && this.props.address.emergencyNumber !== null && this.props.address.emergencyNumber !== undefined ){
        emergencyNumberView = (
            <View style={styles.row}>
                <Text style={styles.label}>{labels['emergencyNumber']}</Text>
                <TextInput
                    keyboardType='numeric'
                    ref={'emergencyNumber'}
                    onFocus={this.inputFocused.bind(this, 'emergencyNumber')}
                    value={this.state['emergencyNumber']}
                    onChange={(event) => this.updateField('emergencyNumber', event.nativeEvent.text)}
                    style={styles.emergencyInput}
                    editable={this.props.editable}
                />
                {this.props.address.emergencyNumber != '' && this.props.address.emergencyNumber !== null && this.props.address.emergencyNumber !== 'undefined' && <TouchableOpacity onPress={() => Communications.phonecall(this.props.address.emergencyNumber, true)}>
                  <Icon name='ios-call' style={styles.callIcon}/>
                </TouchableOpacity>}
            </View>
        )
    } else {
        emergencyNumberView = (
            <View style={styles.row}>
                <Text style={styles.label}>{labels['emergencyNumber']}</Text>
                <TextInput
                    keyboardType='numeric'
                    ref={'emergencyNumber'}
                    onFocus={this.inputFocused.bind(this, 'emergencyNumber')}
                    value={this.state['emergencyNumber']}
                    onChange={(event) => this.updateField('emergencyNumber', event.nativeEvent.text)}
                    style={styles.input}
                    editable={this.props.editable}
                />
            </View>
        )
    }
    return emergencyNumberView
  }

  makeInput = (fieldName) => (
    <View style={styles.row}>
      <Text style={styles.label}>{labels[fieldName]}</Text>
      <TextInput
        ref={fieldName}
        onFocus={this.inputFocused.bind(this, fieldName)}
        value={this.state[fieldName]}
        onChange={(event) => this.updateField(fieldName, event.nativeEvent.text)}
        style={styles.input}
        editable={this.props.editable}
      />
    </View>
  )

  render () {
    if (this.props.loading) {
      return <LoadingIndicator />
    }

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={true} ref="scrollView">
        <Text style={styles.heading}>Address</Text>
        { this.makeInput('address') }
        { this.makeInput('street') }
        { this.makeInput('city') }
        { this.makeInput('state') }
        { this.makeInput('zipCode') }
        { this.makeInput('country') }
        <Text style={styles.heading}>Emergency Contact </Text>
        { this.makeInput('emergencyName') }
        { this.makeEmergencyNumber()}
        { this.props.editable && this.props.onDelete && <DrawerButton
          text='Delete Address'
          rowStyle={styles.deleteRow}
          textStyle={styles.deleteText}
          hideChevron={true}
          icon={Images.trash}
          onPress={this.props.onDelete} /> }

        <View style={styles.forceScrolling} />

      </ScrollView>

    )
  }
}

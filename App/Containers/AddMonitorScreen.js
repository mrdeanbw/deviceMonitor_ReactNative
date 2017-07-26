import React from 'react'
import {
  Alert,
  Image,
  InteractionManager,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
  ListView,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import LoadingIndicator from '../Components/LoadingIndicator'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Images from '../Themes/Images'
import PlainButton from '../Components/PlainButton'
import PhoneNumber from '../Components/PhoneNumber'
import TextInput from '../Components/TextInput'
import { sanitizePhoneNumber, numberWithCountryCode } from '../Lib/Utilities'
import R from 'ramda'

// Styles
import styles from './Styles/AddMonitorScreenStyle'

class AddMonitorScreen extends React.Component {

  static propTypes = {
    country: React.PropTypes.shape({
      code: React.PropTypes.number
    }),
    ownPhoneNumber: React.PropTypes.string,
    error: React.PropTypes.string,
    creating: React.PropTypes.bool,
    loadingContacts: React.PropTypes.bool,
    contactsAccess: React.PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: null,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      contactsFilter: '',
      loadingContacts: true
    }
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(async () => {
      let getContacts = true
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        try {
          const granted = await PermissionsAndroid.requestPermission(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              'title': 'Enable Access to Contacts',
              'message': 'Your contacts are used when adding new monitors',
            },
          );

          if (!granted) {
            getContacts = true
          }
        } catch (err) {
          getContacts = false
        }
      }
      if (getContacts) {
        this.props.loadContacts()
      } else {
        this.enterPhoneNumberView()
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loadingContacts && !nextProps.loadingContacts) {
      this.setState({ loadingContacts: false })
    }

    if (this.props.creating && !nextProps.creating) {
      if (nextProps.error) {
        Alert.alert('', 'There was an error inviting the new monitor. Please try again')
      } else {
        NavigationActions.dashboard()
      }
    }
  }

  updatePhoneNumber (event) {
    this.setState({
      phoneNumber: event.nativeEvent.text
    })
  }

  confirmationAlert (number) {
    Alert.alert(
      '',
      `Please make sure to invite Monitors using their mobile phone number. Are you sure you want to send an invite to ${number}?`,
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Confirm', onPress: () => this.props.createMonitor(number) }
      ]
    )
  }

  numberEntered () {
    const countryCode = this.props.country.code
    const phoneNumber = this.state.phoneNumber
    const sanitizedNumber = sanitizePhoneNumber(phoneNumber)
    const formattedPhoneNumber = `+${countryCode}${sanitizedNumber}`
    const formattedPhoneNumberWithCountryCode = `+${sanitizedNumber}`
    console.log(formattedPhoneNumber)
    console.log(phoneNumber)
    console.log(formattedPhoneNumberWithCountryCode)
    console.log(this.props.ownPhoneNumber)
    if (!sanitizedNumber || !countryCode) {
      return Alert.alert('', 'Please enter a phone number')
    }else if (formattedPhoneNumber === this.props.ownPhoneNumber || phoneNumber === this.props.ownPhoneNumber || formattedPhoneNumberWithCountryCode === this.props.ownPhoneNumber) {
        return Alert.alert('', 'You cannot add yourself as a monitor')
    } else if (countryCode === 1 && sanitizedNumber.startsWith('1')) {
        if(phoneNumber.startsWith('+')){
            this.confirmationAlert(phoneNumber)
        } else {
            this.confirmationAlert(formattedPhoneNumberWithCountryCode)
        }
    } else if (sanitizedNumber.startsWith('0')) {
    return Alert.alert('Invalid phone number', 'Your phone number cannot begin with a 0')
    }
    else{
        this.confirmationAlert(formattedPhoneNumber)
    }
  }

  contactSelected (number) {
    const countryCode = this.props.country.code
    const formattedPhoneNumber = `+${countryCode}${number}`
    const contactWithCountryCode = `+${number}`
    console.log("formattedPhoneNumber"+formattedPhoneNumber)
    console.log("this.props.ownPhoneNumber"+this.props.ownPhoneNumber)
    if (formattedPhoneNumber === this.props.ownPhoneNumber) {
      return Alert.alert('', 'You cannot add yourself as a monitor')
    }
    if(this.props.ownPhoneNumber === contactWithCountryCode){
        return Alert.alert('', 'You cannot add yourself as a monitor')
    }
    this.confirmationAlert(numberWithCountryCode(number, countryCode))
  }

  filterContacts () {
    const lowerCaseWordChars = (string) => R.toLower(string.replace(/\W/g, ""))
    const queryMatch = (contact) => {
      const fullName = lowerCaseWordChars(`${contact.firstName}${contact.lastName}`)
      if (fullName.includes(query)) {
        return true
      }
      for (const number of contact.phoneNumbers) {
        if (number.number.includes(query)) {
          return true
          break
        }
      }
    }
    const contacts = this.props.contacts
    const query = lowerCaseWordChars(this.state.contactsFilter)
    if (query.length === 0) {
      return contacts
    }
    return R.filter(queryMatch, contacts)
  }

  profileImageFor (contact) {
    const profileThumbnailPath = contact.thumbnailPath
    if (R.isEmpty(profileThumbnailPath)) {
      return Images.profile
    }
    return { uri: profileThumbnailPath }
  }

  listViewRow (contact) {
    const mapIndexed = R.addIndex(R.map)
    const numberAndLabel = (number) => {
      if (number.label && number.label.length > 0) {
        return `${number.label}: ${number.number}`
      }
      return number.number
    }
    const numberRow = (number, index) => (
      <TouchableOpacity style={styles.phoneNumberContainer} key={index} onPress={() => this.contactSelected(number.number)}>
        <Text style={styles.phoneNumber}>{numberAndLabel(number)}</Text>
        <View style={styles.inviteButton}>
          <Text style={styles.inviteButtonText}>Send Invite</Text>
        </View>
      </TouchableOpacity>
    )
    return (
      <View style={styles.contactContainer}>
        <View style={styles.nameContainer}>
          <Image style={styles.thumbnail} source={this.profileImageFor(contact)}/>
          <Text style={styles.contactName}>{contact.firstName} {contact.lastName}</Text>
        </View>
        { mapIndexed(numberRow, contact.phoneNumbers) }
      </View>
    )
  }

  enterPhoneNumberView () {
    const prompt = "No contacts found"
    return [
      <View key='1' style={styles.textContainer}>
        <Text style={styles.text}>{prompt}</Text>
      </View>,
      <View key='2' style={styles.contactContainer}>
        <View style={styles.nameContainer}>
            <Image style={styles.thumbnail} source={Images.profile}/>
        </View>
        <TouchableOpacity style={styles.phoneNumberContainer} onPress={() => this.numberEntered()}>
            <Text style={styles.phoneNumber}>{this.state.phoneNumber}</Text>
            <View style={styles.inviteButton}>
                <Text style={styles.inviteButtonText}>Send Invite</Text>
            </View>
        </TouchableOpacity>
            </View>
    ]
  }

  searchBarView () {
    return (
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or number..."
        onChangeText={(query) => this.setState({ contactsFilter: query, phoneNumber: query })}/>
    )
  }

  contactsListView (data) {
    return (
      <ListView
        keyboardShouldPersistTaps={true}
        dataSource={this.state.dataSource.cloneWithRows(data)}
        renderRow={this.listViewRow.bind(this)} />
    )
  }

  render () {
    if (this.props.creating || this.state.loadingContacts) {
      return <LoadingIndicator />
    }

    if (!this.props.contactsAccess) {
      const prompt = "You have not allowed Roost to access your contacts. To enable, please change the Roost settings in your phone settings menu. Otherwise, enter the mobile phone number of the person you would like to invite below"
      return (
        <View style={styles.container}>
          { this.enterPhoneNumberView(prompt)}
        </View>
      )
    }

    const data = this.filterContacts()
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.innerContainer} keyboardVerticalOffset={80} behavior='padding'>
          { this.searchBarView() }
          { data.length === 0 ? this.enterPhoneNumberView() : this.contactsListView(data) }
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { loading, contactsAccess, contacts } = state.contacts
  const { creating, error } = state.createMonitor
  return {
    country: state.selectedCountry,
    ownPhoneNumber: state.user.phoneNumber,
    loadingContacts: loading,
    contactsAccess,
    contacts,
    creating,
    error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadContacts: () => {
      const requestPermissions = true
      dispatch(Actions.loadContacts(requestPermissions))
    },
    createMonitor: (formattedPhoneNumber) => {
      dispatch(Actions.createMonitor(formattedPhoneNumber, ownProps.addressId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMonitorScreen)

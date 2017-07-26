import React from 'react'
import { 
    Alert, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
    View, 
    InteractionManager, 
    PermissionsAndroid, 
    Platform
 } from 'react-native'
import { connect } from 'react-redux'
import AddressHeader from '../Containers/AddressHeader'
import LoadingIndicator from '../Components/LoadingIndicator'
import Actions from '../Actions/Creators'
// external libs
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Communications from 'react-native-communications'

// Styles
import styles from './Styles/ViewMonitorsScreenStyle'

// I18n
import I18n from 'react-native-i18n'


class Monitor extends React.Component {
  static propTypes = {
    deleteMonitor: React.PropTypes.func.isRequired,
    monitor: React.PropTypes.shape({
      firstName: React.PropTypes.string,
      lastName: React.PropTypes.string,
      objectId: React.PropTypes.string,
      invitee: React.PropTypes.string,
    })
  }

  render () {
    const { firstName, lastName, invitee, objectId } = this.props.monitor
    let name
    if (firstName || lastName) {
      name = <Text style={styles.monitorText}>{firstName} {lastName}</Text>
    }
    return (
      <View style={styles.monitorContainer}>
        <View style={styles.monitorDetails}>
          { name }
          <Text style={styles.monitorText}>{invitee}</Text>
        </View>

        <View style={styles.deleteContainer}>
          <TouchableOpacity onPress={() => Communications.phonecall(invitee, true)}>
            <Icon name='ios-call' style={styles.callIcon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.deleteMonitor(objectId)}>
            <Icon name='ios-trash-outline' style={styles.deleteIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class ViewMonitorsScreen extends React.Component {

  static propTypes = {
    addressId: React.PropTypes.string.isRequired,
    deleteMonitor: React.PropTypes.func.isRequired,
    deleting: React.PropTypes.bool,
    error: React.PropTypes.string,
    monitors: React.PropTypes.array
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
        }
      })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.deleting && !nextProps.deleting) {
      if (nextProps.error) {
        Alert.alert('Could not terminate monitor', nextProps.error)
      } else {
        if (!nextProps.monitors.length) {
          NavigationActions.pop()
        }
      }
    }
  }

  deleteMonitor (monitorId) {
    Alert.alert(
      'Remove monitor?',
      'Are you sure you want to remove this monitor? The user will no longer be able to monitor your devices',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Remove', onPress: () => this.props.deleteMonitor(monitorId), style: 'destructive' }
      ]
    )
  }

  render () {
    if (this.props.deleting) {
      return <LoadingIndicator />
    }
    let monitors = []
    for (const monitor of this.props.monitors) {
      monitors.push(<Monitor key={monitor.invitee} monitor={monitor} deleteMonitor={this.deleteMonitor.bind(this)}/>)
    }

    return (
      <ScrollView style={styles.container}>
        <AddressHeader addressId={this.props.addressId} />
        <View style={styles.hr}/>
        <Text style={styles.heading}>Monitors</Text>
        {monitors}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { deleting, error, monitors } = state.monitors
  const { addressId } = ownProps

  return {
    deleting,
    error,
    monitors: monitors[addressId] || [],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadContacts: () => {
        const requestPermissions = true
        dispatch(Actions.loadContacts(requestPermissions))
    },
    deleteMonitor: (monitorId) => dispatch(Actions.deleteMonitor(monitorId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMonitorsScreen)

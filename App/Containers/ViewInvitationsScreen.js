import React from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import LoadingIndicator from '../Components/LoadingIndicator'
// external libs
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/ViewInvitationsScreenStyle'

// I18n
import I18n from 'react-native-i18n'

const Button = ({ icon, style, text, onPress  }) => (
  <TouchableOpacity onPress={ onPress } style={[styles.button, style]}>
    <Icon name={icon} style={styles.buttonIcon} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
)

const InvitationText = ({ text }) => (
  <Text style={styles.invitationText}>
    { text }
  </Text>
)

const PendingInvitation = ({ invitationText, onAccept, onReject }) => (
  <View style={styles.invitationContainer}>
    <InvitationText text={invitationText}/>
    <View style={styles.buttonRow}>
      <Button style={styles.rejectButton} icon='ios-close' text='Reject' onPress={ onReject }/>
      <Button style={styles.acceptButton} icon='ios-checkmark' text='Accept' onPress={ onAccept }/>
    </View>
  </View>
)

const AcceptedInvitation = ({ invitationText, onTerminate }) => (
  <View style={styles.invitationContainer}>
    <InvitationText text={invitationText}/>
    <View style={styles.buttonRow}>
      <Button style={styles.rejectButton} icon='ios-close' text='Stop Monitoring' onPress={ onTerminate }/>
    </View>
  </View>
)

const SentInvitation = ({ invitationText, type , onTerminate }) => (
  <View style={styles.invitationContainer}>
    <InvitationText text={invitationText}/>
    <View style={styles.buttonRow}>
      <Button style={styles.rejectButton} icon='ios-close' text={ type === 'pending' ? 'Cancel Invitation' : 'Delete Monitor'} onPress={ onTerminate }/>
    </View>
  </View>
)

const NoInvitationsMessage = () => (
  <View style={styles.noInvitationsContainer}>
    <Text style={styles.noInvitationsText}>You have no outstanding invitations</Text>
  </View>
)

const NoSentInvitationsMessage = () => (
  <View style={styles.noInvitationsContainer}>
    <Text style={styles.noInvitationsText}>You have no monitors</Text>
  </View>
)

class ViewInvitationsScreen extends React.Component {

  static propTypes = {
    loading: React.PropTypes.bool,
    invitations: React.PropTypes.array,
    sentInvitations: React.PropTypes.array,
    accept: React.PropTypes.func.isRequired,
    reject: React.PropTypes.func.isRequired,
    terminate: React.PropTypes.func.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loading && !nextProps.loading) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      } else {
        NavigationActions.dashboard()
      }
    }
  }

  render () {
    if (this.props.loading) {
      return <LoadingIndicator />
    }

    let invitations = []
    let sentInvitations = []
    let invitationMsg = ''
    this.props.invitations.forEach((invitation) => {
      if (invitation.status === 'invite') {
        return invitations.unshift(
          <PendingInvitation
            key={invitation.objectId}
            invitationText={invitation.invitationText}
            onAccept={() => this.props.accept(invitation.objectId)}
            onReject={() => this.props.reject(invitation.objectId)}
          />
        )
      }

      invitations.push(
        <AcceptedInvitation
          key={invitation.objectId}
          invitationText={invitation.invitationText}
          onTerminate={() => this.props.terminate(invitation.objectId)}
        />
      )
    })
    this.props.sentInvitations.forEach((sentInvitation) => {
        if (sentInvitation.status === 'invite') {
            if(sentInvitation.firstName == ''){
                invitationMsg = 'You have invited ' + sentInvitation.invitee + ' to monitor your Roost devices'
            }else{
                invitationMsg = 'You have invited ' + sentInvitation.firstName + ' ' + sentInvitation.lastName + ' to monitor your Roost devices'
            }
            return sentInvitations.unshift(
                <SentInvitation
                    key={sentInvitation.objectId}
                    invitationText= { invitationMsg }
                    type = 'pending'
                    onTerminate={() => this.props.terminate(sentInvitation.objectId)}
                />
            )
        }
    })

    return (
      <ScrollView style={styles.container}>
        { invitations.length ? invitations : <NoInvitationsMessage /> }
        <View style={styles.divide}>
            { sentInvitations.length ? sentInvitations : <NoSentInvitationsMessage /> }
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { error, invitations, sentInvitations, updating } = state.monitors
  return {
    error,
    invitations,
    sentInvitations,
    loading: updating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    accept: (invitationId) => dispatch(Actions.acceptInvitation(invitationId)),
    reject: (invitationId) => dispatch(Actions.rejectInvitation(invitationId)),
    terminate: (invitationId) => dispatch(Actions.terminateInvitation(invitationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewInvitationsScreen)

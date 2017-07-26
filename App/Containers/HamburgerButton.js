import React from 'react'
import { Image, TouchableOpacity, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Images } from '../Themes'
import R from 'ramda'

// Styles
import styles from './Styles/HamburgerButtonStyle'

const toggleDrawer = () => {
  NavigationActions.refresh({
    key: 'loggedInContent',
    drawerOpen: value => !value
  })
}

class HamburgerButton extends React.Component {

  static propTypes = {
    hasInvitations: React.PropTypes.bool,
    numInvitationsText: React.PropTypes.string,
  }

  static defaultProps = {
    hasInvitations: false,
    numInvitationsText: ''
  }

  render () {
    return (
      <TouchableOpacity onPress={toggleDrawer} style={styles.buttonContainer}>
        <Image source={Images.hamburger} style={styles.hamburger} />
        { this.props.hasInvitations && <View style={styles.invitationMarker}>
            <Text style={styles.invitationNumber}>{this.props.numInvitationsText}</Text>
          </View>
        }
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  const { invitations } = state.monitors
  const pendingInvitationCount = R.filter(R.propEq('status', 'invite'), invitations).length
  const hasInvitations = pendingInvitationCount > 0
  let numInvitationsText = ''
  if (hasInvitations) {
    numInvitationsText = pendingInvitationCount > 9 ? '+' : `${pendingInvitationCount}`
  }
  return {
    hasInvitations,
    numInvitationsText
  }
}

export default connect(mapStateToProps)(HamburgerButton)

import React, { Component, PropTypes } from 'react'
import { Alert, ScrollView, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/DrawerContentStyle'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Images from '../Themes/Images'
import Actions from '../Actions/Creators'
import R from 'ramda'
import Icon from 'react-native-vector-icons/Ionicons'

class DrawerContent extends Component {

  static propTypes = {
    invitationCount: PropTypes.number,
    logout: PropTypes.func.isRequired
  }

  static contextTypes = {
    drawer: PropTypes.object
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handleChangePassword = () => {
    this.toggleDrawer()
    NavigationActions.changePassword()
  }

  handleProfile = () => {
    this.toggleDrawer()
    NavigationActions.profile()
  }

  handleMonitorships = () => {
    this.toggleDrawer()
    NavigationActions.invitations()
  }

  handleAbout = () => {
    this.toggleDrawer()
    NavigationActions.about()
  }

  handleHelp = () => {
      this.toggleDrawer()
      NavigationActions.help()
    }

  handleLogout = () => {
    Alert.alert(
      'Are you sure you want to log out?',
      'Warning! If you log out of your Roost account, you will not be able to receive alarm notifications on your phone',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'Logout', onPress: () => {
          this.props.logout()
          NavigationActions.homeScreen({ type: 'replace' })
        } }
      ]
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle='default'/>
        <DrawerButton text='Profile' icon={Images.person} onPress={this.handleProfile} />
        <DrawerButton text='Change Password' icon={Images.key} onPress={this.handleChangePassword} />
        <DrawerButton text='Invitations' icon={Images.person} onPress={this.handleMonitorships} notifications={this.props.pendingInvitationCount}/>
        <DrawerButton text='Help' icon={Images.help} onPress={this.handleHelp} />
        <DrawerButton text='About' icon={Images.information} onPress={this.handleAbout} />
        <DrawerButton text='Logout' rowStyle={styles.logoutRow} icon={Images.exit} onPress={this.handleLogout} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { invitations } = state.monitors
  const pendingInvitationCount = R.filter(R.propEq('status', 'invite'), invitations).length
  return {
    pendingInvitationCount
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteAccount: () => {
    dispatch(Actions.deleteUser())
    NavigationActions.homeScreen({ type: 'replace', isLoggedIn: false })
  },
  logout: () => dispatch(Actions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)

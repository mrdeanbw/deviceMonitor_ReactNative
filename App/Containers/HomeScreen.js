import React, {PropTypes} from 'react'
import { Dimensions, ScrollView, StatusBar, Text, Image, View, Platform } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import PlainButton from '../Components/PlainButton'
import APIConfig from '../Config/API'
import DeviceInfo from 'react-native-device-info'

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends React.Component {

  static propTypes = {
    isLoggedIn: PropTypes.bool
  }

  componentDidMount () {
    this.redirectIfLoggedIn(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.redirectIfLoggedIn(nextProps)
  }

  redirectIfLoggedIn (props) {
    if (props.isLoggedIn) {
      NavigationActions.loggedInContent({type: 'replace'})
    }
  }

  render () {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.itemsContainer}>
          <Image source={Images.logo} style={styles.logo}/>
          <Text style={styles.version}>Version {this.props.version} {APIConfig.name}</Text>
        </View>
        <View style={styles.itemsContainer}>
          <Image source={Images.home} style={styles.logo}/>
          <Text style={styles.tagline}>Peace of mind when you are away</Text>
        </View>
        <View style={styles.itemsContainer}>
          <PlainButton onPress={NavigationActions.enterPhoneNumber} textStyle={styles.login}>Create New Account</PlainButton>
          <PlainButton onPress={NavigationActions.login} textStyle={styles.login}>Login to Existing Account</PlainButton>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.hasOwnProperty('isLoggedIn')) {
    return {}
  }
  let appVersion
      switch (Platform.OS) {
      case 'ios':
//        appVersion = DeviceInfo.getReadableVersion()
    appVersion = DeviceInfo.getVersion()
        break
      case 'android':
        appVersion = DeviceInfo.getVersion()
  }
  return {
    isLoggedIn: state.user.sessionToken !== null,
    version: appVersion
  }
}

export default connect(mapStateToProps)(HomeScreen)

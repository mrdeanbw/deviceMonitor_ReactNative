import React from 'react'
import { Platform,Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import Images from '../Themes/Images'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import DeviceInfo from 'react-native-device-info'
import APIConfig from '../Config/API'

// Styles
import styles from './Styles/AboutScreenStyle'

class AboutScreen extends React.Component {

  render () {

    return (
      <View style={styles.container}>
        <View style={styles.itemsContainer}>
          <Text style={styles.title}>Roost Smart Home</Text>
          <Text style={styles.version}>Version {this.props.version} {APIConfig.name}</Text>
          <Image source={Images.logo} style={styles.logo} resizeMode='contain' />
          <Text style={styles.copyright}>&copy; {this.props.copyrightYear} Roost Inc.</Text>
        </View>
        <View style={styles.itemsContainer}>
          <TouchableOpacity onPress={() => Linking.openURL('http://getroost.com/importantinfo')}>
            <Text style={styles.link}>Important Information</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('http://getroost.com/terms.html')}>
            <Text style={styles.link}>Terms and Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity
                onPress={() => Linking.openURL('http://getroost.com/privacy.html')}>
            <Text style={styles.link}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
    let appVersion
    switch (Platform.OS) {
    case 'ios':
//      appVersion = DeviceInfo.getReadableVersion()
        appVersion = DeviceInfo.getVersion()
      break
    case 'android':
      appVersion = DeviceInfo.getVersion()
    }
  return {
    copyrightYear: (new Date().getFullYear()),
    version: appVersion
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen)

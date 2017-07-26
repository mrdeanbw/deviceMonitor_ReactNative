import React from 'react'
import { Image, Text, View } from 'react-native'
import { Actions as Nav } from 'react-native-router-flux'
import RoundedButton from '../Components/RoundedButton'
import styles from './Styles/DeviceSetupStyle'

class DeviceSetup extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={this.props.image} resizeMode='cover'/>
        <View style={styles.childrenContainer}>
          <View style={styles.placeholder}/>
            { this.props.children }
          <View style={styles.placeholder}/>
        </View>
        <View style={styles.row}>
          <RoundedButton style={styles.button} onPress={this.props.nextScene}>Next</RoundedButton>
        </View>
      </View>
    )
  }
}

export default DeviceSetup

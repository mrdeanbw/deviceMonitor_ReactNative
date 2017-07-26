import React from 'react'
import { Image, View } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/RoostNavLogoStyle'

export default class RoostNavLogo extends React.Component {

  render () {
    return (
      <Image source={Images.logo} style={styles.logo} resizeMode='contain' />
    )
  }
}


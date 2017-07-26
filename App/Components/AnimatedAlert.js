import React from 'react'
import Images from '../Themes/Images'
import * as Animatable from 'react-native-animatable'

import styles from './Styles/AnimatedAlertStyles'

export default () => (
  <Animatable.Image
    source={Images.iconAlert}
    style={styles.batteryStatus}
    resizeMode='cover'
    animation='swing'
    duration={750}
    iterationCount='infinite' />
)

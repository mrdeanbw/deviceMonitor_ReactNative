import React from 'react'
import Images from '../Themes/Images'
import * as Animatable from 'react-native-animatable'

import styles from './Styles/AnimatedWaterStyles'

export default () => (
  <Animatable.Image
    source={Images.iconWaterAlert}
    style={styles.batteryStatus}
    resizeMode='contain'
    animation='swing'
    duration={750}
    iterationCount='infinite' />
)

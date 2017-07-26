import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import styles from './Styles/NavItemsStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../Themes'
import HamburgerButton from '../Containers/HamburgerButton'
import Images from '../Themes/Images'

export default {
  backButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon name='angle-left'
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton () {
    return <HamburgerButton />
  },

  emptyButton () {
    return (
        <Image source={Images.empty} />
    )
  },

}

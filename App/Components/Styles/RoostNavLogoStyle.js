'use strict'

import { Platform, StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  logo: {
    alignSelf: 'center',
    height: 20,
    width: 74,
    marginTop: 10,
    ...Platform.select({
      ios: {
        top: 20,
      },
      android: {
        top: 5,
      },
    }),
  }
})


'use strict'

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingHorizontal: Metrics.largeMargin,
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.blue,
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: Fonts.size.regular
  }
})

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    justifyContent: 'center',
    paddingTop: Metrics.navBarHeight,
    padding: 50
  },
  itemsContainer: {
    alignItems: 'center'
  },
  logo: {
    height: 100,
    margin: Metrics.doubleBaseMargin,
    marginBottom: 0
  },
  copyright: {
    color: Colors.snow,
    fontSize: Fonts.size.small,
  },
  version: {
    color: Colors.snow
  },
  title: {
    color: Colors.snow,
    fontSize: Fonts.size.h4,
  },
  link: {
    color: Colors.white,
    textDecorationLine: 'underline',
    marginTop: Metrics.baseMargin
  }
})

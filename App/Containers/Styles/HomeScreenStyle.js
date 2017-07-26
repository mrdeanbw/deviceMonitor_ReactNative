import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    justifyContent: 'space-between',
    paddingTop: Metrics.navBarHeight,
    padding: 50
  },
  itemsContainer: {
    alignItems: 'center'
  },
  tagline: {
    marginTop: 20,
    color: Colors.snow,
    fontSize: Fonts.size.h4,
    textAlign: 'center',
  },
  login: {
    fontSize: Fonts.size.regular
  },
  version: {
      color: Colors.snow
  },
  logo: {
    marginBottom: 10
  },
})

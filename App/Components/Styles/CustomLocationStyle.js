import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray
  },
  content: {
    marginTop: Metrics.largeMargin,
    marginHorizontal: Metrics.largeMargin
  },
  input: {
    flex: 1,
    height: Metrics.largeMargin,
    backgroundColor: Colors.snow,
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
  },
  text: {
    fontSize: Fonts.size.regular,
    textAlign: 'center'
  }
})

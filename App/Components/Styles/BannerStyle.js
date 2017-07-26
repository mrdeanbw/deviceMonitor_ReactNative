import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding,
    alignItems: 'center',
    justifyContent: 'center',
    margin: Metrics.baseMargin,
    marginBottom: 0,
    borderRadius: Metrics.buttonRadius,
  },
  containerOk: {
    backgroundColor: Colors.green
  },
  containerWarning: {
    backgroundColor: Colors.warning
  },
  containerAlert: {
    backgroundColor: Colors.alert
  },
  bannerText: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
    margin: Metrics.smallMargin,
  },
  bannerTextOk: {
    color: Colors.snow,
  },
  bannerTextWarning: {
    color: Colors.charcoal
  },
  bannerTextAlert: {
    color: Colors.snow
  }
})

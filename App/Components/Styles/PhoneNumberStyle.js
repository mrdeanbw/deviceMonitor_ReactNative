import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: Metrics.largeMargin,
    backgroundColor: Colors.snow,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray
  },
  borderRight: {
    flex: 0.15,
    borderRightWidth: 1,
    borderRightColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
  },
  icon: {
    color: Colors.charcoal
  },
  countrySelect: {
    flex: 1
  },
  countryCodeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  countryCode: {
    textAlign: 'center',
    fontSize: Fonts.size.input,
    color: Colors.charcoal
  },
  countryTextStyle: {
    color: Colors.charcoal,
    fontSize: Fonts.size.input
  },
  phoneNumber: {
    flex: 0.85,
    paddingLeft: Metrics.baseMargin,
    color: Colors.charcoal,
    height: Metrics.largeMargin,
    fontSize: Fonts.size.input,
    paddingVertical: 0,
  },
})

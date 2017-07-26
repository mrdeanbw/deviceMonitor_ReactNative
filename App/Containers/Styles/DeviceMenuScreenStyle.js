import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.lightGray,
    marginTop: Metrics.navBarHeight
  },
  deviceName: {
    alignSelf: 'flex-start',
    marginLeft: Metrics.baseMargin,
    color: Colors.charcoal,
    fontSize: Fonts.size.regular,
  },
  buttonList: {
    margin: Metrics.baseMargin
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.baseMargin,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.gray
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRow: {
    justifyContent: 'space-between'
  },
  textContainer: {
    flexDirection: 'row'
  },
  icon: {
    fontSize: Fonts.size.h4,
    color: Colors.blue,
    marginRight: Metrics.smallMargin,
    textAlign: 'center',
    width: Metrics.largeMargin,
  },
  rowText: {
    fontSize: Fonts.size.h5,
    color: Colors.charcoal,
  },
  chevron: {
    tintColor: Colors.gray
  },
  deleteRow: {
    borderTopColor: Colors.red
  },
  batteryWifi: {
    flex: 0.25,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: Metrics.doubleBaseMargin,
  },
  indicator: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 0,
  },
  indicatorText: {
    marginHorizontal: Metrics.smallMargin
  },
  indicatorIcon: {
  },
  delete: {
    color: Colors.red
  }
})

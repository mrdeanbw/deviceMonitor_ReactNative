import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray
  },
  roomName: {
    alignSelf: 'flex-start',
    marginLeft: Metrics.baseMargin,
    color: Colors.charcoal,
    fontSize: Fonts.size.regular,
  },
  deviceContainer: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.smallMargin,
    margin: Metrics.baseMargin,
    padding: Metrics.baseMargin,
  },
  column: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  topRow: {
    justifyContent: 'space-between'
  },
  deviceIcon: {
    width: Metrics.largeMargin,
  },
  statusIcon: {
    height: 60,
    width: Metrics.largeMargin,
  },
  deviceName: {
    margin: Metrics.baseMargin,
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  snoozeContainer: {
    width: 100,
    flex: 0.25,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: Metrics.largeMargin,
  },
  snoozeButton: {
    backgroundColor: Colors.alert,
    paddingHorizontal: 20,
  },
  text: {
    color: Colors.charcoal
  },
  tempAndTime: {
    flex: 1,
    margin: Metrics.baseMargin,
  },
  tempContainer: {
    justifyContent: 'center'
  },
  tempHumText: {
    fontSize: Fonts.size.h5
  },
  textSeparator: {
    paddingHorizontal: Metrics.baseMargin,
    fontSize: Fonts.size.medium
  },
  batteryWifi: {
    flex: 0.25,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: Metrics.baseMargin,
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
  chevron: {
    tintColor: Colors.gray,
    alignSelf: 'flex-end'
  },
  fwdArrow:{
    flex: 0.05,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: Metrics.baseMargin,
  }
})

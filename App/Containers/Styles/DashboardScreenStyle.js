import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray,
  },
  addressContainer: {
    marginBottom: Metrics.smallMargin
  },
  roomContainer: {
    marginHorizontal: Metrics.baseMargin,
    marginTop: Metrics.smallMargin,
    marginBottom: 0,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Colors.gray
  },
  roomName: {
    alignSelf: 'flex-start',
    paddingTop: Metrics.smallMargin,
    color: Colors.charcoal,
    fontSize: Fonts.size.regular,
  },
  devicesContainer: {
    alignSelf: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    minHeight: 90,
    margin: Metrics.smallMargin,
    marginLeft: 0,
    marginBottom: 0,
  },
  monitorsContainer: {
    minHeight: 30,
    marginBottom: Metrics.softMenuHeight,
  },
  monitorTile: ApplicationStyles.deviceTile,
  monitorName: {
    fontSize: Fonts.size.regular,
    color: Colors.charcoal,
    textAlign: 'center'
  },
  noMonitorsBottomPadding: {
    marginBottom: Metrics.softMenuHeight,
  },
  arrow: {
    position: 'absolute',
    top: Metrics.doubleBaseMargin,
    height: 40,
    width: 10,
    tintColor: Colors.gray
  },
  tallArrow: {
    height: 60,
  },
  leftArrow: {
    left: 0,
  },
  rightArrow: {
    right: 0,
  },

})

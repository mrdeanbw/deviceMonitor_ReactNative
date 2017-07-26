import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    marginTop: Metrics.navBarHeight,
  },
  content: {
    marginTop: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.largeMargin
  },
  text: {
    fontSize: Fonts.size.regular,
    textAlign: 'center'
  },
  wifiName: {
    fontSize: Fonts.size.h2
  },
  input: {
    textAlign: 'center',
    height: Metrics.largeMargin,
    backgroundColor: Colors.snow,
    fontSize: Fonts.size.regular,
    marginTop: Metrics.baseMargin,
  },
  showHideButton: {
    color: Colors.lightBlue,
    marginTop: Metrics.baseMargin,
  },
  checkboxLabelStyle: {
    color: Colors.lightBlue
  },
  checkboxContainer: {
    marginTop: Metrics.doubleBaseMargin,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.smallMargin
  },
  rememberPwdInfoText: {
    marginTop: Metrics.baseMargin,
    textAlign: 'center'
  },
  networkInfoText: {
    marginTop: Metrics.doubleBaseMargin,
    textAlign: 'left'
  },
  settingsButton: {
    color: Colors.lightBlue
  },
  label: {
    fontSize: Fonts.size.regular,
    textAlign: 'left',
    marginTop: Metrics.doubleBaseMargin
  },
  link: {
    color: Colors.lightBlue
  },
  column: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: Metrics.screenWidth - 60
  },
  row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      flex: 1
  },
  bullet: {
      width: 10
  },
  bulletText: {
      flex: 1
  }
})

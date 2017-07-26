import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray
  },
  buttonRow: {
    ...ApplicationStyles.screen.buttonRow,
    margin: Metrics.doubleBaseMargin
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.snow,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin,
  },
  input: {
    flex: 1,
    height: Metrics.doubleBaseMargin,
    backgroundColor: Colors.snow,
    fontSize: Fonts.size.input,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 0,
  },
  loginButton: {
    height: Metrics.largeMargin,
  },
  loginText: {
    color: Colors.blue,
    fontSize: Fonts.size.h5,
    height: Metrics.largeMargin,
    marginVertical: 0
  },
  forgotPassword: {
    textDecorationLine: 'underline',
    fontSize: 12
  }
})

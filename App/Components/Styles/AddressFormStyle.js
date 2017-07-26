import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.white,
    paddingTop: 0,
  },
  inputContainer: {
    backgroundColor: Colors.white,
  },
  input: {
    marginHorizontal: Metrics.baseMargin,
    flex: 3,
    color: Colors.blue,
    fontSize: Fonts.size.regular,
    paddingVertical: 0,
    height: Metrics.largeMargin,
  },
  heading: {
    marginVertical: Metrics.baseMargin,
    alignSelf: 'flex-start',
    marginLeft: Metrics.baseMargin,
    color: Colors.charcoal,
    fontSize: Fonts.size.regular,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
  label: {
    color: Colors.gray,
    flex: 1,
    fontSize: Fonts.size.medium,
    padding: 10,
  },
  forceScrolling: {
    height: Metrics.screenHeight / 2
  },
  deleteText: {
    color: Colors.red,
    fontSize: Fonts.size.regular
  },
  deleteRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.red,
    borderBottomWidth: 0
  },
  callIcon: {
    fontSize: Fonts.size.h4,
    color: Colors.green,
    marginHorizontal: Metrics.largeMargin,
    marginVertical : Metrics.baseMargin,
    textAlign: 'right',
    width: Metrics.largeMargin,
  },
  emergencyInput: {
      marginHorizontal: Metrics.baseMargin,
      flex: 2,
      alignItems: 'flex-start',
      color: Colors.blue,
      fontSize: Fonts.size.regular,
      height: Metrics.largeMargin,
  },
})


import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    height: 45
  },
  topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 45
  },
  label: {
    color: Colors.gray,
    flex: 1,
    fontSize: Fonts.size.medium,
    padding: 10,
  },
  value: {
    color: Colors.blue,
    flex: 3,
    fontSize: Fonts.size.regular,
    padding: 10,
  },
  input: {
    margin: 0,
    alignSelf: 'center',
    color: Colors.blue,
    flex: 1,
    fontSize: Fonts.size.regular,
    height: 45,
    padding: 0,
  },
  inputContainer: {
    flex: 3,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearIcon: {
    color: Colors.gray,
    fontSize: Fonts.size.regular,
  },
    deleteRow: {
        borderTopWidth: 1,
        borderTopColor: Colors.red,
        borderBottomWidth: 0
    },
        deleteText: {
        color: Colors.red
    }
})

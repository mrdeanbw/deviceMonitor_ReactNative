import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.lightGray,
    marginTop: Metrics.navBarHeight,
    paddingTop: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    backgroundColor: Colors.white
  },
  label: {
    color: Colors.gray,
    fontSize: Fonts.size.medium,
  },
  value: {
    color: Colors.blue,
    fontSize: Fonts.size.regular,
  }
})

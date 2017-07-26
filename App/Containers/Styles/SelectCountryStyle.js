import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray
  },
  iconStyle: {
    color: Colors.blue
  },
  countryRow: {
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray
  },
  countryText: {
    marginLeft: 10,
    fontSize: 16
  }
})

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding,
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row'
  },
  item: {
    paddingRight: 10
  },
  icon: {
    width: 20
  }
})

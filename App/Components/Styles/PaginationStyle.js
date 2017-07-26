import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

const dot = {
  width: 8,
  height: 8,
  borderRadius: 4,
  margin: 3
}

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    backgroundColor: Colors.windowTint,
    ...dot,
  },
  activeDot: {
    backgroundColor: Colors.blue,
    ...dot,
  }
})

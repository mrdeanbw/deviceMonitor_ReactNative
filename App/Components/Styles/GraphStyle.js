import { Platform, StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 30,
  },
  tickLabelX: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? -30 : -35,
    fontSize: 12,
    textAlign: 'center',
  },

  ticksYContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  tickLabelY: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },

  tickLabelYText: {
    fontSize: 12,
    textAlign: 'center',
  },

  ticksYDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: Colors.black,
    borderRadius: 100,
  },
})

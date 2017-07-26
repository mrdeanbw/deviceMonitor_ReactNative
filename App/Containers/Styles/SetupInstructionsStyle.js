import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  title: {
    fontSize: Fonts.size.medium,
    marginHorizontal: Metrics.baseMargin,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontSize: Fonts.size.medium,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center'
  },
  bullets: {
    fontSize: Fonts.size.medium,
    textAlign: 'left',
    paddingLeft: Metrics.baseMargin,
  },
  link: {
    color: Colors.blue,
    textDecorationLine: 'underline'
  },
  column: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: Metrics.screenWidth - 60
  },
  row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
  },
  bullet: {
      width: 10
  },
  bulletText: {
      flex: 1
  },
})

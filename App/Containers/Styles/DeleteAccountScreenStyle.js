import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.lightGray,
    marginTop: Metrics.navBarHeight,
    alignItems: 'center'
  },
  description: {
    ...Fonts.style.h5,
    textAlign: 'center',
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  passwordInput: {
    width: 0.9 * Metrics.screenWidth,
    height: Metrics.largeMargin,
    backgroundColor: Colors.white,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    paddingLeft: Metrics.smallMargin,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 5
  },
  showHideLink: {
    color: Colors.lightBlue,
    textAlign: 'center',
  },
    text: {
        fontSize: Fonts.size.regular,
        marginHorizontal: Metrics.baseMargin,
        textAlign: 'left',
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
        flex: 1,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteButton: {
        paddingRight: Metrics.largeMargin,
    },
    doNotDeleteButton: {
    },
})

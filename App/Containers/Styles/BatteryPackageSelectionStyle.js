import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        marginTop: Metrics.navBarHeight,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    content: {
        marginTop: Metrics.doubleBaseMargin,
        marginHorizontal: Metrics.largeMargin,
    },
    text: {
        fontSize: Fonts.size.medium,
        textAlign: 'center',
        margin: Metrics.baseMargin,
        marginTop: Metrics.doubleBaseMargin,
        marginBottom:Metrics.doubleBaseMargin,
    },
    textRow: {
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                flex: 0.5,
            },
    button: {
        margin: Metrics.doubleBaseMargin
    },
    column: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: Metrics.screenWidth - 60
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Metrics.baseMargin,
    },
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        flex: 0.5,
    },

    image: {
        width: Metrics.screenWidth,
    },
    title: {
        fontSize: Fonts.size.medium,
        marginHorizontal: Metrics.baseMargin,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: Metrics.doubleBaseMargin,
                marginBottom:Metrics.doubleBaseMargin,
      },
})

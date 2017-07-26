import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        flex: 1,
        marginTop: Metrics.navBarHeight,
        backgroundColor: Colors.lightGray
    },
    link: {
        fontSize: Fonts.size.regular,
        color: Colors.blue,
        textDecorationLine: 'underline'
    },
    helpItems:{
        backgroundColor: Colors.white,
        borderRadius: Metrics.smallMargin,
        margin: Metrics.baseMargin,
        padding: Metrics.baseMargin,
        alignItems: 'center',
    },
    textContent: {
        flex:1,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: Metrics.baseMargin,
        flexWrap: 'wrap',
    },
    action: {
        flex: 1,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: Metrics.smallMargin,
        flexWrap: 'wrap',
        paddingTop: Metrics.baseMargin,
    },
    text:{
        fontSize: Fonts.size.regular,
    },
    button: {
        marginHorizontal: Metrics.smallMargin,
        marginBottom: Metrics.smallMargin
    },
})

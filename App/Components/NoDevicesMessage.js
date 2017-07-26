import React from 'react'
import { Image, Text, TouchableOpacity, View, Linking, KeyboardAvoidingView, Alert } from 'react-native'
import styles from './Styles/NoDevicesMessageStyle'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RoundedButton from '../Components/RoundedButton'
import TextInput from '../Components/TextInput'
// I18n
import I18n from '../I18n/I18n.js'

class NoDevicesMessage extends React.Component {

    static propTypes = {
        onPress: React.PropTypes.func.isRequired,
        error: React.PropTypes.string,
        loading: React.PropTypes.bool,
        gotoPromoScreen: React.PropTypes.func.isRequired,
        showPromo: React.PropTypes.bool,
    }

    static defaultProps = {
        showPromo: false
    }

    constructor (props) {
        super(props)
        this.state = {
            promoCode: null
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.loading && !nextProps.loading) {
            if (nextProps.error) {
                Alert.alert('', nextProps.error)
            } else {
                NavigationActions.pop()
            }
        }
    }

    onPromoCode = (event) => this.setState({promoCode: event.nativeEvent.text })

    gotoPromoScreen = () => {
        return this.props.gotoPromoScreen()
    }

    render () {
        const { promoCode } = this.state
        const { showPromo } = this.props
        if(showPromo){
            return (
                <View style={styles.container}>
                    <Text style={styles.normalText}>{'You have no configured devices'+'\n'+'To learn how to add a new device'}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://getroost.zendesk.com/hc/en-us/articles/115003633627')}>
                        <View style={styles.videoContainer}>
                            <Text style={[styles.normalText,styles.link]}>Watch a short video</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <View style={styles.addDeviceContainer}>
                            <Image style={styles.addDeviceIcon} source={Images.plus} />
                            <Text style={styles.addDeviceText}>Add a new device</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.promoContainer}>
                        <Text style={styles.normalText}>Have an insurance code? </Text>
                        <TouchableOpacity onPress={this.props.gotoPromoScreen}>
                            <Text style={styles.link}>Click here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.normalText}>{'You have no configured devices'+'\n'+'To learn how to add a new device'}</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://getroost.zendesk.com/hc/en-us/articles/115003633627')}>
                    <View style={styles.videoContainer}>
                        <Text style={[styles.normalText,styles.link]}>Watch a short video</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.addDeviceContainer}>
                        <Image style={styles.addDeviceIcon} source={Images.plus} />
                        <Text style={styles.addDeviceText}>Add a new device</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }
}

const mapStateToProps = (state) => {
    const { promotionCodes } = state.config
    const { fetching, error } = state.addresses
    return {
        promotionCodes,
        error,
        loading: fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoPromoScreen: () => {
            NavigationActions.promotion()
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoDevicesMessage)


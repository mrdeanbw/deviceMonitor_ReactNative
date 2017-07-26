import React from 'react'
import { Alert, KeyboardAvoidingView, Text, TouchableOpacity, View, Linking, ScrollView,
  InteractionManager,PermissionsAndroid, Platform} from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import LoadingIndicator from '../Components/LoadingIndicator'
import RoundedButton from '../Components/RoundedButton'
import TextInput from '../Components/TextInput'
import PushNotification from 'react-native-push-notification'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/HelpScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

class HelpScreen extends React.Component {
    render () {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.helpItems}>
                    <View style={styles.textContent}>
                        <Text style={styles.text}>To learn how to set up your Roost devices</Text>
                    </View>
                    <View style={styles.action}>
                        <Text style={styles.text}><Text style={styles.link} onPress={() => Linking.openURL('https://getroost.zendesk.com/hc/en-us/articles/115003633627')}>Watch a short video</Text></Text>
                    </View>
                </View>
                <View style={styles.helpItems}>
                    <View style={styles.textContent}>
                        <Text style={styles.text}>Test push notification feature</Text>
                    </View>
                    <View style={styles.action}>
                        <RoundedButton text='Test' onPress={this.props.sendPushToUser} style={styles.button}/>
                    </View>
                </View>
                <View style={styles.helpItems}>
                    <View style={styles.textContent}>
                        <Text style={styles.text}>Need more help?</Text>
                    </View>
                    <View style={styles.action}>
                        <Text style={styles.text}><Text style={styles.link} onPress={() => Linking.openURL('https://getroost.zendesk.com/hc/en-us/articles/218455548')}>Contact support</Text></Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return{
    sendPushToUser: () => {
        InteractionManager.runAfterInteractions(async () => {
            let pushAccess = true
            if (Platform.OS === 'android' && Platform.Version >= 23) {
                try {
                    const granted = await PermissionsAndroid.requestPermission('com.smartroost.app.permission.C2D_MESSAGE');
                    console.log(granted)
                    if (!granted) {
                        pushAccess = false
                        Alert.alert(
                            'Push notifications are disabled',
                            'You will not receive alerts about your devices! To enable, please change the Roost settings in your phone settings menu'
                        )
                    }
                } catch (err) {
                    console.log("err"+err)
                    pushAccess = false
                }
                if (pushAccess) {
                    dispatch(Actions.sendPushToUser())
                }
            }
            else if (Platform.OS === 'ios'){
                PushNotification.checkPermissions((permissions) => {
                    if (!permissions.alert) {
                        Alert.alert(
                            'Push notifications are disabled',
                            'You will not receive alerts about your devices! To enable, please change the Roost settings in your phone settings menu'
                        )
                    } else {
                        dispatch(Actions.sendPushToUser())
                    }
                })
            }
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen)

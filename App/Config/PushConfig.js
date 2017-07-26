import PushNotification from 'react-native-push-notification'
import Actions from '../Actions/Creators'
import R from 'ramda'
import { Alert, AppState} from 'react-native'

export default (dispatch) => {
  // https://github.com/zo0r/react-native-push-notification
  PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: (response) => {
      dispatch(Actions.createInstallation(response.os, response.token))
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: (notification) => {
      //{"foreground":true,"userInteraction":false,"message":"Your SmartBattery alarm has been successfully connected to Roost.","data":{"remote":true,"objectId":"iZFgFMAvxG","type":"provisioningOK","senderId":"oKWotW7qkx"},"alert":"Your SmartBattery alarm has been successfully connected to Roost.","sound":"default"}
      //{"foreground":false,"userInteraction":true,"message":"Alarm sounding! Roost detected possible alert in your SmartBattery","data":{"remote":true,"objectId":"ekMgkxWaQr","type":"alarmOn"},"alert":"Alarm sounding! Roost detected possible alert in your SmartBattery","sound":"alarm.wav"}
      dispatch(Actions.fetchAddresses())
      let popupClicked = false
      const { foreground, data } = notification
      const { type, sound } = data
      console.log("~~~~~~~~~~~~type"+type)
      console.log("foreground ="+foreground)
      console.log("AppState.currentState ="+AppState.currentState)
      //If App is already open
      if (foreground) {
        if (R.is(String, type)) {
          if (type === 'alarmOn' || type === 'water') {
            Alert.alert(
              'Alert',
              notification.message,
              [
                {text: 'OK', onPress: () => dispatch(Actions.stopNotificationAlarm())},
              ]
              )
            dispatch(Actions.playNotificationAlarm())
            }
            else if (['alarmOff', 'testAlarmOff', 'motionAlarmOff', 'alarm off','water off','waterOff','default'].includes(type)) {
                Alert.alert(
                  'Alert',
                  notification.message,
                  [
                    {text: 'OK', onPress: () => dispatch(Actions.stopNotificationAlarm())},
                  ]
                )
            }
        }
      }
      else {
        AppState.addEventListener('change', state =>{
            console.log('AppState changed to', state)
            const changeState = state
            if (changeState === 'active' && !popupClicked){
                if (R.is(String, type)) {
                    if (type === 'alarmOn' || type === 'water') {
                      Alert.alert(
                        'Alert',
                        notification.message,
                        [
                          {text: 'OK', onPress: () => dispatch(Actions.stopNotificationAlarm())},
                        ]
                      )
                      popupClicked = true
                    }
                    else if (['alarmOff', 'testAlarmOff', 'motionAlarmOff', 'alarm off','water off','waterOff'].includes(type)) {
//                      Alert.alert(
//                        'Alert',
//                        notification.message,
//                        [
//                          {text: 'OK', onPress: () => dispatch(Actions.stopNotificationAlarm())},
//                        ]
//                      )
                      popupClicked = true
                    }
                }
            }
          });
        if (R.is(String, type)) {
            if (type === 'alarmOn' || type === 'water') {
              Alert.alert(
                'Alert',
                notification.message,
                [
                  {text: 'OK', onPress: () => dispatch(Actions.stopNotificationAlarm())},
                ]
              )
              dispatch(Actions.playNotificationAlarm())
            }
            else if (['alarmOff', 'testAlarmOff', 'motionAlarmOff', 'alarm off','water off','waterOff'].includes(type)) {
//              Alert.alert(
//                'Alert',
//                notification.message,
//                [
//                  {text: 'OK', onPress: () => dispatch(Actions.stopNotificationAlarm())},
//                ]
//              )
            }
        }
      }

      if (__DEV__) console.log('NOTIFICATION:', notification)
    },

    // ANDROID ONLY: (optional) GCM Sender ID.
    senderID: '138471099484',

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    // Leave this off unless you have good reason.
    popInitialNotification: false,

    /**
      * IOS ONLY: (optional) default: true
      * - Specified if permissions will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      * This example app shows how to best call requestPermissions() later.
      */
    requestPermissions: false
  })
}

import React from 'react'
import { Alert, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import LoadingIndicator from '../Components/LoadingIndicator'
import RoundedButton from '../Components/RoundedButton'
import TextInput from '../Components/TextInput'
// external libs
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/DeleteAccountScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

class DeleteAccountScreen extends React.Component {

//  static propTypes = {
//    error: React.PropTypes.string,
//    loading: React.PropTypes.bool,
//    authenticatePassword: React.PropTypes.func.isRequired
//  }

  constructor (props) {
    super(props)
    this.state = {
//          password: null,
//          showPassword: false
        }
  }

//    componentWillReceiveProps (nextProps) {
//      if (this.props.loading && !nextProps.loading) {
//        if (nextProps.error) {
//          Alert.alert('', nextProps.error)
//        } else {
//          NavigationActions.pop()
//        }
//      }
//    }

  render () {
//    if (this.props.loading) {
//          return <LoadingIndicator />
//        }
    return (
        <View style={styles.container}>
            <View style={ styles.column }>
                <View style={ styles.row }>
                    <View style={ styles.bulletText }>
                        <Text>
                            <Text style={styles.text}> </Text>
                        </Text>
                    </View>
                </View>
                <View style={ styles.row }>
                    <View style={ styles.bulletText }>
                        <Text>
                            <Text style={styles.text}>This action will: </Text>
                        </Text>
                    </View>
                </View>
                <View style={ styles.row }>
                    <View style={ styles.bulletText }>
                        <Text>
                            <Text style={styles.text}> </Text>
                        </Text>
                    </View>
                </View>
                <View style={ styles.row }>
                    <View style={ styles.bullet }>
                        <Text>{'\u2022' + " "}</Text>
                    </View>
                    <View style={ styles.bulletText }>
                        <Text>
                            <Text style={styles.text}>Delete your Roost account</Text>
                        </Text>
                    </View>
                </View>
                <View style={ styles.row }>
                    <View style={ styles.bullet }>
                        <Text>{'\u2022' + " "}</Text>
                    </View>
                    <View style={ styles.bulletText }>
                        <Text>
                            <Text style={styles.text}>Remove all Roost devices from the Roost Cloud</Text>
                        </Text>
                    </View>
                </View>
                <View style={ styles.row }>
                    <View style={ styles.bullet }>
                        <Text>{'\u2022' + " "}</Text>
                    </View>
                    <View style={ styles.bulletText }>
                        <Text>
                            <Text style={styles.text}>Delete your account history</Text>
                        </Text>
                    </View>
                </View>
                <View style={ styles.row }>
                    <View style={ styles.bulletText }>
                        <Text>
                            <Text style={styles.text}> </Text>
                        </Text>
                    </View>
               </View>
               <View style={ styles.row }>
                   <View style={ styles.bulletText }>
                       <Text>
                           <Text style={styles.text}>You will not be able to receive notifications of alerts</Text>
                       </Text>
                   </View>
               </View>
                <View style={ styles.row }>
                    <View style={ styles.bulletText }>
                        <Text>
                            <Text style={styles.text}> </Text>
                        </Text>
                    </View>
               </View>
            </View>
            <View style={ styles.buttonRow }>
                <View style={ styles.deleteButton }>
                    <RoundedButton text='Delete Account' onPress={this.props.deleteAccount} />
                </View>
                <View style={ styles.doNotDeleteButton } >
                    <RoundedButton text={'Don'+'\u0027'+'t Delete Account'} onPress={this.props.doNotDeleteAccount} />
                </View>
            </View>
        </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return{
    deleteAccount: () => {
        dispatch(Actions.deleteUser())
        NavigationActions.homeScreen({ type: 'replace', isLoggedIn: false })
    },
    doNotDeleteAccount: () => {
        NavigationActions.dashboard()
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccountScreen)

import React from 'react'
import { Alert, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity, Keyboard, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RoundedButton from '../Components/RoundedButton'
import LoadingIndicator from '../Components/LoadingIndicator'
import TextInput from '../Components/TextInput'
import Icon from 'react-native-vector-icons/Ionicons'
import R from 'ramda'

// Styles
import styles from './Styles/PromotionScreenStyle'

// I18n
import I18n from '../I18n/I18n.js'

class Input extends React.Component {

  static propTypes = {
    autoFocus: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func.isRequired,
    showClearIcon: React.PropTypes.bool,
    value: React.PropTypes.string
  }


  render () {
    const { autoFocus, value, onChange, showClearIcon, onFocus } = this.props
    return (
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus={autoFocus}
          style={styles.input}
          value={value}
          onChange={(event) => onChange(event.nativeEvent.text)}
          onFocus={onFocus} />
        { showClearIcon &&
          <TouchableOpacity onPress={() => onChange('')}>
            <Icon name='md-close-circle' style={styles.clearIcon} />
          </TouchableOpacity>
        }
      </View>
    )
  }
}

class PromotionScreen extends React.Component {

    static propTypes = {
        promoCode: React.PropTypes.string,
        name: React.PropTypes.string,
        phoneNumber: React.PropTypes.string,
        email: React.PropTypes.string,
        address1: React.PropTypes.string,
        address2: React.PropTypes.string,
        city: React.PropTypes.string,
        province: React.PropTypes.string,
        postalCode: React.PropTypes.string,
        country: React.PropTypes.string,
        error: React.PropTypes.string,
        editable: React.PropTypes.bool,
        loading: React.PropTypes.bool,
        createPromotion: React.PropTypes.func.isRequired,
//        verifyPromoCode: React.PropTypes.func.isRequired,
    }

    static defaultProps = {
        showClearIcon: false,
    }

    constructor (props) {
        super(props)
        this.state = {
            currentField: '',
            promoCode: '',
            name: props.name,
            phoneNumber: props.phoneNumber,
            email: props.email,
            address1: '',
            address2: '',
            city: '',
            province: '',
            postalCode: '',
            country: '',
            promoSuccess: false,
            title: 'Please enter your insurance code',
        }

        // When keyboard hides scroll to top of view
        this.keyboardListener = Keyboard.addListener('keyboardDidHide', (frames) => {
            if (this.refs.scrollView) {
                this.refs.scrollView.scrollTo({ y: 0 })
            }
        });
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.loading && !nextProps.loading) {
            if (nextProps.error) {
                Alert.alert('', nextProps.error)
            }
        }
        if (this.props.creating && !nextProps.creating) {
          if (nextProps.error) {
            Alert.alert('', 'There was an error. Please try again')
          } else {
            Alert.alert(
                    '', 'Your details have been successfully submitted', [
                      { text: 'OK', onPress: () => { NavigationActions.dashboard() } }
                    ]
                  )

          }
        }
    }

    createPromotion () { 
        const {promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country } = this.state

        if (!promoCode || !name || !phoneNumber || !email || !address1 || !city || !province || !postalCode || !country) {
            Alert.alert('', 'All fields are required')
        } else {
            this.props.createPromotion(this.state)
        }
    }

    verifyPromoCode = () => { 
        const { promoCode } = this.state
         if (!promoCode) {
             Alert.alert('', 'Insurance code can not be empty')
         } else if (promoCode) { 
            const promoCodeLower = promoCode.toLowerCase()
            if(promoCodeLower in this.props.promotionCodes){ 
                this.setState( { promoSuccess: true, title : this.props.promotionCodes[promoCodeLower] })
            } else { 
                Alert.alert('', 'The insurance code you entered is not valid')
            }
        }
     }

    handleFocus (field) {
        this.setState({ currentField: field })
    }

    handleInput (field, value) {
        this.setState({ [field]: value })
    }

    render () {
        if (this.props.loading) {
            return <LoadingIndicator />
        }
        const { promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country } = this.state
        const promoContent = []
        const promoFields = { promoCode: 'Insurance code'}
        const editableContent = [ <View style={styles.row}>
                                    <Text style={styles.label}>Insurance code</Text>
                                    <Text style={styles.value}>{this.state.promoCode}</Text>
                                  </View> ]
        const editableFields = { name: 'Name',  phoneNumber: 'Phone number',  email: 'Email address', address1: 'Address 1',  address2: 'Address 2 (optional)',  city: 'City',  province: 'State/Province',  postalCode: 'Zip/Postal code',  country: 'Country'}
        let autoFocus = true
        for (const field in promoFields) {
            let value = <Text style={styles.value}>{this.state[field]}</Text>
            value = <Input
                autoFocus={autoFocus}
                value={this.state[field]}
                onChange={this.handleInput.bind(this, field)}
                showClearIcon={this.state.currentField === field}
                onFocus={this.handleFocus.bind(this, field)}
            />
            autoFocus = false
            promoContent.push(
                <View key={`row-${field}`} style={styles.row}>
                    <Text style={styles.label}>{promoFields[field]}</Text>
                    { value }
                </View>
            )
        }
        for (const field in editableFields) {
            let value = <Text style={styles.value}>{this.state[field]}</Text>
            value = <Input
                autoFocus={autoFocus}
                value={this.state[field]}
                onChange={this.handleInput.bind(this, field)}
                showClearIcon={this.state.currentField === field}
                onFocus={this.handleFocus.bind(this, field)}
            />
            autoFocus = false
            editableContent.push(
                <View key={`row-${field}`} style={styles.row}>
                    <Text style={styles.label}>{editableFields[field]}</Text>
                    { value }
                </View>
            )
        }

        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps={true} ref="scrollView">
                <View style={styles.titleContainer}>
                    <Text style={styles.heading}>{this.state.title}</Text>
                </View>
                { !this.state.promoSuccess && promoContent }
                { this.state.promoSuccess && editableContent }
                <View style={styles.submitButton}>
                    { this.props.loading
                    ? <LoadingIndicator />
                    : (!this.state.promoSuccess ? <RoundedButton style={styles.button} text='Submit' onPress={this.verifyPromoCode}/> : <RoundedButton style={styles.button} text='Submit' onPress={this.createPromotion.bind(this)}/>)  }
                </View>
                <View style={styles.forceScrolling} />
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    const { email, name, updating, phoneNumber } = state.user;
    const { promotionCodes } = state.config;
    const { creating, error } = state.createPromotion
    return {
        email,
        loading: updating,
        name,
        phoneNumber,
        promotionCodes,
        creating,
        error
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        createPromotion: ({promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country}) => dispatch(Actions.createPromotion(promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromotionScreen)
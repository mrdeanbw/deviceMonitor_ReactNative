import React from 'react'
import { Alert, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoadingIndicator from '../Components/LoadingIndicator'
import TextInput from '../Components/TextInput'
import Icon from 'react-native-vector-icons/Ionicons'
import DrawerButton from '../Components/DrawerButton'
import Images from '../Themes/Images'

// Styles
import styles from './Styles/ProfileScreenStyle'

class Input extends React.Component {

  static propTypes = {
    autoFocus: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func.isRequired,
    showClearIcon: React.PropTypes.bool,
    value: React.PropTypes.string
  }

  static defaultProps = {
    showClearIcon: false
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

class ProfileScreen extends React.Component {

  static propTypes = {
    email: React.PropTypes.string,
    error: React.PropTypes.string,
    loading: React.PropTypes.bool,
    name: React.PropTypes.string,
    updateProfile: React.PropTypes.func.isRequired,
    username: React.PropTypes.string,
  }

  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      currentField: '',
      name: props.name,
      email: props.email
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loading && !nextProps.loading) {
      if (nextProps.error) {
        Alert.alert('', nextProps.error)
      } else {
        this.toggleEditing()
        this.setEditButton()
      }
    }
  }

  componentDidMount () {
    this.setEditButton()
  }

  setEditButton () {
    NavigationActions.refresh({
      rightTitle: 'Edit',
      onRight: () => this.toggleEditing()
    })
  }

  setSaveButton () {
    NavigationActions.refresh({
      rightTitle: 'Done',
      onRight: () => this.updateProfile()
    })
  }

  updateProfile () {
    const { name, email } = this.state
    if (!name || !email) {
      Alert.alert('', 'All fields are required')
    } else {
      this.props.updateProfile(name, email)
    }
  }

  handleFocus (field) {
    this.setState({ currentField: field })
  }

  toggleEditing () {
    if (this.state.editing) {
      this.setEditButton()
    } else {
      this.setSaveButton()
    }
    this.setState({ editing: !this.state.editing })
  }

  handleInput (field, value) {
    this.setState({ [field]: value })
  }

  handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account?',
      'This action will delete your Roost account and all your devices. You will no longer receive any device notifications.',
      [
        { text: 'Delete Account', style: 'destructive', onPress: () => {
          this.props.deleteAccount()
        } },
        { text: 'Cancel', onPress: () => {} },
      ]
    )
  }

  render () {
    if (this.props.loading) {
      return <LoadingIndicator />
    }

    const editableContent = []
    const editableFields = { name: 'Name', email: 'Email' }
    let autoFocus = true
    for (const field in editableFields) {
      let value = <Text style={styles.value}>{this.state[field]}</Text>
      if (this.state.editing) {
        value = <Input
          autoFocus={autoFocus}
          value={this.state[field]}
          onChange={this.handleInput.bind(this, field)}
          showClearIcon={this.state.currentField === field}
          onFocus={this.handleFocus.bind(this, field)} />
        autoFocus = false
      }
      editableContent.push(
        <View key={`row-${field}`} style={styles.row}>
          <Text style={styles.label}>{editableFields[field]}</Text>
          { value }
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.topRow}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{ this.props.username }</Text>
          </View>
          { editableContent }
        </KeyboardAvoidingView>
        <DrawerButton
          text='Delete Account'
          rowStyle={styles.deleteRow}
          textStyle={styles.deleteText}
          icon={Images.trash}
          hideChevron={true}
          onPress={this.handleDeleteAccount} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { email, error, name, updating, username } = state.user;
  return {
    email,
    error,
    loading: updating,
    name,
    username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccount: () => {
      dispatch(Actions.deleteUser())
      NavigationActions.homeScreen({ type: 'replace', isLoggedIn: false })
    },
    updateProfile: (name, email) => dispatch(Actions.updateProfile({ name, email }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

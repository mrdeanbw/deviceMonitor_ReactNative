import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import TouchableRow from '../Components/TouchableRow'
import COUNTRIES from '../Lib/Countries'

// Styles
import styles from './Styles/SelectCountryStyle'

class SelectCountry extends React.Component {

  static propTypes = {
    onCountrySelect: React.PropTypes.func.isRequired,
    selectedCountry: React.PropTypes.shape({
      name: React.PropTypes.string,
      code: React.PropTypes.number
    })
  }
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    let countries = COUNTRIES.map((country) => {
      return <TouchableRow
        key={country.name}
        text={country.name}
        rightText={`+${country.code}`}
        onPress={() => this.props.onCountrySelect(country)}
        icon={ country.name === this.props.selectedCountry.name ? 'ios-checkmark' : null }
        iconStyle={styles.iconStyle}
        style={styles.countryRow}
        textStyle={styles.countryText}
      />
    })
    return (
      <ScrollView style={styles.container}>
        {countries}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCountry: state.selectedCountry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCountrySelect: (country) => {
      dispatch(Actions.selectCountry(country))
      NavigationActions.pop()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCountry)

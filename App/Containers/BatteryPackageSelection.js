import React, {PropTypes} from 'react'
import {
  InteractionManager, PermissionsAndroid, Platform, Text, TouchableOpacity,
  Image, ScrollView, View, Alert
} from 'react-native'
import styles from './Styles/BatteryPackageSelectionStyle'
import { Colors, Images } from '../Themes'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RoundedButton from '../Components/RoundedButton'
import R from 'ramda'


class BatteryPackageSelection extends React.Component {

    static propTypes = {
        addressId: React.PropTypes.string,
        onWithFoamSelect: React.PropTypes.func.isRequired,
        onWithoutFoamSelect: React.PropTypes.func.isRequired,
    }

    componentDidMount () {
    }
    
    render () {
        return (
            <View style={styles.container}>
                    <Text style={styles.title}>{'Before you begin,'+'\n'+'does your Roost package look like this?'}</Text>
                    <Image style={styles.image} source={Images.forkScreen} resizeMode='cover'/>
                <View style={styles.row}>
                    <RoundedButton onPress={this.props.onWithoutFoamSelect} style={styles.button}>No</RoundedButton>
                    <RoundedButton onPress={this.props.onWithFoamSelect} style={styles.button}>Yes</RoundedButton>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return { deviceType } = state.createDevice
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onWithFoamSelect: () => {
      dispatch(Actions.selectProvMech('earphones'))
      NavigationActions.foamSetupInstructionsOne()
    },
    onWithoutFoamSelect: (d) => {
      dispatch(Actions.selectProvMech('speaker'))
      NavigationActions.batterySetupInstructionsOne()
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BatteryPackageSelection)

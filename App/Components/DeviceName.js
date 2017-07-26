import React, {PropTypes} from 'react'
import { Text, TouchableOpacity, Image, ScrollView, View } from 'react-native'
import { Images } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Button, ButtonRow } from './DeviceLocation'
import CustomName from './CustomName'

// Styles
import styles from './Styles/DeviceNameStyle'

export default class DeviceName extends React.Component {

  static propTypes = {
    deviceType: React.PropTypes.string,
    location: React.PropTypes.string,
    onNameSelect: React.PropTypes.func.isRequired
  }

  customLocationImage () {
    if (this.props.deviceType && this.props.deviceType.toLowerCase() === 'water') {
      return Images.customLeakDetector
    } else {
      return Images.customBattery
    }
  }

  getKitchenOptions () {
    return [
      {
        left: {
          onPress: () => this.props.onNameSelect('Sink'),
          image: Images.sink,
          text: 'Sink'
        }, right: {
          onPress: () => this.props.onNameSelect('Dishwasher'),
          image: Images.dishwasher,
          text: 'Dishwasher'
        }
      },
      {
        left: {
          onPress: () => this.props.onNameSelect('Refrigerator'),
          image: Images.refrigerator,
          text: 'Refrigerator'
        }, right: {
          onPress: () => this.props.onNameSelect('Wine'),
          image: Images.wine,
          text: 'Wine'
        }
      },
      {
        left: {
          onPress: () => NavigationActions.deviceCustomName(),
          image: this.customLocationImage(),
          text: 'Custom Name'
        }, right: false
      }
    ]
  }

  getBathroomOptions () {
    return [
      {
        left: {
          onPress: () => this.props.onNameSelect('Sink'),
          image: Images.sink,
          text: 'Sink'
        }, right: {
          onPress: () => this.props.onNameSelect('Toilet'),
          image: Images.toilet,
          text: 'Toilet'
        }
      },
      {
        left: {
          onPress: () => NavigationActions.deviceCustomName(),
          image: this.customLocationImage(),
          text: 'Custom Name'
        }, right: false
      },
    ]
  }

  getMasterBedroomOptions () {
    return [
      {
        left: {
          onPress: () => this.props.onNameSelect('Sink'),
          image: Images.sink,
          text: 'Sink'
        }, right: {
          onPress: () => NavigationActions.deviceCustomName(),
          image: this.customLocationImage(),
          text: 'Custom Name'
        }
      },
    ]
  }

  getLaundryRoomOptions () {
    return [
      {
        left: {
          onPress: () => this.props.onNameSelect('Sink'),
          image: Images.sink,
          text: 'Sink'
        }, right: {
            onPress: () => this.props.onNameSelect('Washing Machine'),
            image: Images.washingMachine,
            text: 'Washing Machine'
          }
        },
        {
          left: {
            onPress: () => NavigationActions.deviceCustomName(),
            image: this.customLocationImage(),
            text: 'Custom Name'
          }, right: false
        },
    ]
  }

  getBasementOptions () {
    return [
      {
        left: {
          onPress: () => this.props.onNameSelect('Water Heater'),
          image: Images.waterHeater,
          text: 'Water Heater'
        }, right: {
          onPress: () => this.props.onNameSelect('Washing Machine'),
          image: Images.washingMachine,
          text: 'Washing Machine'
        }
      },
      {
        left: {
          onPress: () => this.props.onNameSelect('Sump Pump'),
          image: Images.sumpPump,
          text: 'Sump Pump'
        }, right: {
          onPress: () => NavigationActions.deviceCustomName(),
          image: this.customLocationImage(),
          text: 'Custom Name'
        }
      }
    ]
  }

  getGarageOptions () {
    return [
      {
        left: {
          onPress: () => this.props.onNameSelect('Water Heater'),
          image: Images.waterHeater,
          text: 'Water Heater'
        }, right: {
          onPress: () => this.props.onNameSelect('Washing Machine'),
          image: Images.washingMachine,
          text: 'Washing Machine'
        }
      },
      {
        left: {
          onPress: () => NavigationActions.deviceCustomName(),
          image: this.customLocationImage(),
          text: 'Custom Name'
        }, right: false
      },
    ]
  }

  render () {
    let options = []
    switch(this.props.location) {
      case 'Kitchen':
        options = this.getKitchenOptions()
        break;
      case 'Bathroom':
        options = this.getBathroomOptions()
        break;
      case 'Master Bedroom':
        options = this.getMasterBedroomOptions()
        break;
      case 'Laundry Room':
        options = this.getLaundryRoomOptions()
        break;
      case 'Basement':
        options = this.getBasementOptions()
        break;
      case 'Garage':
        options = this.getGarageOptions()
        break;
      default:
        return <CustomName onContinue={this.props.onNameSelect} />
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>What do you want to name the device?</Text>
        </View>
        { options.map((row, index) => <ButtonRow key={index} { ...row } />) }
      </ScrollView>
    )
  }
}

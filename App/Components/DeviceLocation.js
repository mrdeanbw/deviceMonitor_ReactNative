import React, {PropTypes} from 'react'
import { Text, TouchableOpacity, Image, ScrollView, View } from 'react-native'
import { Images } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/DeviceLocationStyle'

export class Button extends React.Component {
  static propTypes = {
    leftButton: React.PropTypes.bool,
    onPress: React.PropTypes.func.isRequired,
    image: React.PropTypes.any,
    text: React.PropTypes.string,
  }

  static defaultProps = {
    leftButton: false
  }

  render () {
    const extraStyles = this.props.leftButton ? { marginRight: 10 } : {}
    return (
      <TouchableOpacity style={[styles.imageContainer, extraStyles]} onPress={this.props.onPress}>
        <Image style={styles.image} source={this.props.image} resizeMode='contain' />
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

export const EmptyButton = () => (<View style={styles.emptyContainer} />)

export class ButtonRow extends React.Component {
  render () {
    return (
      <View style={styles.row}>
        <Button leftButton { ...this.props.left } />
        { this.props.right ? <Button { ...this.props.right } /> : <EmptyButton /> }
      </View>
    )
  }
}

export default class DeviceLocation extends React.Component {

  static propTypes = {
    onCustomLocation: React.PropTypes.func.isRequired,
    onLocationSelect: React.PropTypes.func.isRequired
  }

  onLocationSelect (location) {
    this.props.onLocationSelect(location)
  }

  render () {
    let buttonRows = []
    if (this.props.deviceType && this.props.deviceType.toLowerCase() === 'water') {
      buttonRows = [
        {
          left: {
            onPress: () => this.onLocationSelect('Kitchen'),
            image: Images.kitchen,
            text: 'Kitchen'
          }, right: {
            onPress: () => this.onLocationSelect('Bathroom'),
            image: Images.bathroom,
            text: 'Bathroom'
          }
        },
        {
          left: {
            onPress: () => this.onLocationSelect('Laundry Room'),
            image: Images.closet,
            text: 'Laundry Room'
          }, right: {
            onPress: () => this.onLocationSelect('Basement'),
            image: Images.basement,
            text: 'Basement'
          }
        },
        {
          left: {
            onPress: () => this.onLocationSelect('Garage'),
            image: Images.garage,
            text: 'Garage'
          }, right: {
            onPress: this.props.onCustomLocation,
            image: Images.customLeakDetector,
            text: 'Custom location'
          }
        }
      ]
    } else {
      buttonRows = [
        {
          left: {
            onPress: () => this.onLocationSelect('Hallway'),
            image: Images.hallway,
            text: 'Hallway'
          }, right: {
            onPress: () => this.onLocationSelect('Hallway Upstairs'),
            image: Images.hallwayUpstairs,
            text: 'Hallway upstairs'
          }
        },
        {
          left: {
            onPress: () => this.onLocationSelect('Master Bedroom'),
            image: Images.masterBedroom,
            text: 'Master bedroom'
          }, right: {
            onPress: () => this.onLocationSelect('Bedroom'),
            image: Images.bedroom,
            text: 'Bedroom'
          }
        },
        {
          left: {
            onPress: () => this.onLocationSelect('Kitchen'),
            image: Images.kitchen,
            text: 'Kitchen'
          }, right: {
            onPress: this.props.onCustomLocation,
            image: Images.customBattery,
            text: 'Custom location'
          }
        }
      ]
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Where do you want to place the device?</Text>
        </View>
        { buttonRows.map((row, index) => <ButtonRow key={index} { ...row } />) }
      </ScrollView>
    )
  }
}


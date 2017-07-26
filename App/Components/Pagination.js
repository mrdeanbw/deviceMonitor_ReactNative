import React from 'react'
import { View, Text } from 'react-native'
import R from 'ramda'
import styles from './Styles/PaginationStyle'

export default class Pagination extends React.Component {

  static propTypes = {
    index: React.PropTypes.number, // The index of the current page, starting at 0
    total: React.PropTypes.number,
  }

  render () {
    const { index, total } = this.props
    if (total <= 1) {
      return null
    }

    let dots = []
    const addDot = i => {
      if (i === index) {
        dots.push(<View key={i} style={styles.activeDot}/>)
      } else {
        dots.push(<View key={i} style={styles.dot}/>)
      }
    }
    R.forEach(addDot, R.range(0, total))

    return (
      <View style={styles.container}>
        {dots}
      </View>
    )
  }
}

import React, {
  Component,
  PropTypes,
} from 'react'
import {
  ART,
  Dimensions,
  Platform,
  Text,
  View,
} from 'react-native'
const {
  Group,
  Shape,
  Surface,
} = ART
import R from 'ramda'

import * as graphUtils from '../Lib/Graph'
import { convertToFahrenheit } from '../Lib/Utilities'
import { Colors } from '../Themes'

import styles from './Styles/GraphStyle'

const paddingSize = 20
const tickWidth = paddingSize * 2
const dimensionWindow = Dimensions.get('window')

export default class Graph extends Component {
  static propTypes = {
    oneDay: PropTypes.bool,
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xAccessor: PropTypes.func.isRequired,
    yAccessor: PropTypes.func.isRequired,
  }

  static defaultProps = {
    oneDay: true,
    width: Math.round(dimensionWindow.width),
    height: 150,
  }

  state = {
    graphWidth: 0,
    graphHeight: 0,
    linePath: '',
  }

  componentWillMount() {
    this.computeNextState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.computeNextState(nextProps)
  }

  computeNextState(nextProps) {
    const {
      data,
      width,
      height,
      xAccessor,
      yAccessor,
      range,
      oneDay,
    } = nextProps

    const graphWidth = width - paddingSize * 4
    const graphHeight = height - paddingSize * 2

    const numDays = oneDay ? 1 : 7

    const lineGraph = graphUtils.createLineGraph({
      data,
      xAccessor,
      yAccessor,
      width: graphWidth,
      height: graphHeight,
      numDays,
      range,
    })

    this.setState({
      graphWidth,
      graphHeight,
      linePath: lineGraph.path,
      ticks: lineGraph.ticks,
      scale: lineGraph.scale,
      ticksX: lineGraph.ticksX,
      ticksY: lineGraph.ticksY,
      xAxis: lineGraph.xAxis,
      yAxis: lineGraph.yAxis,
    })
  }

  render() {
    const {
      oneDay,
      showDeg,
      yAccessor,
    } = this.props

    const {
      graphWidth,
      graphHeight,
      linePath,
      ticks,
      ticksX,
      ticksY,
      scale,
      xAxis,
      yAxis,
    } = this.state

    const {
      x: scaleX,
    } = scale

    const tickFormatString = oneDay ? '%I:%M %p' : '%m/%d'
    const tickXFormat = scaleX.tickFormat(null, tickFormatString)

    return (
      <View style={styles.container}>
        <Surface width={graphWidth} height={graphHeight}>
          <Group x={0} y={0}>
            <Shape
              d={linePath}
              stroke={Colors.blue}
              strokeWidth={2}
            />
          </Group>
          <Group>
            <Shape d={xAxis} strokeWidth={1} stroke="#000" />
            <Shape d={yAxis} strokeWidth={1} stroke="#000" />
          </Group>
        </Surface>
        <View key={'ticksX'}>
          {ticksX.map((tick, index) => {
            const tickStyles = {}
            tickStyles.width = tickWidth
            tickStyles.left = tick.x - (tickWidth / 2)
            tickStyles.bottom = (Platform.OS === 'ios' ? -30 : -35) + (oneDay ? 0 : 10)

            return (
              <Text key={index} style={[styles.tickLabelX, tickStyles]}>
                {tickXFormat(new Date(tick.datum))}
              </Text>
            )
          })}
        </View>

        <View key={'ticksY'} style={styles.ticksYContainer}>
          {ticksY.map((tick, index) => {
            const value = tick.datum

            const tickStyles = {}
            tickStyles.width = tickWidth
            tickStyles.left = tick.x - Math.round(tickWidth * 0.75)

            tickStyles.top = tick.y - Math.round(tickWidth * 0.25) - (Platform.OS === 'ios' ? 0 : 5)

            return (
              <View key={index} style={[styles.tickLabelY, tickStyles]}>
                <Text style={styles.tickLabelYText}>
                  {value}{ showDeg && <Text>&deg;</Text> }
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export class HumidityGraph extends Component {
  render () {
    const sortByHumidity = R.pipe(R.sortBy(R.prop('humidity')), R.reverse)
    const readingsByHumidity = sortByHumidity(this.props.data)
    const minHumInArray = (readingsByHumidity[readingsByHumidity.length - 1].humidity) - 5
    const maxHumInArray = (readingsByHumidity[0].humidity) + 5
    return <Graph {...this.props} range={[minHumInArray, maxHumInArray]} />
  }
}

export class TempGraph extends Component {
  static propTypes = {
    tempUnitsFahrenheit : React.PropTypes.bool,
  }

  render () {
    let convertUnits
    const { tempUnitsFahrenheit } = this.props
    if (tempUnitsFahrenheit === undefined){
        convertUnits = false
    } else {
        convertUnits = tempUnitsFahrenheit
    }
    const sortByTemperature = R.pipe(R.sortBy(R.prop('temperature')), R.reverse)
    const readingsByTemperature = sortByTemperature(this.props.data)
    const minTempInArray = (readingsByTemperature[readingsByTemperature.length - 1].temperature) - 5
    const maxTempInArray = (readingsByTemperature[0].temperature) + 5
    const range = convertUnits ? [convertToFahrenheit(minTempInArray), convertToFahrenheit(maxTempInArray)] : [minTempInArray, maxTempInArray]


    const yAccessor = convertUnits ? R.compose(convertToFahrenheit, this.props.yAccessor) : this.props.yAccessor
    return <Graph {...this.props} yAccessor={ yAccessor } range={range} showDeg={true} />
  }
}

import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Colors, Metrics } from '../Themes'
import AddressHeader from '../Containers/AddressHeader'
import LoadingIndicator from '../Components/LoadingIndicator'
import { getTimeString, isSameDay } from '../Lib/Utilities'
import { HumidityGraph, TempGraph } from '../Components/Graph'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import I18n from 'react-native-i18n'
import { Actions as NavigationActions } from 'react-native-router-flux'
import R from 'ramda'
import MaterialSwitch from 'react-native-material-switch'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'

// Styles
import styles from './Styles/DeviceActivityScreenStyle'

var radio_props = [
  {label: '24 hours', value: 0 },
  {label: '7 days', value: 1 }
];

class Graphs extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      time: React.PropTypes.shape({
        iso: React.PropTypes.string,
      }),
      temperature: React.PropTypes.number,
      humidity: React.PropTypes.number
    })),
    loading: React.PropTypes.bool,
    oneDay: React.PropTypes.bool,
    tempUnitsFahrenheit: React.PropTypes.bool
  }

  render () {
    const { data, loading, oneDay, tempUnitsFahrenheit } = this.props
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <LoadingIndicator />
        </View>
      )
    }

    if (!data || !data.length) {
      return (
        <View style={styles.noActivityContainer}>
          <Text style={styles.noActivityText}>No recent data</Text>
        </View>
      )
    }
    return (
      <View style={styles.graphContainer}>
        <Text style={styles.graphLabel}>Temperature</Text>
        <TempGraph
          tempUnitsFahrenheit={tempUnitsFahrenheit}
          data={data}
          oneDay={oneDay}
          xAccessor={(d) => new Date(d.time)}
          yAccessor={(d) => d.temperature}
        />
        <Text style={styles.graphLabel}>Humidity</Text>
        <HumidityGraph data={data} oneDay={oneDay} xAccessor={(d) => new Date(d.time)} yAccessor={(d) => d.humidity} />
      </View>
    )
  }
}

class DateSeparator extends React.Component {

  static propTypes = {
    date: React.PropTypes.string
  }

  render () {
    return <Text style={styles.date}>{this.props.date}</Text>
  }
}

class Event extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    timestamp: React.PropTypes.instanceOf(Date),
  }

  render () {
    return (
      <View style={styles.eventContainer}>
        <Text style={styles.eventText}>{this.props.text}</Text>
        <Text style={styles.eventTime}>{getTimeString(this.props.timestamp)}</Text>
      </View>
    )
  }
}

const NoActivity = () => {
  return (
    <View style={styles.noActivityContainer}>
      <Text style={styles.noActivityText}>No recent activity</Text>
    </View>
  )
}

class ActivityList extends React.Component {
  static propTypes = {
    events: React.PropTypes.arrayOf(React.PropTypes.shape({
      createdAt: React.PropTypes.string,
      event: React.PropTypes.string,
    })),
    loading: React.PropTypes.bool
  }

  render () {
    const { events, loading } = this.props
    if (loading) {
      return <LoadingIndicator />
    }

    const sortByTime = R.pipe(R.sortBy(R.prop('createdAt')), R.reverse)
    const eventsByTime = sortByTime(events)

    let currentDay = null
    let content = []

    const formatDate = (date) => I18n.strftime(date, '%A, %B %-d')

    eventsByTime.forEach((event) => {
      const currentEventTime = new Date(Date.parse(event.createdAt))
      if (!isSameDay(currentDay, currentEventTime)) {
        content.push(
          <DateSeparator key={`day-${event.objectId}`} date={ formatDate(currentEventTime) } />
        )
        currentDay = currentEventTime
      }
      content.push(<Event key={event.objectId} timestamp={currentEventTime} text={event.event} />)
    })

    if (!content.length) {
      content = <NoActivity />
    }
    return <View style={styles.divide}>{content}</View>
  }
}

class RangeSelector extends React.Component {
  static propTypes = {
    oneDay: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
  }

  render () {
    return (
        <View style={styles.graphRangeRow}>
            <RadioForm
                radio_props={radio_props}
                 initial={0}
                labelStyle={styles.rangeLabel} 
                formHorizontal={true} 
                labelHorizontal={true} 
                buttonSize={12}
                buttonOuterSize={24}
                onPress={ (val) => this.props.onChange(!val) }
            />
        </View>
    )
  }
}

class DeviceActivityScreen extends React.Component {

  static propTypes = {
    activityLoading: React.PropTypes.bool,
    addressId: React.PropTypes.string,
    deviceId: React.PropTypes.string.isRequired,
    deviceType: React.PropTypes.string,
    error: React.PropTypes.string,
    events: React.PropTypes.arrayOf(React.PropTypes.shape({
      createdAt: React.PropTypes.string,
      event: React.PropTypes.string,
    })),
    fetchActivity: React.PropTypes.func.isRequired,
    fetchGraphData: React.PropTypes.func.isRequired,
    graphData: React.PropTypes.shape({
      day: React.PropTypes.array,
      week: React.PropTypes.array,
    }),
    graphLoading: React.PropTypes.bool,
    location: React.PropTypes.string,
    name: React.PropTypes.string,
    resetActivity: React.PropTypes.func.isRequired,
    resetGraphData: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      oneDay: true
    }
  }

  componentDidMount () {
    this.props.fetchActivity()
    this.props.fetchGraphData(this.state.oneDay)
  }

  componentWillUnmount () {
    this.props.resetActivity()
    this.props.resetGraphData()
  }

  handleRangeChange (newValue) {
    const newPeriod = newValue ? 'day' : 'week'
    this.setState({
      oneDay: newValue
    })
    if (!this.props.graphData[newPeriod]) {
      this.props.fetchGraphData(newValue)
    }
  }

  render () {
    const {
      addressId, events, activityLoading, location, name, tempUnitsFahrenheit, graphLoading
    } = this.props
    const showGraphs = this.props.deviceType && this.props.deviceType.toLowerCase() === 'water'
    const graphData = this.state.oneDay ? this.props.graphData.day : this.props.graphData.week
    return (
      <ScrollView style={styles.container}>
        <AddressHeader addressId={addressId} />
        <View style={styles.hr}/>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.deviceName}>{this.props.location}, {this.props.name}</Text>
        </View>
        <View>
          { showGraphs && <RangeSelector onChange={this.handleRangeChange.bind(this)} oneDay={this.state.oneDay}/> }
        </View>
        { showGraphs && (
          <View>
            <Graphs tempUnitsFahrenheit={tempUnitsFahrenheit} loading={graphLoading} data={graphData} oneDay={this.state.oneDay} />
          </View>
        ) }
        <ActivityList loading={activityLoading} events={events} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { deviceId } = ownProps
  const { devices } = state.devices
  const device = R.find(R.propEq('objectId', deviceId), R.flatten(R.values(devices)))
  const { addresses } = state.addresses
  const address = R.find(R.propEq('objectId', device.pAddress.objectId), addresses)
  const { events, error, loading } = state.deviceActivity

  return {
    addressId: address.objectId,
    deviceType: device.deviceType,
    location: device.location,
    name: device.name,
    tempUnitsFahrenheit: device.tempUnitsFahrenheit,
    error,
    events,
    activityLoading: loading,
    graphData: state.deviceClimate.data,
    graphLoading: state.deviceClimate.loading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchActivity: () => dispatch(Actions.fetchDeviceActivity(ownProps.deviceId)),
    fetchGraphData: (oneDay) => dispatch(Actions.fetchDeviceClimate(ownProps.deviceId, oneDay)),
    resetActivity: () => dispatch(Actions.resetDeviceActivity()),
    resetGraphData: () => dispatch(Actions.resetDeviceClimate()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceActivityScreen)

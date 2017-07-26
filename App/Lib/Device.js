import DeviceStatus from './DeviceStatus'
import R from 'ramda'

// Return true if the Date represented by `timestamp` is more than
// `timeout` seconds before the current time.
const isLastEventBeforeTimeout = (device, timeout) => {
  if (!device.lastEventTime) {
    return false
  }
  const lateCutoff = new Date()
  lateCutoff.setSeconds(lateCutoff.getSeconds() - timeout)
  return Date.parse(device.lastEventTime.iso) < lateCutoff
}

const isLastEventAfterTimeout = (device, timeout) => {
  if (!device.lastEventTime) {
    return false
  }
  return !isLastEventBeforeTimeout(device, timeout)
}

const getBatteryStatus = (battery, config) => {
  if (battery.isAlarmOn) {
      switch(battery.event) {
        case 'motion':
          return DeviceStatus.MOTION_ALERT
        case 'alarm':
          return DeviceStatus.ALERT
        default:
          return DeviceStatus.ALERT
      }
    }
  if (battery.event === 'alarm snoozed' && battery.isSnoozed) {
      const timeNow = new Date()
      if (!isLastEventBeforeTimeout(battery,180)) {
          return DeviceStatus.SNOOZED
      }
  }
  if (battery.batteryPower >= 3) {
    return DeviceStatus.BATTERY_CRITICAL
  }
  if (battery.batteryPower === 2) {
    return DeviceStatus.BATTERY_LOW
  }
  if (isLastEventBeforeTimeout(battery, config.deviceVeryLate)) {
    return DeviceStatus.VERY_LATE
  }
  if (isLastEventBeforeTimeout(battery, config.deviceLate)) {
    return DeviceStatus.LATE
  }
  if (battery.event === 'provision' &&
      isLastEventBeforeTimeout(battery, config.setupIncompleteTimeout)) {
    return DeviceStatus.INCOMPLETE
  }
  return DeviceStatus.OK
}

const getWaterSensorStatus = (sensor, config) => {
  if (sensor.isAlarmOn) {
    switch(sensor.event) {
      case 'water':
        return DeviceStatus.WATER_ALERT
      case 'tempAlert':
      case 'tempAlertLow on':
      case 'tempAlertHigh on':
        return DeviceStatus.TEMP_ALERT
      case 'humidityAlert':
      case 'humidityAlertLow on':
      case 'humidityAlertHigh on':
        return DeviceStatus.HUMIDITY_ALERT
      case 'motion':
        return DeviceStatus.MOTION_ALERT
      case 'alarm':
        return DeviceStatus.ALERT
      default:
        return DeviceStatus.ALERT
    }
  }
  if (sensor.event === 'motion' && isLastEventAfterTimeout(sensor, config.recentUpdate)) {
    return DeviceStatus.RECENT_MOTION
  }
  if (isLastEventBeforeTimeout(sensor, config.deviceVeryLate)) {
    return DeviceStatus.VERY_LATE
  }
  if (isLastEventBeforeTimeout(sensor, config.deviceLate)) {
    return DeviceStatus.LATE
  }
  if (sensor.event === 'provision' &&
      isLastEventBeforeTimeout(sensor, config.setupIncompleteTimeout)) {
    return DeviceStatus.INCOMPLETE
  }
  if (sensor.batteryPower >= 3) {
    return DeviceStatus.BATTERY_CRITICAL
  }
  if (sensor.batteryPower === 2) {
    return DeviceStatus.BATTERY_LOW
  }
  if (sensor.event === 'check in' && isLastEventAfterTimeout(sensor, config.recentUpdate)) {
    return DeviceStatus.RECENT_CHECK_IN
  }
  return DeviceStatus.OK
}

export const getDeviceStatus = (device, config) => {
  if (device.deviceType) {
    const type = device.deviceType.toLowerCase()
    if (type === 'battery' || type === 'pixie') {
      return getBatteryStatus(device, config)
    }
    if (type === 'water') {
      return getWaterSensorStatus(device, config)
    }
  }
  return DeviceStatus.UNKNOWN
}

export const sortByStatus = (devices) => {
  const statusPriority = [
    DeviceStatus.ALERT,
    DeviceStatus.SNOOZED,
    DeviceStatus.WATER_ALERT,
    DeviceStatus.TEMP_ALERT,
    DeviceStatus.HUMIDITY_ALERT,
    DeviceStatus.MOTION_ALERT,
    DeviceStatus.RECENT_MOTION,
    DeviceStatus.BATTERY_CRITICAL,
    DeviceStatus.VERY_LATE,
    DeviceStatus.BATTERY_LOW,
    DeviceStatus.LATE,
    DeviceStatus.INCOMPLETE,
    DeviceStatus.RECENT_CHECK_IN,
    DeviceStatus.OK,
    DeviceStatus.UNKNOWN,
  ]
  return R.sortBy((device) => statusPriority.indexOf(device.status))(devices)
}

import test from 'ava'
import { getDeviceStatus } from '../../App/Lib/Device'
import DeviceStatus from '../../App/Lib/DeviceStatus'

const config = {
  deviceLate: 120,
  deviceVeryLate: 240,
  recentUpdate: 30,
  setupIncompleteTimeout: 60,
}

let incompleteTime, lateTime, veryLateTime

test.beforeEach(t => {
  incompleteTime = new Date()
  incompleteTime.setSeconds(incompleteTime.getSeconds() - config.setupIncompleteTimeout)
  lateTime = new Date()
  lateTime.setSeconds(lateTime.getSeconds() - config.deviceLate)
  veryLateTime = new Date()
  veryLateTime.setSeconds(veryLateTime.getSeconds() - config.deviceVeryLate)
});

test('battery statuses', t => {
  const getStatus = (deviceOpts) =>
    getDeviceStatus({ deviceType: 'Battery', ...deviceOpts }, config)

  t.is(getStatus({}), DeviceStatus.OK)
  t.is(
    getStatus({ event: 'provision', lastEventTime: { iso: incompleteTime } }),
    DeviceStatus.INCOMPLETE,
  )
  t.is(
    getStatus({ lastEventTime: { iso: lateTime } }),
    DeviceStatus.LATE,
  )
  t.is(
    getStatus({ lastEventTime: { iso: veryLateTime } }),
    DeviceStatus.VERY_LATE,
  )
  t.is(
    getStatus({ lastEventTime: { iso: lateTime }, batteryPower: 2 }),
    DeviceStatus.BATTERY_LOW,
  )
  t.is(
    getStatus({ lastEventTime: { iso: veryLateTime }, batteryPower: 3 }),
    DeviceStatus.BATTERY_CRITICAL,
  )
  t.is(
    getStatus({ event: 'alarm snoozed', batteryPower: 3, isSnoozed: true }),
    DeviceStatus.SNOOZED,
  )
  t.is(
    getStatus({ event: 'alarm snoozed', batteryPower: 3, isSnoozed: false }),
    DeviceStatus.BATTERY_CRITICAL,
  )
  t.is(
    getStatus({ isAlarmOn: true, event: 'alarm', batteryPower: 3 }),
    DeviceStatus.ALERT,
  )
})

test('water device statuses', t => {
  const recentTime = new Date()
  const getStatus = (deviceOpts) =>
    getDeviceStatus({ deviceType: 'Water', ...deviceOpts }, config)

  t.is(getStatus({}), DeviceStatus.OK)
  t.is(
    getStatus({ event: 'check in', lastEventTime: { iso: recentTime } }),
    DeviceStatus.RECENT_CHECK_IN,
  )
  t.is(
    getStatus({ event: 'provision', lastEventTime: { iso: incompleteTime } }),
    DeviceStatus.INCOMPLETE,
  )
  t.is(
    getStatus({ lastEventTime: { iso: lateTime } }),
    DeviceStatus.LATE,
  )
  t.is(
    getStatus({ lastEventTime: { iso: veryLateTime } }),
    DeviceStatus.VERY_LATE,
  )
  t.is(
    getStatus({ lastEventTime: { iso: recentTime }, event: 'motion' }),
    DeviceStatus.RECENT_MOTION,
  )
  t.is(
    getStatus({ lastEventTime: { iso: recentTime }, event: 'motion', isAlarmOn: true }),
    DeviceStatus.MOTION_ALERT,
  )
  t.is(
    getStatus({ lastEventTime: { iso: lateTime }, event: 'humidityAlertHigh on', isAlarmOn: true }),
    DeviceStatus.HUMIDITY_ALERT,
  )
  t.is(
    getStatus({ lastEventTime: { iso: veryLateTime }, event: 'tempAlertHigh on', isAlarmOn: true }),
    DeviceStatus.TEMP_ALERT,
  )
  t.is(
    getStatus({ lastEventTime: { iso: recentTime }, event: 'water', isAlarmOn: true }),
    DeviceStatus.WATER_ALERT,
  )
})

test('unknown device type', t => {
  t.is(getDeviceStatus({ deviceType: 'other' }, config), DeviceStatus.UNKNOWN)
})

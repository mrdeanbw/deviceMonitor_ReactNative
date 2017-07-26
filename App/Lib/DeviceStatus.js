// Use createTypes to create an object from a bunch of strings
import { createTypes } from 'reduxsauce'

export default createTypes(`
  ALERT
  SNOOZED
  BATTERY_CRITICAL
  BATTERY_LOW
  INCOMPLETE
  LATE
  OK
  VERY_LATE

  HUMIDITY_ALERT
  MOTION_ALERT
  RECENT_CHECK_IN
  RECENT_MOTION
  TEMP_ALERT
  WATER_ALERT

  UNKNOWN
`)


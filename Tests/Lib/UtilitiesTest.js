import test from 'ava'
import {
  getTimeString,
  isSameDay,
  sanitizePhoneNumber,
  sanitizeName,
  stripLeadingZeros,
  numberWithCountryCode,
  numberWithoutCountryCode
} from '../../App/Lib/Utilities'

test('getTimeString', t => {
  let date = new Date(2016, 10, 20, 7, 30)
  t.deepEqual(getTimeString(date), '7:30am')

  date = new Date(2016, 10, 20, 12, 1)
  t.deepEqual(getTimeString(date), '12:01pm')

  date = new Date(2016, 10, 20, 23, 3)
  t.deepEqual(getTimeString(date), '11:03pm')
})

test('isSameDay', t => {
  let date1 = new Date(2016, 10, 20, 12, 30)
  let date2 = new Date(2016, 10, 20, 16, 10)
  t.true(isSameDay(date1, date2))

  date2 = new Date(2000, 1, 1)
  t.false(isSameDay(date1, date2))

  t.true(isSameDay(new Date(), new Date()))
})

test('sanitizePhoneNumber', t => {
  t.deepEqual(sanitizePhoneNumber('(123) 456-789'), '123456789')
  t.deepEqual(sanitizePhoneNumber('+1 123-456-789'), '1123456789')
})

test('sanitizeName', t => {
  t.deepEqual(sanitizeName(''), '')
  t.deepEqual(sanitizeName('billy bob'), 'billy bob')
  t.deepEqual(sanitizeName('jimbo'), 'jimbo')
  t.deepEqual(sanitizeName(null), '')
  t.deepEqual(sanitizeName(undefined), '')
})

test('stripLeadingZeros', t => {
  t.deepEqual(stripLeadingZeros('00123'), '123')
})

test('numberWithCountryCode', t => {
  t.deepEqual(numberWithCountryCode('+123', '1'), '+123')
  t.deepEqual(numberWithCountryCode('123', '1'), '+123')
  t.deepEqual(numberWithCountryCode('+23', '1'), '+123')
  t.deepEqual(numberWithCountryCode('23', '1'), '+123')
  t.deepEqual(numberWithCountryCode('0023', '1'), '+123')
  t.deepEqual(numberWithCountryCode('+023', '1'), '+123')
})

test('numberWithoutCountryCode', t => {
  t.deepEqual(numberWithoutCountryCode('+123', 1), '23')
  t.deepEqual(numberWithoutCountryCode('+23456', 23), '456')
  t.deepEqual(numberWithoutCountryCode('23456', 23), '23456')
})

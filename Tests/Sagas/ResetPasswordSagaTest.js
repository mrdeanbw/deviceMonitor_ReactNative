import test from 'ava'
import { take, call, put } from 'redux-saga/effects'
import ResetPasswordSaga from '../../App/Sagas/ResetPasswordSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = ResetPasswordSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const phoneNumber = '5551234'
const countryCode = '1'
const formattedNumber = '+15551234'
const mock = { countryCode, phoneNumber }

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.RESET_PASSWORD))
  t.deepEqual(step(mock), call(saga.worker, phoneNumber, countryCode))
})

test('phoneNumber does not exist', t => {
  const wrongNumber = '8675309'
  const step = stepper(saga.worker(wrongNumber, countryCode))

  t.deepEqual(step(), call(FixtureApi.findPhoneNumber, '+1' + wrongNumber))
  const wrongNumberResponse = FixtureApi.findPhoneNumber('+1' + wrongNumber)
  t.deepEqual(
    step(wrongNumberResponse),
    put(Actions.resetPasswordFailure('No account found with that phone number'))
  )
})

test('reset password succeeds', t => {
  const step = stepper(saga.worker(phoneNumber, countryCode))

  t.deepEqual(step(), call(FixtureApi.findPhoneNumber, formattedNumber))
  const response = FixtureApi.findPhoneNumber(formattedNumber)
  const { objectId } = response.data.results[0]
  t.deepEqual(step(response), call(FixtureApi.resetPassword, objectId))
  const resetResponse = FixtureApi.resetPassword(objectId)
  t.deepEqual(step(resetResponse), put(Actions.resetPasswordSuccess()))
})


import test from 'ava'
import { take, call, put } from 'redux-saga/effects'
import LoginSaga from '../../App/Sagas/LoginSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = LoginSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const username = '+15551234'
const password = 'password'
const mock = { countryCode: '1', phoneNumber: '5551234', password }

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.LOGIN_ATTEMPT))
  t.deepEqual(step(mock), call(saga.attemptLogin, username, password))
})

test('attemptLogin success', t => {
  const step = stepper(saga.attemptLogin(username, password))

  t.deepEqual(step(), call(FixtureApi.login, username, password))
  const response = FixtureApi.login(username, password)
  t.deepEqual(step(response), put(Actions.loginSuccess(response.data)))
})

test('attemptLogin failure', t => {
  const wrongPassword = 'wrong'
  const step = stepper(saga.attemptLogin(username, wrongPassword))

  t.deepEqual(step(), call(FixtureApi.login, username, wrongPassword))
  const response = FixtureApi.login(username, wrongPassword)
  t.deepEqual(step(response), put(Actions.loginFailure(response.data.error)))
})

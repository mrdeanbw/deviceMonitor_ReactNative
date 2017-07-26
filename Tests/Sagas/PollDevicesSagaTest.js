import test from 'ava'
import { put } from 'redux-saga/effects'
import { pollDevices } from '../../App/Sagas/PollDevicesSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const stepper = (fn) => (mock) => fn.next(mock).value

test('fetches addresses if logged in', t => {
  const step = stepper(pollDevices())

  // step through delay call since delay(1000) != delay(1000), so we can't test equality
  step()
  // step through select user call
  step()
  // step through select addresses call
  step({ sessionToken: 'foo' }, put(Actions.fetchAddresses(true)))
})

import test from 'ava'
import { call, put, take, fork, cancel, cancelled } from 'redux-saga/effects'
import { createMockTask } from 'redux-saga/utils'
import ProvisionDeviceSaga from '../../App/Sagas/ProvisionDeviceSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'
import createAndUpdateDevice from '../../App/Lib/Generators/CreateAndUpdateDevice'
import generateAndPlayChirp from '../../App/Lib/Generators/GenerateAndPlayChirp'
import pollProvisionStatus from '../../App/Lib/Generators/PollProvisionStatus'

const saga = ProvisionDeviceSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value

test('watcher - provision attempt is cancelled', t => {
  const step = stepper(saga.watcher())
  t.deepEqual(step(), take(Types.DEVICE_CREATE))
  t.deepEqual(step(), fork(saga.worker))
  const task = createMockTask()
  t.deepEqual(
    step(task),
    take([Types.PROVISION_CANCEL, Types.PROVISION_ATTEMPT_COMPLETE]))
  // check that the task is cancelled and then subsequently that
  // execution continues at the beginning of the loop
  t.deepEqual(step({ type: Types.PROVISION_CANCEL }), cancel(task))
  t.deepEqual(step(), take(Types.DEVICE_CREATE))
})

test('watcher - provision attempt completes', t => {
  const step = stepper(saga.watcher())
  t.deepEqual(step(), take(Types.DEVICE_CREATE))
  t.deepEqual(step(), fork(saga.worker))
  const task = createMockTask()
  t.deepEqual(
    step(task),
    take([Types.PROVISION_CANCEL, Types.PROVISION_ATTEMPT_COMPLETE]))
  // check that cancel(task) is not called and that the
  // watcher loop has resumed at the beginning
  t.deepEqual(
    step({ type: Types.PROVISION_ATTEMPT_COMPLETE }),
    take(Types.DEVICE_CREATE))
})

test('worker - provision attempt completes', t => {
  const worker = saga.worker()
  const step = stepper(worker)
  t.deepEqual(step(), call(createAndUpdateDevice, FixtureApi))
  t.deepEqual(step(), call(generateAndPlayChirp))
  t.deepEqual(step(), call(pollProvisionStatus, FixtureApi))
  t.deepEqual(step(), cancelled())
  t.deepEqual(step(), put(Actions.provisionAttemptComplete()))
})

test('worker - provision attempt is cancelled', t => {
  const worker = saga.worker()
  const step = stepper(worker)
  t.deepEqual(step(), call(createAndUpdateDevice, FixtureApi))
  t.deepEqual(step(), call(generateAndPlayChirp))
  t.deepEqual(step(), call(pollProvisionStatus, FixtureApi))
  t.deepEqual(step(), cancelled())
  t.deepEqual(step(true), put(Actions.cancelProvisionCleanup()))
  t.deepEqual(step(), put(Actions.provisionAttemptComplete()))
})

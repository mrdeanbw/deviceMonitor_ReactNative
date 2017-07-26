import {select, take, call, put} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import R from 'ramda'
import Types from '../../Actions/Types'
import Actions from '../../Actions/Creators'
import { getErrorFromResponse } from '../Errors'

function * timer (duration) {
  const times = R.reverse(R.range(0, duration))

  for (let time of times) {
    yield [
      call(delay, 1000),
      put(Actions.updateTimerCountdown(time))
    ]
  }
}

export default timer

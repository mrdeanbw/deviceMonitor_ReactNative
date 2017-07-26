import {call, put, take} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (deviceId, period) {
    let since = new Date()
    const numDays = period === 'day' ? 1 : 7
    since.setDate(since.getDate() - numDays)
    const response = yield call(api.getDeviceClimate, deviceId, since)
    if (response.ok) {
      let resultData = response.data.results
      let climateData = []
      for (i=0; i<resultData.length; i++){
        const createdAt = new Date(Date.parse(resultData[i]['createdAt']))
        let sensorTime = resultData[i]['sensorTime']
        let readingsArray = resultData[i]['readings']
        for (j=0;j<readingsArray.length;j++){
            let readings = {}
            realDate = new Date(createdAt - (sensorTime - readingsArray[j][0])*1000)
            readings.time = realDate
            readings.temperature = readingsArray[j][1]
            readings.humidity = readingsArray[j][2]
            climateData.push(readings)
        }
      }
      climateData.sort(function(a,b) {return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);} );
      yield put(Actions.fetchDeviceClimateSuccess(climateData, period))
    } else {
      yield put(Actions.fetchDeviceClimateFailure(getErrorFromResponse(response), period))
    }
  }

  function * watcher () {
    while (true) {
      const { deviceId, period } = yield take(Types.FETCH_DEVICE_CLIMATE)
      yield call(worker, deviceId, period)
    }
  }

  return {
    watcher,
    worker
  }
}

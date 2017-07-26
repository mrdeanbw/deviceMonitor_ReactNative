import { take, call, put, select } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'

export default (api) => {

  function * worker (promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country) {
    const { userId } = yield select(state => state.user)
    const response = yield call(api.createPromotion, promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country, userId)

    const createErrorAction = (response) => {
      const error = getErrorFromResponse(response)
      return Actions.createPromotionFailure(error)
    }

    if (response.ok) {
      const promotionId = response.data.objectId
      yield put(Actions.createPromotionSuccess(promotionId))
    } else {
      yield put(createErrorAction(response))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take(Types.CREATE_PROMOTION)
      const { promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country } = action
      yield call(worker, promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country)
    }
  }

  return {
    watcher,
    worker
  }
}

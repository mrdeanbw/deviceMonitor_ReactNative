import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  error: null,
  creating: false,
  createdPromotionId: null,
})

const attempt = (state, action) => state.merge({ creating: true, createdPromotionId: null })

const failure = (state, action) =>
  state.merge({
    creating: false,
    error: action.error
  })

const success = (state, action) =>
  state.merge({
    creating: false,
    error: null,
    createdPromotionId: action.promotionId
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.CREATE_PROMOTION]: attempt,
  [Types.CREATE_PROMOTION_SUCCESS]: success,
  [Types.CREATE_PROMOTION_FAILURE]: failure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)

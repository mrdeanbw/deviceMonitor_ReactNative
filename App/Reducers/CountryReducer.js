import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import R from 'ramda'
import { createReducer } from 'reduxsauce'
import COUNTRIES from '../Lib/Countries'

const unitedStates = R.find(R.propEq('name', 'United States'))(COUNTRIES)

export const INITIAL_STATE = Immutable(unitedStates)

const countrySelected = (state, action) => {
  const { name, code, wicedCode } = action.country
  return state.merge({ name, code, wicedCode })
}

const ACTION_HANDLERS = {
  [Types.COUNTRY_SELECTED]: countrySelected
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)


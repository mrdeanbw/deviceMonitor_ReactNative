import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import R from 'ramda'

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  addresses: []
})

const attempt = (state, action) => state.merge({ fetching: !action.background })

const success = (state, action) => {
  const addresses = action.addresses.map((address) => ({
    ...address,
    isOwner: address.owner.objectId === action.userId
  }))
  return state.merge({
    addresses: addresses,
    fetching: false,
    error: null,
  })
}

const failure = (state, action) =>
  state.merge({
    fetching: false,
    error: action.error
  })

const update = (state, action) => {
  const { addressId, savedAddress } = action
  const updatedAddresses = R.map((address) => {
    if (address.objectId === addressId) {
      return address.merge(savedAddress)
    } else {
      return address
    }
  }, state.addresses)

  return state.merge({
    addresses: updatedAddresses
  })
}

const addAddress = (state, action) => {
  return state.merge({
    addresses: [...state.addresses, {
      objectId: action.addressId,
      isOwner: true,
      ...action.newAddress,
    }]
  })
}

const deleteAddress = (state, action) => {
  return state.merge({
    addresses: R.reject(R.propEq('objectId', action.addressId), state.addresses)
  })
}

const ACTION_HANDLERS = {
  [Types.CREATE_ADDRESS_SUCCESS]: addAddress,
  [Types.DELETE_ADDRESS_SUCCESS]: deleteAddress,
  [Types.FETCH_ADDRESSES]: attempt,
  [Types.FETCH_ADDRESSES_SUCCESS]: success,
  [Types.FETCH_ADDRESSES_FAILURE]: failure,
  [Types.SAVE_ADDRESS_SUCCESS]: update,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)


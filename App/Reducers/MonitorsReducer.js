import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import R from 'ramda'

export const INITIAL_STATE = Immutable({
  deleting: false,
  fetching: false,
  error: null,
  invitations: [],
  monitors: {},
  updating: false,
})

const fetchAttempt = (state, action) =>
  state.merge({ fetching: true, error: null })

const fetchSuccess = (state, { invitations, monitors, sentInvitations }) =>
  state.merge({
    monitors: R.groupBy(R.prop('address'), monitors),
    invitations,
    sentInvitations,
    fetching: false,
    error: null
  })

const fetchFailure = (state, { error }) =>
  state.merge({ error, fetching: false })

const deleteAttempt = (state, action) =>
  state.merge({ deleting: true, error: null })

const deleteSuccess = (state, { monitorId }) =>
  state.merge({
    deleting: false,
    error: null,
    monitors: R.groupBy(R.prop('address'), R.reject(R.propEq('objectId', monitorId), R.flatten(R.values(state.monitors))))
  })

const deleteFailure = (state, { error }) =>
  state.merge({
    deleting: false,
    error
  })

const updateAttempt = (state, action) =>
  state.merge({ updating: true, error: null })

const updateInvitationSuccess = (state, action) =>
  state.merge({
    updating: false,
    error: null,
    invitations: R.reject(R.propEq('objectId', action.invitationId), state.invitations)
  })

const updateInvitationFailure = (state, { error }) =>
  state.merge({ updating: false, error })

const ACTION_HANDLERS = {
  [Types.FETCH_MONITORS]: fetchAttempt,
  [Types.FETCH_MONITORS_SUCCESS]: fetchSuccess,
  [Types.FETCH_MONITORS_FAILURE]: fetchFailure,
  [Types.DELETE_MONITOR]: deleteAttempt,
  [Types.DELETE_MONITOR_SUCCESS]: deleteSuccess,
  [Types.DELETE_MONITOR_FAILURE]: deleteFailure,
  [Types.UPDATE_INVITATION]: updateAttempt,
  [Types.UPDATE_INVITATION_SUCCESS]: updateInvitationSuccess,
  [Types.UPDATE_INVITATION_FAILURE]: updateInvitationFailure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)

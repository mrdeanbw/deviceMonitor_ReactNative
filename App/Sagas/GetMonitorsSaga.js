import {call, put, select, take} from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'
import { expandContacts } from '../Lib/Contacts'
import { numberWithoutCountryCode } from '../Lib/Utilities'

export default (api) => {

  function * worker () {
    const { userId } = yield select(state => state.user)
    const response = yield call(api.getMonitors, userId)
    if (!response.ok) {
      yield put(Actions.fetchMonitorsFailure(getErrorFromResponse(response)))
      return
    }

    const { contacts } = yield select(state => state.contacts)
    const expandedContacts = expandContacts(contacts)
    const { code } = yield select(state => state.selectedCountry)
    const monitors = response.data.results.map(monitor => {
      const number = numberWithoutCountryCode(monitor.invitee, code)
      const contact = R.find(R.propEq('phoneNumber', number), expandedContacts)
      if (contact) {
        return {
          ...monitor,
          firstName: contact.firstName,
          lastName: contact.lastName
        }
      } else {
        return monitor
      }
    })

    const invitationsResponse = yield call(api.getMonitorInvitations, userId)
    let invitations = []
    if (invitationsResponse.ok) {
      invitations = invitationsResponse.data.results
    }

    const sentInvitationsResponse = yield call(api.getSentInvitations, userId)
    let sentInvitations = []
    if (sentInvitationsResponse.ok) {

      sentInvitations = sentInvitationsResponse.data.results.map(sentInvitation => {
          const number = numberWithoutCountryCode(sentInvitation.invitee, code)
          const contact = R.find(R.propEq('phoneNumber', number), expandedContacts)
          if (contact) {
            return {
              ...sentInvitation,
              firstName: contact.firstName,
              lastName: contact.lastName
            }
          } else {
            return {
                ...sentInvitation,
                  firstName: '',
                  lastName: ''
            }
          }
        })
    }

    yield put(Actions.fetchMonitorsSuccess(monitors, invitations, sentInvitations))
  }

  function * watcher () {
    while (true) {
      yield take(Types.FETCH_MONITORS)
      yield call(worker)
    }
  }

  return {
    watcher,
    worker
  }
}

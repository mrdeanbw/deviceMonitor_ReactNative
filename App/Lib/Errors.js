// READABLE_ERRORS provides a mapping from Parse server errors to more
// human readable errors that we can display to the user
const READABLE_ERRORS = {
  'PhoneNumber already exists': 'An account with this phone number already exists'
}


export const getErrorFromResponse = (response) => {
  let error;

  if (response.data && response.data.error) {
    console.log("response.data.error"+response.data.error)
    error = READABLE_ERRORS[response.data.error] || response.data.error
  } else if (response.problem) {
    console.log("response.problem"+response.problem)
    // See https://github.com/skellock/apisauce#problem-codes or below for possible problem codes
    switch(response.problem) {
      case 'NETWORK_ERROR':
        error = 'There is no internet access. Please check the connectivity'
        break
      case 'SERVER_ERROR':
        error = 'Unable to reach the server. Please try again later'
        break
      default:
        error = 'An error occurred. Please try again later'
    }
  }
  return error
}


//Constant        VALUE               Status Code   Explanation
//----------------------------------------------------------------------------------------
//NONE             null               200-299       No problems.
//CLIENT_ERROR     'CLIENT_ERROR'     400-499       Any non-specific 400 series error.
//SERVER_ERROR     'SERVER_ERROR'     500-599       Any 500 series error.
//TIMEOUT_ERROR    'TIMEOUT_ERROR'    ---           Server didn't respond in time.
//CONNECTION_ERROR 'CONNECTION_ERROR' ---           Server not available, bad dns.
//NETWORK_ERROR    'NETWORK_ERROR'    ---           Network not available.
//CANCEL_ERROR     'CANCEL_ERROR'     ---           Request has been cancelled. Only possible if `cancelToken` is provided in config, see axios `Cancellation`.
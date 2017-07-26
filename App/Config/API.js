import Config from 'react-native-config'

const dev = {
  baseURL: 'https://roost-parse-dev.herokuapp.com/1',
  applicationId: '74ocuul4Y6sukPqCSbC0vJ2Ejw66ZUwB5JDyzd2c',
  name: 'Dev'
}

const local = {
  baseURL: Config && (Config.SERVER_URL || Config.PARSE_DASHBOARD_SERVER_URL),
  applicationId: Config && (Config.APP_ID || Config.PARSE_DASHBOARD_APP_ID),
  name: 'Local'
}

export default __DEV__ ? dev : dev

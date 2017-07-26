import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Actions, Scene, Router } from 'react-native-router-flux'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import { Images } from '../Themes'
import styles from './Styles/NavigationContainerStyle'

// screens identified by the router
import AboutScreen from '../Containers/AboutScreen'
import AddAddressScreen from '../Containers/AddAddressScreen'
import ChangePasswordScreen from '../Containers/ChangePasswordScreen'
import PromotionScreen from '../Containers/PromotionScreen'
import CompleteProfile from '../Containers/CompleteProfileScreen'
import DashboardScreen from '../Containers/DashboardScreen'
import DeleteAccountScreen from '../Containers/DeleteAccountScreen'
import DeviceSetup from '../Containers/DeviceSetupScreen'
import DeviceActivityScreen from '../Containers/DeviceActivityScreen'
import DeviceMenuScreen from '../Containers/DeviceMenuScreen'
import DeviceTechnicalInfoScreen from '../Containers/DeviceTechnicalInfoScreen'
import EditAddressScreen from '../Containers/EditAddressScreen'
import EditCustomLocationScreen from '../Containers/EditCustomLocationScreen'
import EditDeviceLocationScreen from '../Containers/EditDeviceLocationScreen'
import EditDeviceNameScreen from '../Containers/EditDeviceNameScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import HomeScreen from '../Containers/HomeScreen'
import HelpScreen from '../Containers/HelpScreen'
import LoginScreen from '../Containers/LoginScreen'
import NewItemScreen from '../Containers/NewItemScreen'
import AddMonitorScreen from '../Containers/AddMonitorScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import RoomDetailScreen from '../Containers/RoomDetailScreen'
import WarningDetailScreen from '../Containers/WarningDetailScreen'
import EnterPhoneNumber  from '../Containers/EnterPhoneNumber'
import SelectCountry from '../Containers/SelectCountry'
import VerifyPhoneNumber from '../Containers/VerifyPhoneNumberScreen'
import DeviceLocation from '../Containers/DeviceLocationScreen'
import DeviceCustomLocation from '../Containers/DeviceCustomLocationScreen'
import DeviceName from '../Containers/DeviceNameScreen'
import DeviceCustomName from '../Containers/DeviceCustomNameScreen'
import DeviceWifiInfo from '../Containers/DeviceWifiInfoScreen'
import BatteryPackageSelection from '../Containers/BatteryPackageSelection'
import DeviceProvision from '../Containers/DeviceProvisionScreen'
import BatterySetupInstructionsOne from '../Containers/BatterySetupInstructionsOne'
import BatterySetupInstructionsTwo from '../Containers/BatterySetupInstructionsTwo'
import BatterySetupInstructionsThree from '../Containers/BatterySetupInstructionsThree'
import BatterySetupInstructionsFour from '../Containers/BatterySetupInstructionsFour'
import BatterySetupInstructionsFive from '../Containers/BatterySetupInstructionsFive'
import FoamSetupInstructionsOne from '../Containers/FoamSetupInstructionsOne'
import FoamSetupInstructionsTwo from '../Containers/FoamSetupInstructionsTwo'
import WaterDetectorSetupInstructionsOne from '../Containers/WaterDetectorSetupInstructionsOne'
import WaterDetectorSetupInstructionsTwo from '../Containers/WaterDetectorSetupInstructionsTwo'
import WaterDetectorSetupInstructionsThree from '../Containers/WaterDetectorSetupInstructionsThree'
import WaterDetectorSetupInstructionsFive from '../Containers/WaterDetectorSetupInstructionsFive'
import DeviceAlarmInfo from '../Containers/DeviceAlarmInfoScreen'
import AlertsSetup from '../Containers/AlertsSetupScreen'
import ViewInvitationsScreen from '../Containers/ViewInvitationsScreen'
import ViewMonitorsScreen from '../Containers/ViewMonitorsScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/
import RoostNavLogo from '../Components/RoostNavLogo'

const renderRoostLogo = () => {
  return <RoostNavLogo />
}

const loggedInSceneProps = {
  panHandlers: null,
  hideNavBar: false,
}

class NavigationRouter extends Component {
  cancelProvisioning () {
    Alert.alert(
      'Stop provisioning device?',
      'Press \'OK\' to reset your progress and return to the home screen',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'OK', onPress: () => { Actions.loggedInContent() } }
      ]
    )
  }

  gotoDashboard () {
    Actions.dashboard()
  }

  discardChanges () {
    Alert.alert(
    'Continue without saving?',
    'Press \'OK\' to continue without saving your changes and return to the home screen',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'OK', onPress: () => { Actions.dashboard() } }
      ]
    )
  }

  render () {
    return (
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.title}
        backButtonTextStyle={styles.back}
        leftButtonIconStyle={styles.backButton}
      >
        <Scene initial hideNavBar key='homeScreen' component={HomeScreen} />
        <Scene
          hideNavBar={false}
          title='Login'
          backTitle='Back'
          key='login'
          component={LoginScreen}
        />
        <Scene
          hideNavBar={false}
          title='Forgot Password'
          backTitle='Cancel'
          key='forgotPassword'
          component={ForgotPasswordScreen}
        />
        <Scene
          hideNavBar={false}
          title='Create Account'
          backTitle='Back'
          key='enterPhoneNumber'
          component={EnterPhoneNumber}
        />
        <Scene
          hideNavBar={false}
          title='Your Country'
          backTitle='Back'
          key='selectCountry'
          component={SelectCountry}
        />
        <Scene
          hideNavBar={false}
          title='Confirm Phone Number'
          backTitle='Edit'
          key='verifyPhoneNumber'
          component={VerifyPhoneNumber}
        />
        <Scene
          hideNavBar={true}
          key='completeProfile'
          component={CompleteProfile}
        />
        <Scene panHandlers={null} key='loggedInContent' component={NavigationDrawer} type='reset' drawerOpen={false}>
          <Scene panHandlers={null} key='drawerChildrenWrapper' navigationBarStyle={styles.navBar} titleStyle={styles.title} leftButtonIconStyle={styles.leftButton} rightButtonTextStyle={styles.rightButton}>
            <Scene
              initial
              type='reset'
              renderTitle={renderRoostLogo}
              key='dashboard'
              component={DashboardScreen}
              renderLeftButton={NavItems.hamburgerButton}
              rightButtonImage={Images.plusSignWhiteCircled}
              onRight={()=>Actions.newItem()}
              { ...loggedInSceneProps }
            />
            <Scene
              renderTitle={renderRoostLogo}
              key='roomDetail'
              component={RoomDetailScreen}
              rightButtonImage={Images.homeIcon}
              onRight={()=>this.gotoDashboard()}
              { ...loggedInSceneProps }
            />
            <Scene
              renderTitle={renderRoostLogo}
              key='warningDetail'
              component={WarningDetailScreen}
              rightButtonImage={Images.homeIcon}
              onRight={()=>this.gotoDashboard()}
              { ...loggedInSceneProps }
            />
            <Scene
              renderTitle={renderRoostLogo}
              key='deviceMenu'
              component={DeviceMenuScreen}
              rightButtonImage={Images.homeIcon}
              onRight={()=>this.gotoDashboard()}
              { ...loggedInSceneProps }
            />
            <Scene
              renderTitle={renderRoostLogo}
              key='promotion'
              component={PromotionScreen}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Activity'
              key='deviceActivity'
              component={DeviceActivityScreen}
              rightButtonImage={Images.homeIcon}
              onRight={()=>this.gotoDashboard()}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Alarm Info'
              key='editAlarmInfo'
              component={DeviceAlarmInfo}
              nextScreen={() => Actions.pop()}
              rightButtonImage={Images.homeIcon}
              onRight={()=>this.discardChanges()}
              showSkip={false}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Alert Settings'
              key='editAlerts'
              component={AlertsSetup}
              nextScreen={() => Actions.pop()}
              rightButtonImage={Images.homeIcon}
              onRight={()=>this.discardChanges()}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Edit Location'
              key='editDeviceLocation'
              component={EditDeviceLocationScreen}
              rightButtonImage={Images.homeIcon}
              onRight={()=>this.discardChanges()}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Edit Location'
              key='editCustomLocation'
              component={EditCustomLocationScreen}
              rightButtonImage={Images.homeIcon}
              onRight={()=>this.discardChanges()}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Edit Name'
              key='editDeviceName'
              component={EditDeviceNameScreen}
              rightButtonImage={Images.homeIcon}
              onRight={()=>this.discardChanges()}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Technical Information'
              key='deviceTechnicalInfo'
              component={DeviceTechnicalInfoScreen}
              rightButtonImage={Images.homeIcon}
              onRight={()=>this.gotoDashboard()}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Profile'
              key='profile'
              component={ProfileScreen}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Change Password'
              key='changePassword'
              component={ChangePasswordScreen}
              { ...loggedInSceneProps }
            />

            <Scene
              title='About'
              key='about'
              component={AboutScreen}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Help'
              key='help'
              component={HelpScreen}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Delete Account'
              key='deleteAccount'
              component={DeleteAccountScreen}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Address'
              key='editAddress'
              component={EditAddressScreen}
              rightButtonTextStyle={styles.rightButton}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Monitors'
              key='monitors'
              component={ViewMonitorsScreen}
              { ...loggedInSceneProps }
            />
            <Scene
              title='New Monitor'
              key='addMonitor'
              component={AddMonitorScreen}
              { ...loggedInSceneProps }
            />
            <Scene
              rightButtonImage={Images.homeIcon}
              onRight={() => Actions.pop()}
              title='Add new...'
              key='newItem'
              component={NewItemScreen}
              { ...loggedInSceneProps }
            />
            <Scene
              title='Invitations'
              key='invitations'
              component={ViewInvitationsScreen}
              { ...loggedInSceneProps }
            />
          </Scene>
        </Scene>
        <Scene
          title='New Address'
          key='addAddress'
          component={AddAddressScreen}
          rightButtonTextStyle={styles.rightButton}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Select Location'
          key='deviceLocation'
          component={DeviceLocation}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Select Location'
          key='deviceCustomLocation'
          component={DeviceCustomLocation}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Select Name'
          key='deviceName'
          component={DeviceName}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Select Name'
          key='deviceCustomName'
          component={DeviceCustomName}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Wi-Fi Info'
          key='deviceWifiInfo'
          component={DeviceWifiInfo}
          { ...loggedInSceneProps }
        />
        <Scene
          renderTitle={renderRoostLogo}
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          key='batteryPackageSelection'
          component={BatteryPackageSelection}
          { ...loggedInSceneProps }
        />

        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          onBack={() => Actions.pop({ refresh: { startPollingWifiName: true } })}
          title='Step 1 of 4'
          key='batterySetupInstructionsOne'
          component={BatterySetupInstructionsOne}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Step 2 of 4'
          key='batterySetupInstructionsTwo'
          component={BatterySetupInstructionsTwo}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Step 3 of 6'
          key='batterySetupInstructionsThree'
          component={BatterySetupInstructionsThree}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Step 4 of 6'
          key='batterySetupInstructionsFour'
          component={BatterySetupInstructionsFour}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          onBack={() => Actions.pop({ refresh: { startPollingWifiName: true } })}
          title='Step 1 of 4'
          key='foamSetupInstructionsOne'
          component={FoamSetupInstructionsOne}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Step 2 of 4'
          key='foamSetupInstructionsTwo'
          component={FoamSetupInstructionsTwo}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          onBack={() => Actions.pop({ refresh: { startPollingWifiName: true } })}
          title='Step 1 of 4'
          key='waterDetectorSetupInstructionsOne'
          component={WaterDetectorSetupInstructionsOne}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Step 2 of 4'
          key='waterDetectorSetupInstructionsTwo'
          component={WaterDetectorSetupInstructionsTwo}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Step 3 of 4'
          key='waterDetectorSetupInstructionsThree'
          component={WaterDetectorSetupInstructionsThree}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Provision Battery'
          key='deviceProvision'
          component={DeviceProvision}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.cancelProvisioning()}
          title='Step 4 of 4'
          key='batterySetupInstructionsFive'
          component={BatterySetupInstructionsFive}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.discardChanges()}
          title='Alerts Settings'
          key='alertsSetup'
          nextScreen={(options) => Actions.loggedInContent(options)}
          component={AlertsSetup}
          { ...loggedInSceneProps }
        />
        <Scene
          rightButtonImage={Images.homeIcon}
          onRight={()=> this.discardChanges()}
          title='Alarm Info'
          key='deviceAlarmInfo'
          nextScreen={(options) => Actions.loggedInContent(options)}
          showSkip={true}
          component={DeviceAlarmInfo}
          { ...loggedInSceneProps }
        />
      </Router>
    )
  }
}

export default NavigationRouter

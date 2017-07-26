#  ReactRoost
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn`

**Step 4:** Copy local Parse configuration. Copy the `.env` file from either `roost-parse-dashboard` or `cloudapp` to the root of the project directory to point the local app at the locally running Parse server. The `.env` file should specify the `SERVER_URL` and `APP_ID` of the Parse server.


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## Building the app

### iOS

To build the app for iOS run `fastlane alpha`.

### Android

If signing the release, get the keystore and password from 1Password ("Roost mobile APK signing key"). Place the keystore in `android/app` and update your `~/.gradle/gradle.properties` with the filename and password:

```
ROOST_RELEASE_STORE_FILE=roost-release-key.keystore
ROOST_RELEASE_KEY_ALIAS=com.roost-dev
ROOST_RELEASE_STORE_PASSWORD=<password>
ROOST_RELEASE_KEY_PASSWORD=<password>
```

To build the app for Android run `fastlane android alpha`.

## Incrementing version number

To increment the version number run `fastlane increment`. This will update the iOS build number and write the updated number to `fastlane/build_number.txt`. To also increment the version number for the Android app, you must then run `fastlane android increment`.

To increment the build number and build both apps run:

    fastlane increment && fastlane android increment && fastlane alpha && fastlane android alpha

### Notes

A .ipa or .apk will be placed in the `build/` folder with the current version of the app in the file name.

Push certificates, if needed for a new bundle ID or environment, can be generated with [pem](https://github.com/fastlane/fastlane/blob/master/pem/README.md). The generated certificates can be added to the Parse Server config.

## Using Reactotron

The app is configured to use the desktop version of Reactotron. If you'd like to use Reactotron, you can [download it here](https://github.com/reactotron/reactotron/blob/master/docs/installing.md#installing-the-os-x-application).

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [ghooks](https://github.com/gtramontina/ghooks). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :open_file_folder: Related Articles
Ignite Documentation - [Ignite Wiki https://github.com/infinitered/ignite/wiki](https://github.com/infinitered/ignite/wiki)

import { AndroidConfig, ConfigPlugin, withAndroidManifest } from '@expo/config-plugins';
import { ExpoConfig } from '@expo/config-types';

// Using helpers keeps error messages unified and helps cut down on XML format changes.
const { addMetaDataItemToMainApplication, getMainApplicationOrThrow } = AndroidConfig.Manifest;


export const withMyCustomConfig = config => {
  return withAndroidManifest(config, async config => {
    // Modifiers can be async, but try to keep them fast.
    config.modResults = await setCustomConfigAsync(config, config.modResults);
    return config;
  });
};

// Splitting this function out of the mod makes it easier to test.
async function setCustomConfigAsync(
  config,
  androidManifest) {
  const appId = 'my-app-id';
  // Get the <application /> tag and assert if it doesn't exist.
  // const mainApplication = getMainApplicationOrThrow(androidManifest);

  console.log(androidManifest["uses-parmission"]);

  // addMetaDataItemToMainApplication(
  //   mainApplication,
  //   // value for `android:name`
  //   'android.permission.READ_EXTERNAL_STORAGE',
  //   // value for `android:value`
  //   appId
  // );

  //return androidManifest;
}